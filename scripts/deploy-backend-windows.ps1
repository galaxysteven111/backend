# 自動部署後端到 Railway 腳本 (Windows PowerShell)
# 使用方法: .\scripts\deploy-backend-windows.ps1

$ErrorActionPreference = "Stop"

Write-Host "🚀 開始自動部署後端到 Railway..." -ForegroundColor Cyan
Write-Host ""

# 檢查 Railway CLI 是否安裝
Write-Host "檢查 Railway CLI..." -ForegroundColor Yellow
try {
    railway --version | Out-Null
    Write-Host "✅ Railway CLI 已安裝" -ForegroundColor Green
} catch {
    Write-Host "Railway CLI 未安裝，正在安裝..." -ForegroundColor Yellow
    Invoke-WebRequest https://railway.app/install.ps1 -UseBasicParsing | Invoke-Expression
    Write-Host "✅ Railway CLI 安裝完成" -ForegroundColor Green
}

# 檢查是否已登錄
Write-Host ""
Write-Host "檢查 Railway 登錄狀態..." -ForegroundColor Yellow
try {
    railway whoami | Out-Null
    Write-Host "✅ 已登錄 Railway" -ForegroundColor Green
} catch {
    Write-Host "需要登錄 Railway..." -ForegroundColor Yellow
    railway login
}

# 進入後端目錄
Set-Location backend

# 檢查是否已初始化
if (-not (Test-Path ".railway\config.json")) {
    Write-Host ""
    Write-Host "初始化 Railway 項目..." -ForegroundColor Yellow
    railway init
    
    Write-Host ""
    Write-Host "添加 PostgreSQL 數據庫..." -ForegroundColor Yellow
    railway add postgresql
} else {
    Write-Host "✅ Railway 項目已初始化" -ForegroundColor Green
}

# 生成 JWT_SECRET
Write-Host ""
Write-Host "生成 JWT_SECRET..." -ForegroundColor Yellow
$JWT_SECRET = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Write-Host "✅ JWT_SECRET 已生成" -ForegroundColor Green

# 設置環境變量
Write-Host ""
Write-Host "設置環境變量..." -ForegroundColor Yellow
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=$JWT_SECRET

$FRONTEND_URL = Read-Host "請輸入前端 URL (Netlify 部署後更新，留空使用 http://localhost:3000)"
if ([string]::IsNullOrWhiteSpace($FRONTEND_URL)) {
    $FRONTEND_URL = "http://localhost:3000"
}
railway variables set FRONTEND_URL=$FRONTEND_URL
Write-Host "✅ 環境變量已設置" -ForegroundColor Green

# 部署
Write-Host ""
Write-Host "開始部署..." -ForegroundColor Yellow
railway up

# 等待部署完成
Write-Host ""
Write-Host "等待部署完成..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# 運行數據庫遷移
Write-Host ""
Write-Host "運行數據庫遷移..." -ForegroundColor Yellow
railway run npm run migrate:prod

# 獲取 URL
Write-Host ""
Write-Host "獲取部署 URL..." -ForegroundColor Yellow
$API_URL = railway domain
if ([string]::IsNullOrWhiteSpace($API_URL)) {
    Write-Host "正在生成域名..." -ForegroundColor Yellow
    railway domain generate
    $API_URL = railway domain
}

Write-Host ""
Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "後端 API URL: https://$API_URL/api" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步：" -ForegroundColor Yellow
Write-Host "1. 在 Netlify 設置環境變量: VITE_API_URL=https://$API_URL/api"
Write-Host "2. 更新 Railway 的 FRONTEND_URL 為你的 Netlify URL"
Write-Host ""

Set-Location ..
