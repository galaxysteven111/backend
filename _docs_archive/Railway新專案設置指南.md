# 🚀 Railway 新專案設置指南

## 📋 設置步驟

### 步驟 1：創建新的 Railway 專案

1. **訪問 Railway**
   - 前往 https://railway.app
   - 使用 GitHub 登錄

2. **新建項目**
   - 點擊 "New Project"
   - 選擇 "Deploy from GitHub repo"
   - 選擇你的倉庫

---

### 步驟 2：添加 PostgreSQL 服務

1. **添加數據庫**
   - 在項目中點擊 "+ New"
   - 選擇 "Database"
   - 選擇 "Add PostgreSQL"
   - 服務會自動創建（命名為 `Postgres` 或自定義名稱）

2. **確認服務運行**
   - 在服務列表中，確認 PostgreSQL 服務狀態為 "Running"

---

### 步驟 3：添加後端服務

1. **添加 GitHub Repo**
   - 在項目中點擊 "+ New"
   - 選擇 "GitHub Repo"
   - 選擇倉庫
   - 設置 Root Directory 為 `backend`
   - 服務會自動創建（命名為 `foodbox-backend` 或自定義名稱）

2. **確認服務設置**
   - Railway 會自動檢測 Dockerfile
   - 確認構建配置正確

---

### 步驟 4：連接 PostgreSQL 服務到後端服務

#### 方法 A：通過後端服務 Variables 頁面（推薦）

1. **打開後端服務**
   - Railway → 項目 → `foodbox-backend` 服務
   - 點擊 "Variables" 標籤

2. **連接數據庫**
   - 找到 "Trying to connect a database? Add Variable" 提示
   - 點擊 "Add Variable" 鏈接
   - 選擇 "Reference Variable from Service"
   - 選擇 PostgreSQL 服務
   - 選擇 `DATABASE_URL` 變量
   - 點擊 "Add"

#### 方法 B：通過 PostgreSQL 服務 Settings 頁面

1. **打開 PostgreSQL 服務**
   - Railway → 項目 → PostgreSQL 服務
   - 點擊 "Settings" 標籤

2. **連接服務**
   - 查找 "Connections" 或 "Connected Services" 部分
   - 點擊 "Connect" 或 "Add Connection"
   - 選擇 `foodbox-backend` 服務
   - 點擊 "Connect"

---

### 步驟 5：設置環境變量

1. **打開後端服務 Variables**
   - Railway → 項目 → `foodbox-backend` → Variables

2. **添加 JWT_SECRET**
   - 點擊 "+ New Variable"
   - Key: `JWT_SECRET`
   - Value: `your-secret-key-here-change-this-in-production-12345`
   - 點擊 "Add"

3. **添加 NODE_ENV**
   - 點擊 "+ New Variable"
   - Key: `NODE_ENV`
   - Value: `production`
   - 點擊 "Add"

4. **添加 FRONTEND_URL**（如果需要）
   - 點擊 "+ New Variable"
   - Key: `FRONTEND_URL`
   - Value: `https://your-frontend-url.netlify.app`
   - 點擊 "Add"

5. **確認 PG* 變量已自動設置**
   - 展開 "X variables added by Railway" 部分
   - 應該看到 `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGDATABASE` 等變量

---

### 步驟 6：驗證部署

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

## ✅ 完成！

設置完成後，應用應該能夠：
- ✅ 成功啟動
- ✅ 連接數據庫
- ✅ 健康檢查通過
- ✅ API 端點正常工作

---

## 📝 注意事項

- Railway 會自動重新部署（當環境變量改變時）
- PostgreSQL 連接後，Railway 會自動設置 PG* 變量
- 應用會自動從 PG* 變量構建 DATABASE_URL
- 如果遇到問題，檢查部署日誌查看詳細錯誤訊息
