# 快速部署命令 - 複製到 Cursor 終端執行

# 步驟 1：檢查 Railway CLI
Write-Host "步驟 1：檢查 Railway CLI" -ForegroundColor Cyan
railway --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "安裝 Railway CLI..." -ForegroundColor Yellow
    iwr https://railway.app/install.ps1 -useb | iex
}

# 步驟 2：登錄
Write-Host "`n步驟 2：登錄 Railway" -ForegroundColor Cyan
railway login

# 步驟 3：進入後端目錄
Write-Host "`n步驟 3：進入後端目錄" -ForegroundColor Cyan
Set-Location backend

# 步驟 4：初始化項目
Write-Host "`n步驟 4：初始化 Railway 項目" -ForegroundColor Cyan
railway init

# 步驟 5：添加數據庫
Write-Host "`n步驟 5：添加 PostgreSQL 數據庫" -ForegroundColor Cyan
railway add postgresql

# 步驟 6：生成 JWT_SECRET
Write-Host "`n步驟 6：生成 JWT_SECRET" -ForegroundColor Cyan
$JWT_SECRET = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Write-Host "生成的 JWT_SECRET: $JWT_SECRET" -ForegroundColor Green

# 步驟 7：設置環境變量
Write-Host "`n步驟 7：設置環境變量" -ForegroundColor Cyan
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=$JWT_SECRET
railway variables set FRONTEND_URL=http://localhost:3000

# 步驟 8：部署
Write-Host "`n步驟 8：部署應用" -ForegroundColor Cyan
railway up

# 步驟 9：運行遷移
Write-Host "`n步驟 9：運行數據庫遷移" -ForegroundColor Cyan
railway run npm run migrate:prod

# 步驟 10：獲取 URL
Write-Host "`n步驟 10：獲取 API URL" -ForegroundColor Cyan
railway domain generate
$API_URL = railway domain
Write-Host "`n✅ 部署完成！" -ForegroundColor Green
Write-Host "API URL: https://$API_URL/api" -ForegroundColor Green
