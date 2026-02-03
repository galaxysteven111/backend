# Claude AI 更新 Railway 專案配置 Prompt

請將以下內容發送給 Claude AI：

---

## 任務：更新所有文件以適應新的 Railway 專案

我有一個 Node.js + TypeScript + Express 後端項目，需要重新創建 Railway 專案。請更新所有相關文件，確保它們適用於新的 Railway 專案設置。

---

## 需要更新的文件

### 1. Railway 配置文件

**需要檢查/更新的文件**：
- `backend/railway.json` - Railway 部署配置
- `backend/Dockerfile` - Docker 構建配置
- `backend/Procfile` - 進程管理配置

**更新要求**：
- 確保配置適用於新的 Railway 專案
- 確保構建和啟動命令正確
- 確保環境變量配置正確

### 2. 部署文檔

**需要檢查/更新的文件**：
- `BACKEND_DEPLOYMENT.md` - 後端部署指南
- `QUICK_DEPLOY_BACKEND.md` - 快速部署指南
- `網站部署後端.md` - 網站部署指南
- `Railway部署步驟.md` - Railway 部署步驟
- `Railway快速部署.md` - Railway 快速部署
- `GITHUB_RAILWAY_DEPLOY.md` - GitHub Railway 部署
- `FINAL_DEPLOYMENT_GUIDE.md` - 最終部署指南

**更新要求**：
- 更新專案名稱（如果改變）
- 更新服務名稱（如果改變）
- 更新環境變量設置步驟
- 更新 PostgreSQL 連接步驟
- 確保所有步驟都是最新的

### 3. 環境變量文檔

**需要檢查/更新的文件**：
- `ENV_VARIABLES.md` - 環境變量說明
- `backend/README_DEPLOY.md` - 部署說明

**更新要求**：
- 確保環境變量列表完整
- 確保 Railway 環境變量設置說明正確
- 確保 PostgreSQL 連接說明正確

### 4. 部署腳本

**需要檢查/更新的文件**：
- `deploy-backend.bat` - 後端部署腳本
- `scripts/deploy-backend.sh` - 後端部署腳本
- `scripts/deploy-backend-windows.ps1` - Windows PowerShell 部署腳本

**更新要求**：
- 確保腳本適用於新的 Railway 專案
- 確保 Railway 命令正確
- 確保環境變量設置正確

---

## 更新要求

### 1. Railway 專案設置

**新專案設置步驟**：
1. 創建新的 Railway 專案
2. 添加 PostgreSQL 服務（命名為 `foodbox-db` 或使用默認名稱）
3. 添加後端服務（從 GitHub 連接，命名為 `foodbox-backend`）
4. 連接 PostgreSQL 服務到後端服務
5. 設置環境變量

**需要更新的內容**：
- 專案名稱（如果改變）
- 服務名稱（如果改變）
- 環境變量設置步驟
- PostgreSQL 連接步驟

### 2. 環境變量設置

**必須設置的環境變量**：
- `JWT_SECRET` - JWT 認證密鑰（必需）
- `DATABASE_URL` - 數據庫連接字符串（Railway 自動設置，如果已連接 PostgreSQL）
- `NODE_ENV` - 設置為 `production`（推薦）
- `FRONTEND_URL` - 前端 URL（如果需要 CORS）

**Railway 自動設置的變量**（如果 PostgreSQL 已連接）：
- `PGUSER` - 數據庫用戶名
- `PGPASSWORD` - 數據庫密碼
- `PGHOST` - 數據會主機
- `PGDATABASE` - 數據庫名稱
- `PGPORT` - 數據庫端口

### 3. PostgreSQL 連接步驟

**詳細步驟**：
1. 在 Railway 項目中添加 PostgreSQL 服務
2. 將 PostgreSQL 服務連接到後端服務
3. Railway 會自動設置 PG* 環境變量
4. 應用會自動從 PG* 變量構建 DATABASE_URL

---

## 需要更新的具體內容

### 1. 更新所有文檔中的專案名稱

如果專案名稱改變，需要更新：
- 所有部署文檔中的專案名稱
- 所有 Railway 命令中的專案名稱
- 所有環境變量設置說明

### 2. 更新服務名稱

如果服務名稱改變，需要更新：
- 所有文檔中的服務名稱
- 所有 Railway 命令中的服務名稱
- 所有環境變量引用

### 3. 更新 PostgreSQL 連接步驟

確保所有文檔都包含：
- 如何添加 PostgreSQL 服務
- 如何連接 PostgreSQL 服務到後端服務
- 如何確認連接成功
- 如何驗證 PG* 環境變量已設置

### 4. 更新環境變量設置步驟

確保所有文檔都包含：
- Railway Variables 頁面操作步驟
- 如何設置 JWT_SECRET
- 如何確認 DATABASE_URL 已設置
- 如何確認 PG* 變量已設置

### 5. 更新部署驗證步驟

確保所有文檔都包含：
- 如何檢查部署日誌
- 如何驗證環境變量已設置
- 如何驗證應用成功啟動
- 如何測試 API 端點

---

## 檢查清單

請檢查並更新以下內容：

### Railway 配置
- [ ] `backend/railway.json` - 配置正確
- [ ] `backend/Dockerfile` - 構建和啟動命令正確
- [ ] `backend/Procfile` - 進程管理配置正確

### 部署文檔
- [ ] 專案名稱已更新（如果改變）
- [ ] 服務名稱已更新（如果改變）
- [ ] PostgreSQL 連接步驟完整
- [ ] 環境變量設置步驟完整
- [ ] 部署驗證步驟完整

### 環境變量文檔
- [ ] 環境變量列表完整
- [ ] Railway 設置說明正確
- [ ] PostgreSQL 連接說明正確

### 部署腳本
- [ ] Railway 命令正確
- [ ] 環境變量設置正確
- [ ] 錯誤處理正確

---

## 預期結果

更新後應該能夠：
1. ✅ 按照文檔創建新的 Railway 專案
2. ✅ 正確設置 PostgreSQL 服務
3. ✅ 正確連接 PostgreSQL 服務到後端服務
- ✅ 正確設置環境變量
- ✅ 成功部署應用
- ✅ 應用正常啟動並連接數據庫

---

## 更新重點

1. **Railway 專案設置**：提供清晰的步驟說明如何創建新專案
2. **PostgreSQL 連接**：提供詳細的連接步驟
3. **環境變量設置**：提供完整的環境變量設置指南
4. **部署驗證**：提供驗證步驟確保部署成功

---

請檢查所有相關文件，更新 Railway 專案配置和部署文檔，確保它們適用於新的 Railway 專案設置，並提供清晰的步驟說明。
