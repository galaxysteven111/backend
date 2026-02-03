# 📋 發送給 Claude AI 的完整更新 Prompt

## 🎯 直接複製以下內容發送給 Claude AI：

---

我有一個 Node.js + TypeScript + Express 後端項目，需要重新創建 Railway 專案。請檢查並更新所有相關文件，確保它們適用於新的 Railway 專案設置。

---

## 需要更新的文件清單

### 1. Railway 配置文件
- `backend/railway.json` - Railway 部署配置
- `backend/Dockerfile` - Docker 構建配置
- `backend/Procfile` - 進程管理配置
- `render.yaml` - Render 配置（可選）

### 2. 部署文檔（需要更新）
- `BACKEND_DEPLOYMENT.md` - 後端部署指南
- `QUICK_DEPLOY_BACKEND.md` - 快速部署指南
- `網站部署後端.md` - 網站部署指南
- `Railway部署步驟.md` - Railway 部署步驟
- `Railway快速部署.md` - Railway 快速部署
- `GITHUB_RAILWAY_DEPLOY.md` - GitHub Railway 部署
- `FINAL_DEPLOYMENT_GUIDE.md` - 最終部署指南
- `DEPLOY_FROM_LOCAL.md` - 從本地部署
- `GITHUB_SETUP.md` - GitHub 設置
- `GITHUB_SETUP_QUICK.md` - GitHub 快速設置

### 3. 環境變量文檔
- `ENV_VARIABLES.md` - 環境變量說明
- `backend/README_DEPLOY.md` - 部署說明

### 4. 部署腳本
- `deploy-backend.bat` - 後端部署腳本
- `scripts/deploy-backend.sh` - 後端部署腳本
- `scripts/deploy-backend-windows.ps1` - Windows PowerShell 部署腳本

---

## 更新要求

### 1. Railway 專案設置步驟

**新專案設置流程**：

1. **創建新的 Railway 專案**
   - 訪問 https://railway.app
   - 使用 GitHub 登錄
   - 點擊 "New Project"
   - 選擇 "Deploy from GitHub repo"
   - 選擇倉庫

2. **添加 PostgreSQL 服務**
   - 在項目中點擊 "+ New"
   - 選擇 "Database"
   - 選擇 "Add PostgreSQL"
   - 服務會自動創建（命名為 `Postgres` 或自定義名稱）

3. **添加後端服務**
   - 在項目中點擊 "+ New"
   - 選擇 "GitHub Repo"
   - 選擇倉庫
   - 設置 Root Directory 為 `backend`
   - 服務會自動創建（命名為 `foodbox-backend` 或自定義名稱）

4. **連接 PostgreSQL 服務到後端服務**
   - 方法 A：在後端服務的 Variables 頁面
     - 點擊 "+ New Variable"
     - 選擇 "Reference Variable from Service"
     - 選擇 PostgreSQL 服務
     - 選擇 `DATABASE_URL` 變量
   - 方法 B：在 PostgreSQL 服務的 Settings 頁面
     - 點擊 "Connect" 或 "Add Connection"
     - 選擇後端服務
     - 確認連接

5. **設置環境變量**
   - 在後端服務的 Variables 頁面
   - 添加 `JWT_SECRET`（必需）
   - 添加 `NODE_ENV=production`（推薦）
   - 添加 `FRONTEND_URL`（如果需要 CORS）
   - Railway 會自動設置 PG* 變量（如果 PostgreSQL 已連接）

### 2. PostgreSQL 連接步驟（詳細）

**在 Railway 中連接 PostgreSQL 服務**：

1. **打開後端服務**
   - Railway → 項目 → `foodbox-backend` 服務
   - 點擊 "Variables" 標籤

2. **連接數據庫**
   - 方法 A：使用 "Add Variable" 提示
     - 找到 "Trying to connect a database? Add Variable" 提示
     - 點擊 "Add Variable" 鏈接
     - 選擇 "Reference Variable from Service"
     - 選擇 PostgreSQL 服務
     - 選擇 `DATABASE_URL` 變量
   - 方法 B：使用 + New Variable 按鈕
     - 點擊 "+ New Variable" 按鈕
     - 選擇 "Reference Variable from Service"
     - 選擇 PostgreSQL 服務
     - 選擇 `DATABASE_URL` 變量

3. **確認連接成功**
   - 在 Variables 列表中，應該看到 `DATABASE_URL` 已設置
   - 展開 "X variables added by Railway" 部分
   - 應該看到 `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGDATABASE` 等變量

### 3. 環境變量設置（完整）

**必須設置的環境變量**：
- `JWT_SECRET` - JWT 認證密鑰（必需，任意隨機字符串 32+ 字符）
- `DATABASE_URL` - 數據庫連接字符串（Railway 自動設置，如果已連接 PostgreSQL）
- `NODE_ENV` - 設置為 `production`（推薦）
- `FRONTEND_URL` - 前端 URL（如果需要 CORS）

