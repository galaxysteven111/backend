@echo off
chcp 65001 >nul
echo 🔍 檢查 Git 狀態...
echo.

cd "c:\Users\Galaxy\OneDrive\桌面\捐飯盒公司"

echo 步驟 1: 檢查 Git 狀態...
git status

echo.
echo 步驟 2: 檢查 Dockerfile 是否有未提交的修改...
git diff backend/Dockerfile

echo.
echo 步驟 3: 檢查是否有未推送的提交...
git log origin/main..HEAD --oneline 2>nul
if %errorlevel% equ 0 (
    echo.
    echo ⚠️ 發現未推送的提交！
    echo.
    echo 步驟 4: 推送到 GitHub...
    git push
    if %errorlevel% equ 0 (
        echo.
        echo ✅✅✅ 推送成功！✅✅✅
    ) else (
        echo.
        echo ❌ 推送失敗
    )
) else (
    echo.
    echo ✅ 沒有未推送的提交
)

echo.
echo 步驟 5: 檢查遠程倉庫狀態...
git fetch
git status

echo.
pause
