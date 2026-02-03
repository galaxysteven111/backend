@echo off
echo ========================================
echo Testing Git Installation
echo ========================================
echo.

echo Script location: %~dp0
echo Current directory: %CD%
echo.

echo Step 1: Checking Git version...
git --version
if errorlevel 1 (
    echo.
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git or add it to PATH
    echo.
    pause
    exit /b 1
)
echo Git is installed!
echo.

echo Step 2: Changing to project directory...
cd /d "%~dp0"
if errorlevel 1 (
    echo ERROR: Cannot change directory
    echo Current directory: %CD%
    echo.
    pause
    exit /b 1
)

echo Current directory: %CD%
echo.

echo Step 3: Checking Git status...
git status
if errorlevel 1 (
    echo ERROR: Git command failed
    echo This might mean:
    echo   1. Not a Git repository
    echo   2. Git is not properly configured
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Git is working correctly!
echo ========================================
echo.
pause
