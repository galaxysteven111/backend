# Railway 部署指南 — 捐飯盒平台後端

> 本文件是後端 Railway 部署的唯一參考文件，涵蓋從零開始的完整設置流程。

## 前置條件

- GitHub 帳號，代碼已推送到 GitHub 倉庫
- Railway 帳號（https://railway.app）
- 前端已部署到 Netlify（或其他平台），記下前端 URL

---

## 步驟 1：建立 Railway 項目

1. 登入 https://railway.app
2. 點擊 **New Project**
3. 選擇 **Deploy from GitHub repo**
4. 授權並選擇你的倉庫
5. **重要**：設置 Root Directory 為 `backend`
   - Settings → General → Root Directory → 輸入 `backend`

---

## 步驟 2：添加 PostgreSQL 數據庫

1. 在項目中點擊 **New** → **Database** → **Add PostgreSQL**
2. 等待 PostgreSQL 服務啟動
3. **連接數據庫到後端服務**：
   - 點擊 PostgreSQL 服務
   - 進入 **Settings** 頁面
   - 找到 **Connect** 區域
   - 選擇你的後端服務（foodbox-backend）
   - 這會自動注入 `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGPORT`, `PGDATABASE` 等變量

> **注意**：後端代碼會自動從 PG* 變量構建 `DATABASE_URL`，無需手動設置。

---

## 步驟 3：設置環境變量

在 Railway Dashboard → 後端服務 → **Variables** 中添加：

### 必需（手動設置）

| 變量名 | 值 | 說明 |
|--------|------|------|
| `JWT_SECRET` | *(見下方生成方式)* | JWT 認證密鑰，至少 32 字符 |
| `FRONTEND_URL` | `https://your-app.netlify.app` | 前端部署地址（CORS 用） |
| `NODE_ENV` | `production` | 運行環境 |

生成 JWT_SECRET：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 自動注入（連接 PostgreSQL 後）

以下變量由 Railway 自動設置，**無需手動添加**：

| 變量名 | 說明 |
|--------|------|
| `PGUSER` | 數據庫用戶名 |
| `PGPASSWORD` | 數據庫密碼 |
| `PGHOST` | 數據庫主機 |
| `PGPORT` | 數據庫端口 |
| `PGDATABASE` | 數據庫名稱 |
| `PORT` | Railway 分配的端口 |

---

## 步驟 4：構建設置

項目已配置為使用 Dockerfile 構建（`railway.json` 中 `builder: "DOCKERFILE"`）。

Railway 會自動：
1. 檢測 `backend/Dockerfile`
2. 執行多階段 Docker 構建
3. 使用 `node dist/index.js` 啟動服務

**無需手動配置構建命令。**

---

## 步驟 5：生成公開域名

1. 點擊後端服務 → **Settings**
2. 找到 **Networking** 區域
3. 點擊 **Generate Domain**
4. 記下生成的 URL，格式為：`https://xxxxx.up.railway.app`
5. API 地址為：`https://xxxxx.up.railway.app/api`

---

## 步驟 6：運行數據庫遷移

部署成功後，在 Railway 終端運行遷移：

**方式 1**：使用 Railway CLI
```bash
# 安裝 Railway CLI
npm install -g @railway/cli

# 登入
railway login

# 連接到項目
railway link

# 執行遷移
railway run npm run db:migrate
```

**方式 2**：使用 Railway Dashboard 終端
1. 點擊後端服務
2. 進入 **Shell** 標籤
3. 運行：
```bash
npm run db:migrate
```

---

## 步驟 7：驗證部署

### 檢查健康狀態
```bash
curl https://xxxxx.up.railway.app/health
```

預期回應：
```json
{
  "status": "ok",
  "database": { "connected": true },
  "environment": "production"
}
```

### 檢查根路由
```bash
curl https://xxxxx.up.railway.app/
```

預期回應：
```json
{
  "message": "捐飯盒平台 API",
  "version": "1.0.0",
  "health": "/health"
}
```

---

## 步驟 8：更新前端 API 地址

在前端部署平台（Netlify）設置環境變量：
```
VITE_API_URL=https://xxxxx.up.railway.app/api
```

然後重新部署前端。

---

## 故障排除

### 部署失敗：查看構建日誌
Railway Dashboard → 後端服務 → **Deployments** → 點擊失敗的部署查看日誌

### Health Check 失敗
- `/health` 端點始終返回 HTTP 200
- 如果數據庫斷開，狀態為 `"degraded"` 但仍返回 200
- 檢查 Railway 日誌確認是否有啟動錯誤

### DATABASE_URL 問題
後端會自動處理以下情況：
- `DATABASE_URL` 包含未解析的 `${{...}}` 模板 → 從 PG* 變量構建
- `DATABASE_URL` 缺失 → 從 PG* 變量構建
- 如果 PG* 變量也缺失 → 啟動日誌會顯示哪些變量未設置

**確認 PostgreSQL 已正確連接**：
1. Railway Dashboard → PostgreSQL 服務 → Settings → Connect
2. 確認後端服務已在連接列表中
3. 在後端服務的 Variables 中確認能看到 `PGUSER` 等變量

### 常見錯誤

| 錯誤 | 原因 | 解決方式 |
|------|------|----------|
| `Not Found` | 路由未匹配 | 確認請求路徑正確（API 路徑以 `/api` 開頭） |
| `service unavailable` | 健康檢查失敗 | 查看啟動日誌，確認端口綁定正確 |
| `JWT_SECRET` 錯誤 | 環境變量未設置 | 在 Variables 中添加 JWT_SECRET |
| 數據庫連接失敗 | PostgreSQL 未連接 | 重新連接 PostgreSQL 到後端服務 |

---

## 項目文件說明

| 文件 | 用途 |
|------|------|
| `backend/Dockerfile` | Docker 多階段構建配置 |
| `backend/railway.json` | Railway 平台配置（使用 Dockerfile 構建） |
| `backend/Procfile` | 備用啟動命令 |
| `backend/src/config/env.ts` | 環境變量驗證和 DATABASE_URL 自動構建 |
| `backend/scripts/migrate.js` | 跨平台遷移腳本 |
| `ENV_VARIABLES.md` | 環境變量完整說明 |
