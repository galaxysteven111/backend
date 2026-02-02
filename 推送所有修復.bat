@echo off
chcp 65001 >nul
echo 🚀 檢查並推送所有修復...
echo.

cd "c:\Users\Galaxy\OneDrive\桌面\捐飯盒公司"

echo ========================================
echo 步驟 1: 檢查 Git 狀態
echo ========================================
git status

echo.
echo ========================================
echo 步驟 2: 檢查未提交的修改
echo ========================================
git diff --name-only

echo.
echo ========================================
echo 步驟 3: 檢查未推送的提交
echo ========================================
git log origin/main..HEAD --oneline 2>nul
if %errorlevel% neq 0 (
    git log origin/master..HEAD --oneline 2>nul
)

echo.
echo ========================================
echo 步驟 4: 添加所有修改
echo ========================================
git add .

echo.
echo ========================================
echo 步驟 5: 提交修改
echo ========================================
git commit -m "修復 Docker 構建順序和 TypeScript 錯誤"

echo.
echo ========================================
echo 步驟 6: 推送到 GitHub
echo ========================================
git push

if %errorlevel% equ 0 (
    echo.
    echo ✅✅✅ 推送成功！✅✅✅
    echo.
    echo 修復內容：
    echo   - Dockerfile 構建順序修復（--ignore-scripts）
    echo   - JWT expiresIn 類型錯誤修復
    echo   - TypeScript 編譯錯誤修復
    echo.
    echo Railway 會自動重新部署
) else (
    echo.
    echo ❌ 推送失敗
    echo 請檢查錯誤訊息
)

echo.
pause
