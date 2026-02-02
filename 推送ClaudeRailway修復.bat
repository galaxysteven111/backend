@echo off
chcp 65001 >nul
echo 🚀 推送 Claude AI 的 Railway 修復...
echo.

cd "c:\Users\Galaxy\OneDrive\桌面\捐飯盒公司"

echo ========================================
echo 步驟 1: 檢查 Git 狀態
echo ========================================
git status

echo.
echo ========================================
echo 步驟 2: 添加所有修改
echo ========================================
git add .

echo.
echo ========================================
echo 步驟 3: 提交修復
echo ========================================
git commit -m "修復 Railway Not Found 錯誤：添加診斷日誌、根路由、改進 Dockerfile"

echo.
echo ========================================
echo 步驟 4: 推送到 GitHub
echo ========================================
git push

if %errorlevel% equ 0 (
    echo.
    echo ✅✅✅ 推送成功！✅✅✅
    echo.
    echo 修復內容：
    echo   - 添加環境變量診斷日誌
    echo   - 添加根路由 /
    echo   - 修復 Dockerfile（CMD、tsx、scripts）
    echo.
    echo ⚠️  重要：現在需要在 Railway 中設置環境變量：
    echo   1. JWT_SECRET（必需）
    echo   2. DATABASE_URL（如果未自動設置）
    echo   3. NODE_ENV=production（推薦）
    echo   4. FRONTEND_URL（如果需要）
    echo.
    echo Railway 會自動重新部署
) else (
    echo.
    echo ❌ 推送失敗
    echo 請檢查錯誤訊息
)

echo.
pause
