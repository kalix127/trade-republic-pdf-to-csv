#!/usr/bin/env python3
"""
FastAPI service for Trade Republic PDF processing.
This service provides a REST API endpoint for processing PDF files.
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tempfile
from pathlib import Path
import uvicorn
import os

from main import get_trade_republic_data, save_csv_output

app = FastAPI(
    title="Trade Republic PDF Processor API",
    description="API service for processing Trade Republic PDF statements",
    version="1.0.0"
)

# Add CORS middleware to allow requests from the web UI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the web UI origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"message": "Trade Republic PDF Processor API is running"}


@app.get("/health")
async def health_check():
    """Health check endpoint for Docker health checks."""
    return {"status": "healthy", "service": "python-api"}


@app.post("/process-pdf")
async def process_pdf(pdf: UploadFile = File(...)):
    """
    Process a Trade Republic PDF file and return CSV data.
    
    Args:
        pdf: The uploaded PDF file
        
    Returns:
        JSON response with processing results and CSV content
    """
    # Validate file type
    if not pdf.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF files are allowed."
        )
    
    # Validate file size (50MB limit)
    max_size = 50 * 1024 * 1024  # 50MB
    content = await pdf.read()
    if len(content) > max_size:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 50MB limit."
        )
    
    # Create temporary directory for processing
    with tempfile.TemporaryDirectory() as temp_dir:
        try:
            # Save uploaded file to temporary location
            input_pdf_path = Path(temp_dir) / "input.pdf"
            with open(input_pdf_path, "wb") as f:
                f.write(content)
            
            # Create output directory
            output_dir = Path(temp_dir) / "output"
            output_dir.mkdir(exist_ok=True)
            
            # Process the PDF using existing logic
            transactions, trades = get_trade_republic_data(input_pdf_path)
            
            # Save CSV files to output directory
            save_csv_output(transactions, trades, str(output_dir))
            
            # Read the generated CSV files
            transactions_csv_path = output_dir / "transactions.csv"
            trades_csv_path = output_dir / "trades.csv"
            
            csv_content = {}
            
            # Read transactions CSV
            if transactions_csv_path.exists():
                with open(transactions_csv_path, 'r', encoding='utf-8') as f:
                    csv_content["transactions"] = f.read()
            
            # Read trades CSV
            if trades_csv_path.exists():
                with open(trades_csv_path, 'r', encoding='utf-8') as f:
                    csv_content["trades"] = f.read()
            
            # Return success response
            return JSONResponse(content={
                "success": True,
                "message": "PDF processed successfully",
                "stats": {
                    "transactions_count": len(transactions),
                    "trades_count": len(trades)
                },
                "csv_content": csv_content
            })
            
        except Exception as e:
            # Return error response
            raise HTTPException(
                status_code=500,
                detail=f"Error processing PDF: {str(e)}"
            )


if __name__ == "__main__":
    # Run the server
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=port,
        reload=True if os.getenv("ENVIRONMENT") == "development" else False
    )