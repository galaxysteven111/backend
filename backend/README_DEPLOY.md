# 後端部署說明

## Railway 部署（推薦）

完整的 Railway 部署指南請參考項目根目錄的 **[RAILWAY_DEPLOY.md](../RAILWAY_DEPLOY.md)**。

### 快速摘要

1. Railway 新建項目 → Deploy from GitHub → Root Directory 設為 `backend`
2. 添加 PostgreSQL 插件並連接到後端服務
3. 設置環境變量：`JWT_SECRET`、`FRONTEND_URL`、`NODE_ENV=production`
4. 生成公開域名
5. 運行數據庫遷移：`npm run db:migrate`
6. 驗證：`curl https://your-app.up.railway.app/health`

### 環境變量

詳見 **[ENV_VARIABLES.md](../ENV_VARIABLES.md)**。

### 構建流程

項目使用 Dockerfile 多階段構建：
1. Builder 階段：安裝依賴 → 編譯 TypeScript
2. 生產階段：只複製編譯結果和生產依賴 → `node dist/index.js`

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建
npm run build

# 數據庫遷移
npm run db:migrate
```
