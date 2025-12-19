@echo off
echo ================================================
echo    Harmony AI - Analysis Service
echo ================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

REM Check if requirements are installed
echo Checking dependencies...
pip show textblob >nul 2>&1
if errorlevel 1 (
    echo Installing required packages...
    pip install -r requirements.txt
    python -m textblob.download_corpora
)

echo.
echo Starting AI Analysis API Server...
echo Press Ctrl+C to stop
echo.
python api.py
