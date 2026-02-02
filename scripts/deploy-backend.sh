#!/bin/bash

# 自動部署後端到 Railway 腳本
# 使用方法: ./scripts/deploy-backend.sh

set -e  # 遇到錯誤立即退出

echo "🚀 開始自動部署後端到 Railway..."
echo ""

# 顏色定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 檢查 Railway CLI 是否安裝
echo -e "${YELLOW}檢查 Railway CLI...${NC}"
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Railway CLI 未安裝，正在安裝...${NC}"
    curl -fsSL https://railway.app/install.sh | sh
    echo -e "${GREEN}✅ Railway CLI 安裝完成${NC}"
else
    echo -e "${GREEN}✅ Railway CLI 已安裝${NC}"
fi

# 檢查是否已登錄
echo ""
echo -e "${YELLOW}檢查 Railway 登錄狀態...${NC}"
if ! railway whoami &> /dev/null; then
    echo -e "${YELLOW}需要登錄 Railway...${NC}"
    railway login
else
    echo -e "${GREEN}✅ 已登錄 Railway${NC}"
fi

# 進入後端目錄
cd backend

# 檢查是否已初始化
if [ ! -f ".railway/config.json" ]; then
    echo ""
    echo -e "${YELLOW}初始化 Railway 項目...${NC}"
    railway init
    
    echo ""
    echo -e "${YELLOW}添加 PostgreSQL 數據庫...${NC}"
    railway add postgresql
else
    echo -e "${GREEN}✅ Railway 項目已初始化${NC}"
fi

# 生成 JWT_SECRET（如果還沒有）
echo ""
echo -e "${YELLOW}生成 JWT_SECRET...${NC}"
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
echo -e "${GREEN}✅ JWT_SECRET 已生成${NC}"

# 設置環境變量
echo ""
echo -e "${YELLOW}設置環境變量...${NC}"
railway variables set NODE_ENV=production
railway variables set JWT_SECRET="$JWT_SECRET"
echo -e "${YELLOW}請輸入前端 URL（Netlify 部署後更新）:${NC}"
read -p "FRONTEND_URL (留空使用 http://localhost:3000): " FRONTEND_URL
FRONTEND_URL=${FRONTEND_URL:-http://localhost:3000}
railway variables set FRONTEND_URL="$FRONTEND_URL"
echo -e "${GREEN}✅ 環境變量已設置${NC}"

# 部署
echo ""
echo -e "${YELLOW}開始部署...${NC}"
railway up

# 等待部署完成
echo ""
echo -e "${YELLOW}等待部署完成...${NC}"
sleep 10

# 運行數據庫遷移
echo ""
echo -e "${YELLOW}運行數據庫遷移...${NC}"
railway run npm run migrate:prod

# 獲取 URL
echo ""
echo -e "${YELLOW}獲取部署 URL...${NC}"
API_URL=$(railway domain)
if [ -z "$API_URL" ]; then
    echo -e "${YELLOW}正在生成域名...${NC}"
    railway domain generate
    API_URL=$(railway domain)
fi

echo ""
echo -e "${GREEN}✅ 部署完成！${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}後端 API URL: https://$API_URL/api${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "下一步："
echo "1. 在 Netlify 設置環境變量: VITE_API_URL=https://$API_URL/api"
echo "2. 更新 Railway 的 FRONTEND_URL 為你的 Netlify URL"
echo ""
