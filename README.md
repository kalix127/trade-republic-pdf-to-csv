# Trade Republic PDF to CSV Converter

<div align="center">

🌐 **Language:** [🇺🇸 English](README.md) | [🇮🇹 Italiano](README.it.md)

</div>

## 📚 Table of Contents

- [🚀 Overview](#-overview)
- [⚠️ Important Disclaimers](#️-important-disclaimers)
- [🛠️ Installation](#️-installation)
- [📁 Project Structure](#-project-structure)
- [⚙️ Configuration Guide](#️-configuration-guide)
- [🔧 How It Works](#-how-it-works)
- [📊 Output Columns](#-output-columns)
- [🔧 Advanced Configuration](#-advanced-configuration)
- [🐛 Troubleshooting](#-troubleshooting)
- [📝 License](#-license)
- [💭 Would You Prefer a Web Solution?](#-would-you-prefer-a-web-solution)
- [📧 Contact](#-contact)
- [🤝 Contributing](#-contributing)

## Overview

This tool extracts transaction data from Trade Republic PDF statements and converts them to CSV format for easier analysis and integration with personal finance tools. It processes Italian Trade Republic statements and handles both cash transactions and trading activities.

### Key Features

- **PDF Processing**: Extracts data from Trade Republic PDF statements using OCR and table detection
- **Triple CSV Output**: Always generates 3 CSV files - transactions, trades, and combined data
- **Visual Debugging**: Optional grid overlay to visualize extraction areas
- **Multi-row Cell Handling**: Automatically combines split table cells
- **Transaction Parsing**: Intelligently parses trade descriptions to extract ISIN, quantities, and trade types

## Important Disclaimers

This is a **personal project** built specifically for my own finance tracking needs. I created this tool because I needed to extract and process my Trade Republic transaction data for personal accounting purposes.

**Language Limitation:** This tool has been tested **only with Italian Trade Republic account statements**. Since I don't have access to statements in other languages, I cannot guarantee functionality with non-Italian Trade Republic accounts. However, the script can potentially be adapted for other languages through manual configuration of headers, valid transaction types, and extraction areas (requires technical knowledge and testing).

**PDF Structure Dependency:** This script is hardcoded for the current Trade Republic PDF format. **If Trade Republic updates their PDF structure, this tool may stop working or produce incorrect results.** If this happens, please contact me at [info@gianlucaiavicoli.dev](mailto:info@gianlucaiavicoli.dev) and I'll investigate updating the extraction logic.

**Maintenance Notice:** This project will be maintained as long as I continue using Trade Republic. If I switch to a different broker or no longer need this functionality, maintenance may cease.

**Code Quality:** I acknowledge that this code is not perfect and contains some hardcoded elements. However, this is not critical or production code - it's a personal utility that works for my specific needs. The implementation prioritizes functionality over architectural perfection.

## Installation

### Prerequisites

- Python 3.8 or higher
- pip package manager
- **Java Runtime Environment (JRE) 8 or higher** - Required for `tabula-py` PDF table extraction


### Setup

1. **Clone or download this repository**

```bash
git clone https://github.com/kalix127/trade-republic-pdf-to-csv.git
cd trade-republic-pdf-to-csv
```

2. **Choose your platform and follow the instructions:**

<details>
<summary><b>Unix/Linux/macOS Instructions</b></summary>

**Create and activate virtual environment:**
```bash
python -m venv venv
source venv/bin/activate
```

**Install dependencies:**
```bash
pip install -r requirements.txt
```

**Create input directory:**
```bash
mkdir input
```

**Copy your Trade Republic PDF to input directory:**
```bash
cp ~/Downloads/your-statement.pdf input/
```

**Run the converter:**
```bash
python main.py
```

</details>

<details>
<summary><b>Windows Instructions</b></summary>

**Create and activate virtual environment:**
```cmd
python -m venv venv
venv\Scripts\activate.bat
```

**Install dependencies:**
```cmd
pip install -r requirements.txt
```

**Create input directory:**
```cmd
mkdir input
```

**Copy your Trade Republic PDF to input directory:**
```cmd
copy "%USERPROFILE%\Downloads\your-statement.pdf" input\
```

**Run the converter:**
```cmd
python main.py
```

</details>

3. **Configure settings**
   - Open `settings.json`
   - Update `pdf_filename` to match your PDF filename
   - Adjust other settings if needed (see [Configuration Guide](#️-configuration-guide))

4. **Output**
   - The tool will create three CSV files in the `output/` directory:
     - `transactions.csv` - Non-trading transactions
     - `trades.csv` - Trading activities
     - `combined.csv` - All data combined

## Project Structure

```
├── input/                    # Input files directory
│   └── trade_republic.pdf          # Your Trade Republic PDF
├── output/                  # Output CSV files
├── main.py           # Main conversion script
├── main_settings.json # Configuration file
└── requirements.txt       # Python dependencies
```

## Configuration Guide

All settings are configured in `settings.json`. Here's a complete breakdown of each option:

> **Important**: We recommend keeping technical settings (`area_first`, `area_default`, `dpi`, `resize_px`) at their default values unless you experience extraction issues. Changing these values incorrectly can cause extraction failures or incorrect data.

### Basic Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `pdf_filename` | string | `"trade_republic.pdf"` | Name of the PDF file in the input/ directory |
| `currency_symbol` | string | `"€"` | Currency symbol used in PDF statements |
| `show_preview` | boolean | `false` | Display visual grid overlay for debugging extraction areas |
| `extract_last_page` | boolean | `false` | Whether to process the final page of the PDF |

### Image Processing

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `dpi` | integer | `200` | Resolution for PDF to image conversion (higher = more accurate but slower) |
| `resize_px` | array | `[595, 841.88]` | Target pixel dimensions for image processing |

### Table Extraction

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `columns` | array | `["DATA", "TIPO", ...]` | Expected column headers in Italian |
| `valid_types` | array | Transaction types to extract | Only process rows with these TIPO values |
| `header_alignment_map` | object | Column alignment settings | Controls text extraction alignment for each column |

### Extraction Areas (Pixel Coordinates)

| Setting | Type | Description |
|---------|------|-------------|
| `area_first` | array | `[top, left, bottom, right]` coordinates for first page table area |
| `area_default` | array | `[top, left, bottom, right]` coordinates for subsequent pages |

#### Example Areas Configuration:
```json
{
  "area_first": [343, 42, 770, 552],    // First page: skip header content
  "area_default": [55, 42, 770, 552]    // Other pages: full table area
}
```

### Valid Transaction Types

The tool processes these Italian transaction types:
- `"Transazione con carta"` - Card transactions
- `"Bonifico SEPA istantaneo"` - SEPA instant transfers  
- `"Commercio"` - Trading activities (buy/sell)
- `"Commissione"` - Fees and commissions

## How It Works

### 1. PDF Processing Pipeline

1. **PDF to Image Conversion**: Uses `pdf2image` to convert PDF pages to high-resolution images
2. **Text Extraction**: `pdfplumber` extracts text and determines coordinate positions
3. **Header Detection**: Locates column headers (TIPO, DESCRIZIONE, etc.) to establish table structure
4. **Table Extraction**: `tabula-py` extracts tabular data using detected coordinates
5. **Visual Debugging**: Optionally overlays extraction grids on images using OpenCV

### 2. Grid System

The tool uses a coordinate-based grid system:

- **Pixel Coordinates**: Initial detection in image pixel space (595x842 preview dimensions)
- **PDF Points**: Conversion to PDF coordinate system for accurate text extraction
- **Column Guides**: Vertical lines calculated from header positions
- **Extraction Areas**: Rectangular regions defining table boundaries

### 3. Data Processing

1. **Multi-row Combination**: Tabula often splits cells across rows - the tool recombines these
2. **Currency Cleaning**: Removes €, thousand separators, converts decimal commas
3. **Type Validation**: Filters rows to only include valid transaction types
4. **Trade Parsing**: Uses regex to extract ISIN, company names, and quantities from trade descriptions

### 4. Output Files

The tool always generates 3 CSV files:
- `transactions.csv`: Card payments, transfers, fees, and other non-trading activities
- `trades.csv`: Buy/sell trades with parsed details (ISIN, quantities, trade types)
- `combined.csv`: All data in a single file with SOURCE column distinguishing record types

## Output Columns

### Transactions CSV
| Column | Description |
|--------|-------------|
| DATA | Transaction date |
| TIPO | Transaction type |
| DESCRIZIONE | Description/memo |
| IN ENTRATA | Incoming amount |
| IN USCITA | Outgoing amount |
| SALDO | Account balance |

### Trades CSV  
| Column | Description |
|--------|-------------|
| DATA | Trade date |
| NAME | Company name |
| ISIN | Security identifier |
| TRADE_TYPE | BUY or SELL |
| QUANTITY | Number of shares |
| FEE | Trading fees |
| AMOUNT | Total amount |
| PRICE | Price per share |

---

## Advanced Configuration

### Adjusting Technical Settings

If the default settings don't work with your specific PDF format, you can adjust the technical parameters using the preview feature:

#### Step-by-Step Adjustment Process:

1. **Enable Preview Mode**:
   ```json
   {
     "show_preview": true
   }
   ```

2. **Run the Script**: The preview will show red rectangles (extraction areas) and green lines (column guides)

3. **Analyze the Preview**:
   - **Red rectangle too small/large**: Adjust `area_first` and `area_default` coordinates
   - **Green lines misaligned**: Check if headers are detected correctly
   - **Blurry/pixelated preview**: Adjust `dpi` (try 150-300 range)
   - **Wrong aspect ratio**: Modify `resize_px` dimensions

4. **Coordinate System**:
   - Format: `[top, left, bottom, right]` in pixel coordinates
   - `area_first`: First page extraction area (usually smaller to skip headers)
   - `area_default`: Other pages extraction area (usually larger)

5. **Testing Changes**:
   - Make small incremental changes (10-20 pixels at a time)
   - Test each change with preview mode
   - Verify extraction results after each adjustment

#### Example Adjustment:

If the red rectangle doesn't cover the full table:
```json
{
  "area_first": [343, 42, 770, 552],    // Original
  "area_first": [300, 30, 800, 600]     // Expanded area
}
```

**Warning**: Only adjust these settings if you understand coordinate systems and have verified changes with the preview feature.

## Troubleshooting

### Common Issues

**No data extracted:**
- Check `area_first` and `area_default` coordinates match your PDF layout
- Enable `show_preview: true` to visualize extraction areas
- Verify your PDF contains the expected Italian headers

**Incorrect table detection:**
- Adjust `dpi` setting (try 150-300 range)
- Modify extraction area coordinates
- Check that `valid_types` includes your transaction types

**Split cells not combining:**
- Ensure row count is divisible by 3 (Trade Republic's multi-row format)
- Check for extra blank rows disrupting the pattern

### Debug Mode - Visual Preview

Enable visual debugging to see exactly what the tool is extracting:

```json
{
  "show_preview": true,
  "dpi": 200
}
```

#### What the Preview Shows

When enabled, the tool opens an interactive preview window for each PDF page showing:

- **Red Rectangle**: Table extraction area boundaries
  - **First page**: Uses `area_first` coordinates (skips header content)
  - **Other pages**: Uses `area_default` coordinates (full table area)
- **Green Vertical Lines**: Column separation guides calculated from detected headers
  - Automatically positioned based on detected column headers (TIPO, DESCRIZIONE, etc.)
  - Shows exactly where the tool will split columns during table extraction

#### Preview Controls

- **ENTER key**: Navigate to the next page preview
- **ESC key**: Exit preview mode and continue with data extraction
- **Window title**: Shows current page number and total pages

#### How It Works

1. **PDF Conversion**: Converts all pages to high-resolution images (uses `dpi` setting)
2. **Header Detection**: Analyzes each page to find column headers and calculate positions
3. **Grid Overlay**: Superimposes extraction areas and column guides on the page image
4. **Interactive Navigation**: Allows you to inspect each page before processing

This is extremely useful for:
- **Troubleshooting extraction issues**: See if areas and columns are correctly detected
- **Adjusting coordinates**: Visual feedback for fine-tuning `area_first` and `area_default` settings
- **Understanding the process**: See exactly how the tool interprets your PDF layout

## License

This project is provided as-is for personal use. Feel free to fork and modify for your own needs.

## Would You Prefer a Web Solution?

I'm considering creating a simple website where you could:
- Upload your Trade Republic PDF
- Get the CSV files instantly downloaded
- No installation or technical setup required

If this would be useful for you, **please let me know** by emailing [info@gianlucaiavicoli.dev](mailto:info@gianlucaiavicoli.dev?)

## Contact

For any issues, bugs, or questions about this tool, please contact me at:

**[info@gianlucaiavicoli.dev](mailto:info@gianlucaiavicoli.dev)**

I'll do my best to help troubleshoot problems or investigate PDF structure changes that may affect the tool's functionality.

## Contributing

Since this is a personal project tailored to my specific needs, I'm not actively seeking contributions. However, if you find bugs or have suggestions that would benefit the general use case, feel free to open an issue.