@echo off
chcp 65001 >nul
echo 🚀 開始部署後端到 Railway...
echo.

echo 步驟 1: 檢查 Railway CLI...
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Railway CLI 未安裝，正在安裝...
    powershell -Command "iwr https://railway.app/install.ps1 -useb | iex"
    echo.
)

echo 步驟 2: 登錄 Railway...
railway login
if %errorlevel% neq 0 (
    echo 登錄失敗，請手動執行: railway login
    pause
    exit /b 1
)

echo.
echo 步驟 3: 進入後端目錄...
cd backend
if %errorlevel% neq 0 (
    echo 無法進入 backend 目錄
    pause
    exit /b 1
)

echo.
echo 步驟 4: 初始化 Railway 項目...
railway init
if %errorlevel% neq 0 (
    echo 初始化失敗
    pause
    exit /b 1
)

echo.
echo 步驟 5: 添加 PostgreSQL 數據庫...
railway add postgresql
if %errorlevel% neq 0 (
    echo 添加數據庫失敗
    pause
    exit /b 1
)

echo.
echo 步驟 6: 生成 JWT_SECRET...
for /f "delims=" %%i in ('node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"') do set JWT_SECRET=%%i
echo 生成的 JWT_SECRET: %JWT_SECRET%

echo.
echo 步驟 7: 設置環境變量...
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=%JWT_SECRET%
railway variables set FRONTEND_URL=http://localhost:3000

echo.
echo 步驟 8: 部署應用...
railway up
if %errorlevel% neq 0 (
    echo 部署失敗
    pause
    exit /b 1
)

echo.
echo 步驟 9: 運行數據庫遷移...
railway run npm run migrate:prod

echo.
echo 步驟 10: 獲取 API URL...
railway domain generate
railway domain

echo.
echo ✅ 部署完成！
echo.
pause
