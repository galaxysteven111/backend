# 自動部署前端到 Netlify 腳本 (Windows PowerShell)
# 使用方法: .\scripts\deploy-frontend-windows.ps1 <API_URL>

param(
    [Parameter(Mandatory=$true)]
    [string]$API_URL
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 開始自動部署前端到 Netlify..." -ForegroundColor Cyan
Write-Host ""

# 檢查 Netlify CLI 是否安裝
try {
    netlify --version | Out-Null
    Write-Host "✅ Netlify CLI 已安裝" -ForegroundColor Green
} catch {
    Write-Host "Netlify CLI 未安裝，正在安裝..." -ForegroundColor Yellow
    npm install -g netlify-cli
}

# 進入前端目錄
Set-Location frontend

# 構建前端
Write-Host "構建前端..." -ForegroundColor Yellow
npm install
npm run build

# 檢查是否已登錄
try {
    netlify status | Out-Null
    Write-Host "✅ 已登錄 Netlify" -ForegroundColor Green
} catch {
    Write-Host "需要登錄 Netlify..." -ForegroundColor Yellow
    netlify login
}

# 初始化（如果還沒有）
if (-not (Test-Path ".netlify\state.json")) {
    Write-Host "初始化 Netlify 項目..." -ForegroundColor Yellow
    netlify init
}

# 設置環境變量
Write-Host "設置環境變量..." -ForegroundColor Yellow
netlify env:set VITE_API_URL $API_URL

# 部署
Write-Host "開始部署..." -ForegroundColor Yellow
netlify deploy --prod

Write-Host ""
Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host ""
Write-Host "請記下 Netlify URL，然後更新後端的 FRONTEND_URL" -ForegroundColor Yellow

Set-Location ..
