# 快速測試腳本

## Windows PowerShell 測試腳本

創建 `test.ps1`：

```powershell
# 測試腳本
Write-Host "開始測試捐飯盒平台..." -ForegroundColor Green

# 1. 檢查 Node.js
Write-Host "`n1. 檢查 Node.js..." -ForegroundColor Yellow
node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "錯誤：未安裝 Node.js" -ForegroundColor Red
    exit 1
}

# 2. 檢查 PostgreSQL（需要手動確認）
Write-Host "`n2. 請確認 PostgreSQL 正在運行..." -ForegroundColor Yellow
Read-Host "按 Enter 繼續"

# 3. 獲取 IP 地址
Write-Host "`n3. 獲取本機 IP 地址..." -ForegroundColor Yellow
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254.*"}).IPAddress | Select-Object -First 1
Write-Host "你的 IP 地址: $ip" -ForegroundColor Cyan
Write-Host "手機訪問地址: http://$ip:3000" -ForegroundColor Cyan

# 4. 檢查依賴
Write-Host "`n4. 檢查依賴..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "安裝依賴..." -ForegroundColor Yellow
    npm run install:all
}

# 5. 檢查環境變數
Write-Host "`n5. 檢查環境變數..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host "警告：未找到 .env 文件，請先配置！" -ForegroundColor Red
    Write-Host "複製 .env.example 到 .env 並填寫配置" -ForegroundColor Yellow
    exit 1
}

# 6. 啟動服務器
Write-Host "`n6. 啟動開發服務器..." -ForegroundColor Yellow
Write-Host "前端: http://localhost:3000" -ForegroundColor Cyan
Write-Host "後端: http://localhost:3001" -ForegroundColor Cyan
Write-Host "手機訪問: http://$ip:3000" -ForegroundColor Cyan
Write-Host "`n按 Ctrl+C 停止服務器" -ForegroundColor Yellow
npm run dev
```

## Mac/Linux Bash 測試腳本

創建 `test.sh`：

```bash
#!/bin/bash

echo "開始測試捐飯盒平台..."

# 1. 檢查 Node.js
echo ""
echo "1. 檢查 Node.js..."
if ! command -v node &> /dev/null; then
    echo "錯誤：未安裝 Node.js"
    exit 1
fi
node --version

# 2. 檢查 PostgreSQL
echo ""
echo "2. 請確認 PostgreSQL 正在運行..."
read -p "按 Enter 繼續..."

# 3. 獲取 IP 地址
echo ""
echo "3. 獲取本機 IP 地址..."
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
echo "你的 IP 地址: $IP"
echo "手機訪問地址: http://$IP:3000"

# 4. 檢查依賴
echo ""
echo "4. 檢查依賴..."
if [ ! -d "node_modules" ]; then
    echo "安裝依賴..."
    npm run install:all
fi

# 5. 檢查環境變數
echo ""
echo "5. 檢查環境變數..."
if [ ! -f ".env" ]; then
    echo "警告：未找到 .env 文件，請先配置！"
    echo "複製 .env.example 到 .env 並填寫配置"
    exit 1
fi

# 6. 啟動服務器
echo ""
echo "6. 啟動開發服務器..."
echo "前端: http://localhost:3000"
echo "後端: http://localhost:3001"
echo "手機訪問: http://$IP:3000"
echo ""
echo "按 Ctrl+C 停止服務器"
npm run dev
```

使用方法：
```bash
chmod +x test.sh
./test.sh
```