**Railway 自動設置的變量**（如果 PostgreSQL 已連接）：
- `PGUSER` - 數據庫用戶名
- `PGPASSWORD` - 數據庫密碼
- `PGHOST` - 數據庫主機（或 `RAILWAY_PRIVATE_DOMAIN`）
- `PGDATABASE` - 數據庫名稱
- `PGPORT` - 數據庫端口（默認 5432）

### 4. 部署驗證步驟

**驗證部署成功**：

1. **檢查部署日誌**
   - Railway → `foodbox-backend` → "Deploy Logs"
   - 應該看到：
     ```
     🔍 環境變量檢查
     JWT_SECRET: ✅ 已設置
     DATABASE_URL: ✅ 已設置（從 PG* 變量構建）
     PGUSER: ✅ 已設置
     PGHOST: ✅ 已設置
     PGDATABASE: ✅ 已設置
     ✅ 環境變量驗證通過
     🚀 服務器已啟動
     ```

2. **檢查健康檢查**
   - 健康檢查應該通過
   - `/health` 端點應該返回 200

3. **測試 API 端點**
   - 訪問根路由：`https://your-app.railway.app/`
   - 訪問健康檢查：`https://your-app.railway.app/health`
   - 應該返回正常的 JSON 響應

---

## 需要更新的具體內容

### 1. 更新所有文檔中的專案名稱

如果專案名稱改變，需要更新：
- 所有部署文檔中的專案名稱
- 所有 Railway 命令中的專案名稱
- 所有環境變量設置說明
- 所有服務名稱引用

### 2. 更新服務名稱

如果服務名稱改變，需要更新：
- 所有文檔中的服務名稱（`foodbox-backend`, `foodbox-db`）
- 所有 Railway 命令中的服務名稱
- 所有環境變量引用（`${{foodbox-db.DATABASE_URL}}`）

### 3. 更新 PostgreSQL 連接步驟

確保所有文檔都包含：
- 如何添加 PostgreSQL 服務
- 如何連接 PostgreSQL 服務到後端服務（兩種方法）
- 如何確認連接成功
- 如何驗證 PG* 環境變量已設置
- 如何檢查 Railway Variables 頁面

### 4. 更新環境變量設置步驟

確保所有文檔都包含：
- Railway Variables 頁面操作步驟
- 如何設置 JWT_SECRET（詳細步驟）
- 如何確認 DATABASE_URL 已設置
- 如何確認 PG* 變量已設置
- 如何展開 "variables added by Railway" 部分

### 5. 更新部署驗證步驟

確保所有文檔都包含：
- 如何檢查部署日誌（Deploy Logs）
- 如何驗證環境變量已設置
- 如何驗證應用成功啟動
- 如何測試 API 端點
- 如何檢查健康檢查狀態

### 6. 更新 Railway 配置文件

確保配置文件正確：
- `railway.json` - 構建和部署命令正確
- `Dockerfile` - 構建順序正確，CMD 正確
- `Procfile` - 啟動命令正確

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
- [ ] PostgreSQL 連接步驟完整（兩種方法）
- [ ] 環境變量設置步驟完整
- [ ] 部署驗證步驟完整
- [ ] Railway Variables 頁面操作說明清晰

### 環境變量文檔
- [ ] 環境變量列表完整
- [ ] Railway 設置說明正確
- [ ] PostgreSQL 連接說明正確
- [ ] PG* 變量說明完整

### 部署腳本
- [ ] Railway 命令正確
- [ ] 環境變量設置正確
- [ ] 錯誤處理正確

---

## 預期結果

更新後應該能夠：
1. ✅ 按照文檔創建新的 Railway 專案
2. ✅ 正確設置 PostgreSQL 服務
3. ✅ 正確連接 PostgreSQL 服務到後端服務（兩種方法）
4. ✅ 正確設置環境變量
5. ✅ 成功部署應用
6. ✅ 應用正常啟動並連接數據庫
7. ✅ 健康檢查通過
8. ✅ API 端點正常工作

---

## 更新重點

1. **Railway 專案設置**：提供清晰的步驟說明如何創建新專案
2. **PostgreSQL 連接**：提供兩種連接方法的詳細步驟
3. **環境變量設置**：提供完整的環境變量設置指南
4. **部署驗證**：提供驗證步驟確保部署成功
5. **Railway Variables 頁面操作**：提供詳細的界面操作說明

---

請檢查所有相關文件，更新 Railway 專案配置和部署文檔，確保它們適用於新的 Railway 專案設置，並提供清晰的步驟說明。更新後，請提供一個總結，說明哪些文件已更新，以及新專案設置的關鍵步驟。

---

## 📝 使用說明

1. 複製上面的內容
2. 發送給 Claude AI
3. Claude AI 會檢查並更新所有相關文件
4. 提供更新後的完整文檔和設置指南
