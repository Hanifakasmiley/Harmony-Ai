@echo off
echo ================================================
echo    Harmony AI - Run Analysis Once
echo ================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo Running AI analysis on all unanalyzed logs...
echo.
python ai_service.py
echo.
pause
