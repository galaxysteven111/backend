@echo off
chcp 65001 >nul
echo 🚀 推送 TypeScript 錯誤修復...
echo.

echo 步驟 1: 添加文件...
git add .

echo.
echo 步驟 2: 提交修復...
git commit -m "修復 TypeScript 編譯錯誤"

echo.
echo 步驟 3: 推送到 GitHub...
git push

if %errorlevel% equ 0 (
    echo.
    echo ✅✅✅ 推送成功！✅✅✅
    echo.
    echo Railway 會自動重新部署
    echo 或手動觸發：在 Railway 項目頁面點擊 "Redeploy"
) else (
    echo.
    echo ❌ 推送失敗
    echo 請檢查錯誤訊息
)

echo.
pause
