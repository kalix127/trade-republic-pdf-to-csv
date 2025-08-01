import json
import re
import warnings
from pathlib import Path
from typing import Dict, List, Tuple

import cv2
import numpy as np
import pandas as pd
import pdfplumber
import tabula
from pdf2image import convert_from_path
from tabula import read_pdf

def load_settings(fp: str | Path = "settings.json") -> dict:
    """@return parsed settings as dict"""
    with open(fp, "r", encoding="utf-8") as f:
        return json.load(f)


S = load_settings()
INPUT_DIR = "input"
OUTPUT_DIR = "output"

currency_symbol = re.escape(S["currency_symbol"])
CURRENCY_RE = re.compile(rf"\s*{currency_symbol}")


def _bucket_by_y(words, tol=2.0):
    lines = []
    for w in words:
        for line in lines:
            if abs(line[0]["top"] - w["top"]) <= tol:
                line.append(w)
                break
        else:
            lines.append([w])
    return lines

def header_xcoords_in_bbox(
    page: pdfplumber.page.Page,
    bbox: Tuple[float, float, float, float],
    headers: Dict[str, str],
    anchor: str = "TIPO",
) -> Dict[str, float]:

    sub   = page.crop(bbox)
    raw   = sub.extract_words(x_tolerance=1, y_tolerance=2, keep_blank_chars=True)

    words = []
    for w in raw:
        txt = CURRENCY_RE.sub("", w["text"]).strip()
        if txt:
            w2 = w.copy(); w2["text"] = txt
            words.append(w2)

    target = None
    for line in _bucket_by_y(words, tol=2.0):
        if any(w["text"].casefold() == anchor.casefold() for w in line):
            target = sorted(line, key=lambda w: w["x0"])
            break
    if target is None:
        return {}

    token_texts = [w["text"] for w in target]
    coords: Dict[str, float] = {}

    for hdr, align in headers.items():
        exact = [w for w in target if w["text"].casefold() == hdr.casefold()]
        if exact:
            w = exact[0]
            coords[hdr] = w["x0"] if align == "left" else w["x1"]
            continue

        parts = [p.casefold() for p in hdr.split()]
        k = len(parts)
        for i in range(len(token_texts) - k + 1):
            if [t.casefold() for t in token_texts[i:i+k]] == parts:
                first, last = target[i], target[i+k-1]
                coords[hdr] = first["x0"] if align == "left" else last["x1"]
                break

    return coords


def pdf_to_images(path: Path, dpi: int) -> List[np.ndarray]:
    """@param path pdf file; @param dpi resolution; @return list of pages (RGB)."""
    pil_pages = convert_from_path(path, dpi=dpi)
    return [np.array(p) for p in pil_pages]


def resize_pages(pages: List[np.ndarray], size: tuple[int, int]) -> List[np.ndarray]:
    """Keep pages at a fixed pixel size for consistent overlays."""
    return [cv2.resize(p, size, interpolation=cv2.INTER_LINEAR) for p in pages]


def overlay_grid(
    page: np.ndarray,
    x_points: List[int],
    area: List[int],
) -> np.ndarray:
    """Light visual check; returns composite image (no I/O)."""
    h, w, _ = page.shape
    overlay = np.ones((h, w, 4), dtype="uint8")

    cv2.rectangle(
        overlay,
        (area[1], area[0]),
        (area[3], area[2]),
        (255, 0, 0, 125),
        -1,
    )

    for x in x_points:
        cv2.line(overlay, (x, 0), (x, h), (0, 255, 0, 255), 2)

    return cv2.addWeighted(
        cv2.cvtColor(page, cv2.COLOR_BGR2BGRA), 0.9, overlay, 0.2, 0
    )


def extract_tables(
    pdf: Path,
    cols: List[str],
    x_points: List[int],
    areas: dict[str, List[int]],
    extract_last: bool,
    n_pages: int
) -> pd.DataFrame:
    """Wrapper around tabula.read_pdf; merges multipage tables."""
    dfs: list[pd.DataFrame] = []

    last_page = n_pages - 1 if not extract_last else n_pages
    if last_page > 1:
        dfs += read_pdf(
            pdf,
            pages=f"2-{last_page}",
            area=areas["area_default"],
            columns=x_points,
            pandas_options={"columns": cols},
            stream=True,
        )

    dfs += read_pdf(
        pdf,
        pages="1",
        area=areas["area_first"],
        columns=x_points,
        pandas_options={"columns": cols},
        stream=True,
    )

    if extract_last:
        dfs += read_pdf(
            pdf,
            pages=str(last_page),
            area=areas["area_default"],
            columns=x_points,
            pandas_options={"columns": cols},
            stream=True,
        )

    return pd.concat([d.iloc[:] for d in dfs], ignore_index=True)


