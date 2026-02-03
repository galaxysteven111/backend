@echo off
echo ========================================
echo Pushing code to GitHub
echo ========================================
echo.

echo Script location: %~dp0
echo Changing to script directory...
cd /d "%~dp0"
if errorlevel 1 (
    echo ERROR: Cannot change to script directory
    echo Script location: %~dp0
    echo Current directory: %CD%
    echo.
    pause
    exit /b 1
)

echo Current directory: %CD%
echo.

echo Step 1: Checking Git status...
git status
if errorlevel 1 (
    echo ERROR: Git command failed
    echo Please check if Git is installed and in PATH
    echo.
    pause
    exit /b 1
)
echo.

echo Step 2: Adding all changes...
git add .
echo Files added.
echo.

echo Step 3: Committing changes...
git commit -m "Update code"
if errorlevel 1 (
    echo WARNING: Commit failed or no changes to commit
    echo This is OK if there are no changes
    echo.
)
echo.

echo Step 4: Pushing to GitHub...
git push
if errorlevel 1 (
    echo ERROR: Push failed
    echo Please check error messages above
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Push successful!
echo Railway will automatically redeploy
echo ========================================
echo.
pause
