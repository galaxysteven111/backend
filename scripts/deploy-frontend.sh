#!/bin/bash

# 自動部署前端到 Netlify 腳本
# 使用方法: ./scripts/deploy-frontend.sh <API_URL>

set -e

API_URL=$1

if [ -z "$API_URL" ]; then
    echo "❌ 錯誤: 請提供後端 API URL"
    echo "使用方法: ./scripts/deploy-frontend.sh https://your-backend.up.railway.app/api"
    exit 1
fi

echo "🚀 開始自動部署前端到 Netlify..."
echo ""

# 檢查 Netlify CLI 是否安裝
if ! command -v netlify &> /dev/null; then
    echo "Netlify CLI 未安裝，正在安裝..."
    npm install -g netlify-cli
fi

# 進入前端目錄
cd frontend

# 構建前端
echo "構建前端..."
npm install
npm run build

# 檢查是否已登錄
if ! netlify status &> /dev/null; then
    echo "需要登錄 Netlify..."
    netlify login
fi

# 初始化（如果還沒有）
if [ ! -f ".netlify/state.json" ]; then
    echo "初始化 Netlify 項目..."
    netlify init
fi

# 設置環境變量
echo "設置環境變量..."
netlify env:set VITE_API_URL "$API_URL"

# 部署
echo "開始部署..."
netlify deploy --prod

echo ""
echo "✅ 部署完成！"
echo ""
echo "請記下 Netlify URL，然後更新後端的 FRONTEND_URL"

cd ..