def combine_multirow_cells(df: pd.DataFrame) -> pd.DataFrame:
    """Tabula splits multiline cells → aggregate each chunk of 3 rows."""

    n = len(df)

    if n % 3:
        warnings.warn(
            f"Row count ({n}) not divisible by 3; removing last {n % 3} row(s)."
        )
        df = df.iloc[:n - (n % 3)]

    def agg(x):
        s = x.dropna().astype(str)
        s = s[s.str.lower().ne("nan") & s.str.strip().ne("")]
        return " ".join(s)

    out = (
        df.groupby(df.index // 3)
        .agg(agg)
        .reset_index(drop=True)
        .map(lambda x: x.strip() if isinstance(x, str) else x)
    )
    return out


def tidy_money_cols(df: pd.DataFrame, cols: List[str]) -> pd.DataFrame:
    """Remove currency symbol and thousand separators, keep NaN."""
    for c in cols:
        df[c] = df[c].apply(
            lambda v: v if pd.isna(v) else v.replace(S['currency_symbol'], "").replace(".", "").strip()
        )
    return df

def validate_types(df: pd.DataFrame, valid_types: List[str]) -> pd.DataFrame:
    """Keep only rows whose 'TIPO' value is in `valid_types`."""
    mask = df["TIPO"].isin(valid_types)

    return df.loc[mask].copy()

# convert preview-pixel rectangle → PDF-points bbox
def px_area_to_pts(area_px, page_w_pt, page_h_pt):
    """
    Convert (top,left,bottom,right) from the 595×842-pixel preview space to the
    PDF coordinate system (points).  The returned tuple is suitable for
    pdfplumber.Page.crop(), i.e. (x0, top, x1, bottom) with top < bottom.
    """
    top_px, left_px, bottom_px, right_px = area_px
    scale_x = page_w_pt / 595.0
    scale_y = page_h_pt / 842.0

    x0 = left_px  * scale_x
    x1 = right_px * scale_x
    # PDF origin is bottom-left ⇒ larger y means higher up the page
    top_pt    = page_h_pt - top_px    * scale_y   # larger y
    bottom_pt = page_h_pt - bottom_px * scale_y   # smaller y

    # make sure top < bottom for pdfplumber
    return (x0, bottom_pt, x1, top_pt) if bottom_pt < top_pt else (x0, top_pt, x1, bottom_pt)


def setup():
    if not Path(INPUT_DIR).exists(): Path.mkdir(INPUT_DIR)
    if not Path(OUTPUT_DIR).exists(): Path.mkdir(OUTPUT_DIR)

def parse_trades(trades: pd.DataFrame) -> pd.DataFrame:
    pattern = re.compile(
        r'''(?ix)
        ^\s*
        (?:
            (?P<trade_type>(buy|sell))\s+trade
        |
            (?P<plan>savings\ plan\ execution)
        )
        \s+
        (?P<isin>[A-Z]{2}[A-Z0-9]{10})  # ISIN format: 2 letters + 10 alphanumeric
        \s+
        (?P<name>.*?)
        ,\s*quantity:\s*
        (?P<qty>[0-9.,]+)
        ''')
    
    parsed = trades['DESCRIZIONE'].str.extract(pattern)

    parsed['TRADE_TYPE'] = (
        parsed['trade_type']
        .fillna('BUY')
        .str.upper()
    )
    parsed = parsed.drop(columns=['trade_type', 'plan'])

    parsed.rename(columns={
        'isin': 'ISIN',
        'name': 'NAME',
        'qty':  'QUANTITY'
    }, inplace=True)

    trades = trades.join(parsed)

    trades['PRICE'] = None
    trades['FEE'] = None
    trades['AMOUNT'] = trades['IN USCITA']
    trades['QUANTITY'] = trades['QUANTITY'].str.replace(".", ",")

    return trades[['DATA', 'NAME', 'ISIN', 'TRADE_TYPE', 'QUANTITY', 'FEE', 'AMOUNT', 'PRICE']]


def get_trade_republic_data(tr_file) -> list[pd.DataFrame]:
    dfs = []
    
    # Convert all pages to images once if preview is enabled
    all_page_images = None
    if S['show_preview']:
        print("🖼️  Converting PDF to images for preview...")
        all_page_images = pdf_to_images(tr_file, dpi=S["dpi"])
        all_page_images = resize_pages(all_page_images, tuple(map(int, S["resize_px"]))[:2])
    
    with pdfplumber.open(tr_file) as pdf_doc:
        for idx, page in enumerate(pdf_doc.pages, start=1):
            if idx == len(pdf_doc.pages) and not S['extract_last_page']: break

            if idx == 1:
                area_px = S["area_first"]
            else:
                area_px = S["area_default"]

            bbox_pts = px_area_to_pts(area_px, page.width, page.height)
            hdr_x    = header_xcoords_in_bbox(page, bbox_pts, S["header_alignment_map"])
            
            if not hdr_x:
                hdr_x = header_xcoords_in_bbox(
                    page,
                    (0, 0, page.width, page.height),
                    S["header_alignment_map"]
                )

            if not hdr_x:
                break

            x_pts = sorted([
                hdr_x["TIPO"] - 2,
                hdr_x["DESCRIZIONE"] - 2,
                hdr_x["IN ENTRATA"] - 2,
                hdr_x["IN USCITA"] - 2,
                ((hdr_x["IN USCITA"] + hdr_x["SALDO"]) / 2) - 4
            ])

            if S['show_preview'] and all_page_images:
                # Use the pre-converted image for this page
                page_img = all_page_images[idx-1]
                
                # Use the correct area for the current page
                preview_area = area_px
                
                window_title = f"Page {idx}/{len(pdf_doc.pages)} - Press ENTER for next page, ESC to exit preview"
                cv2.imshow(
                    window_title,
                    overlay_grid(
                        page_img,
                        [int(x / (pdf_doc.pages[0].width / 595.0)) for x in x_pts],   # scale back to preview px
                        preview_area
                    )
                )
                
                key = cv2.waitKey(0)
                cv2.destroyAllWindows()
                
                # If ESC is pressed, disable further preview but continue processing
                if key == 27:  # ESC key
                    print("Preview mode disabled - continuing data extraction...")
                    S['show_preview'] = False

            dfs += tabula.read_pdf(
                tr_file,
                pages=idx,
                area=area_px,         
                columns=x_pts,
                guess=False,
                stream=True,
                pandas_options={"columns": S["columns"]},
            )

    raw = pd.concat(dfs, ignore_index=False)
    raw = raw.drop([0]).reset_index(drop=True)

    merged = combine_multirow_cells(raw)
    merged = tidy_money_cols(merged, ["IN ENTRATA", "IN USCITA", "SALDO"])
    merged = validate_types(merged, S["valid_types"])
    trades = merged[merged['TIPO'] == 'Commercio'].copy()
    transactions = merged[merged['TIPO'] != 'Commercio'].copy()

    trades = parse_trades(trades)
    trades.reset_index(drop=True, inplace=True)
    transactions.reset_index(drop=True, inplace=True)

    return transactions, trades


def save_csv_output(transactions: pd.DataFrame, trades: pd.DataFrame, output_dir: str = OUTPUT_DIR) -> None:
    """
    Save the extracted data to 3 CSV files: transactions, trades, and combined.
    
    Parameters:
    -----------
    transactions : pd.DataFrame
        Non-trading transactions (cards, transfers, fees)
    trades : pd.DataFrame  
        Trading transactions (buy/sell)
    output_dir : str
        Output directory path
    """
    Path(output_dir).mkdir(exist_ok=True)
    
    # Always save 3 separate files
    transactions_file = Path(output_dir) / "transactions.csv"
    trades_file = Path(output_dir) / "trades.csv"
    combined_file = Path(output_dir) / "combined.csv"
    
    # Save separate files
    transactions.to_csv(transactions_file, index=False, encoding='utf-8')
    trades.to_csv(trades_file, index=False, encoding='utf-8')
    
    # Create combined file with source column
    transactions_marked = transactions.copy()
    trades_marked = trades.copy()
    
    transactions_marked['SOURCE'] = 'TRANSACTION'
    trades_marked['SOURCE'] = 'TRADE'
    
    # Align columns (fill missing columns with empty values)
    all_columns = set(transactions.columns) | set(trades.columns) | {'SOURCE'}
    
    for col in all_columns:
        if col not in transactions_marked.columns:
            transactions_marked[col] = None
        if col not in trades_marked.columns:
            trades_marked[col] = None
    
    # Reorder columns to have common ones first
    common_cols = ['DATA', 'SOURCE']
    other_cols = sorted([col for col in all_columns if col not in common_cols])
    column_order = common_cols + other_cols
    
    transactions_marked = transactions_marked[column_order]
    trades_marked = trades_marked[column_order]
    
    combined = pd.concat([transactions_marked, trades_marked], ignore_index=True)
    combined = combined.sort_values('DATA', ascending=False).reset_index(drop=True)
    
    combined.to_csv(combined_file, index=False, encoding='utf-8')
    
    print(f"✅ Transactions saved to: {transactions_file}")
    print(f"✅ Trades saved to: {trades_file}")
    print(f"✅ Combined data saved to: {combined_file}")
    print(f"📊 Extracted {len(transactions)} transactions and {len(trades)} trades")


def main():
    """Main execution function"""
    setup()
    
    # Get PDF file path from settings (search in input folder)
    tr_file = Path(INPUT_DIR) / S["pdf_filename"]
    
    if not tr_file.exists():
        print(f"❌ PDF file not found: {tr_file}")
        print(f"   Please check the 'pdf_filename' setting in settings.json")
        print(f"   Make sure the file exists in the {INPUT_DIR}/ directory")
        return
    
    print(f"🔍 Processing: {tr_file}")
    
    try:
        # Extract data from PDF
        transactions, trades = get_trade_republic_data(tr_file)
        
        # Save CSV output (always 3 files)
        save_csv_output(transactions, trades)
        
        print("✨ Processing completed successfully!")
        
    except Exception as e:
        print(f"❌ Error processing PDF: {e}")
        print("💡 Try adjusting settings in settings.json or enable show_preview for debugging")


if __name__ == "__main__":
    main()