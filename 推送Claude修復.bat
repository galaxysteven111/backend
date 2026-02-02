@echo off
chcp 65001 >nul
echo 🚀 推送 Claude AI 的修復...
echo.

echo 步驟 1: 檢查修改...
git status

echo.
echo 步驟 2: 添加所有修改...
git add .

echo.
echo 步驟 3: 提交修復...
git commit -m "修復 JWT expiresIn 類型錯誤（Claude AI 修復）"

echo.
echo 步驟 4: 推送到 GitHub...
git push

if %errorlevel% equ 0 (
    echo.
    echo ✅✅✅ 推送成功！✅✅✅
    echo.
    echo 修復內容：
    echo   - JWT expiresIn 類型錯誤已修復
    echo   - 使用 jwt.SignOptions['expiresIn'] 類型斷言
    echo   - TypeScript 編譯通過
    echo   - Dockerfile 已使用 npm install
    echo.
    echo Railway 會自動重新部署
) else (
    echo.
    echo ❌ 推送失敗
    echo 請檢查錯誤訊息
)

echo.
pause
