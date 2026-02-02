# 🚀 Railway 部署步驟（代碼已推送成功！）

## ✅ 當前狀態
- ✅ 代碼已成功推送到 GitHub
- ✅ 倉庫：https://github.com/galaxysteven111/backend
- 🎯 下一步：在 Railway 部署

---

## 📋 Railway 部署步驟

### 步驟 1：訪問 Railway

1. **前往** https://railway.app
2. **點擊** "Login" 或 "Start a New Project"
3. **選擇** "Login with GitHub"
4. **授權** Railway 訪問你的 GitHub 帳號

---

### 步驟 2：創建新項目

1. **點擊** "New Project"
2. **選擇** "Deploy from GitHub repo"
3. **選擇** `galaxysteven111/backend` 倉庫
4. Railway 會自動開始部署

---

### 步驟 3：設置 Root Directory ⚠️ 重要！

因為你的倉庫結構是：
```
backend/          ← 倉庫根目錄
  ├── backend/    ← 後端代碼在這裡
  ├── frontend/   ← 前端代碼在這裡
  └── ...
```

**需要設置 Root Directory**：

1. **點擊**剛創建的服務
2. **進入** "Settings" 標籤
3. **找到** "Root Directory"
4. **設置為**：`backend`
5. **保存**（Railway 會自動重新部署）

---

### 步驟 4：添加 PostgreSQL 數據庫

1. **在項目頁面**，點擊 "New"
2. **選擇** "Database" → "PostgreSQL"
3. Railway 會自動創建數據庫
4. ✅ `DATABASE_URL` 會自動設置（無需手動配置）

---

### 步驟 5：生成 JWT_SECRET

在本地終端運行：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**複製生成的密鑰**（長字符串，例如：`a1b2c3d4e5f6...`）

---

### 步驟 6：設置環境變量

在服務設置 → "Variables" 標籤中，點擊 "New Variable"，添加：

**變量 1**：
- Key: `NODE_ENV`
- Value: `production`

**變量 2**：
- Key: `JWT_SECRET`
- Value: `你的密鑰`（步驟 5 生成的）

**變量 3**：
- Key: `FRONTEND_URL`
- Value: `http://localhost:3000`（稍後更新為 Netlify URL）

點擊 "Add" 保存每個變量。

---

### 步驟 7：運行數據庫遷移

**方法 1：使用 Post Deploy Command（推薦）**

1. 服務設置 → "Deploy" 標籤
2. 找到 "Post Deploy Command"
3. 輸入：`npm run migrate:prod`
4. 點擊 "Save"
5. Railway 會在每次部署後自動運行遷移

**方法 2：使用 Shell（手動運行）**

1. 服務頁面 → "Deployments" 標籤
2. 點擊最新的部署
3. 點擊 "View Logs"
4. 點擊 "Shell" 標籤
5. 運行：
   ```bash
   npm run migrate:prod
   ```

---

### 步驟 8：獲取 API URL

1. 服務設置 → "Networking" 標籤
2. 點擊 "Generate Domain"
3. Railway 會生成一個域名，例如：`your-app.up.railway.app`
4. **記下這個 URL**

**API 基礎 URL** 是：`https://your-app.up.railway.app/api`

---

## ✅ 部署完成！

部署完成後，你會得到：
- **後端 API URL**: `https://your-app.up.railway.app/api`

---

## 🧪 測試部署

在瀏覽器訪問：
```
https://your-app.up.railway.app/health
```

應該看到：
```json
{
  "status": "ok",
  "database": {
    "connected": true,
    "latency": "..."
  },
  "version": "1.0.0",
  "environment": "production"
}
```

---

## 🔄 下一步：部署前端

部署完後端後：

1. **記下後端 API URL**：`https://your-app.up.railway.app/api`

2. **在 Netlify 部署前端**：
   - 訪問 https://app.netlify.com
   - 使用 GitHub 登錄
   - 選擇 "Deploy from GitHub repo"
   - 選擇 `galaxysteven111/backend`
   - 設置 Build command: `cd frontend && npm install && npm run build`
   - 設置 Publish directory: `frontend/dist`
   - 設置環境變量：`VITE_API_URL = https://your-app.up.railway.app/api`

3. **更新後端 CORS**：
   - 在 Railway 服務設置中
   - 更新 `FRONTEND_URL` 為你的 Netlify URL

---

## 📝 檢查清單

- [ ] Railway 項目已創建
- [ ] Root Directory 設置為 `backend`
- [ ] PostgreSQL 數據庫已添加
- [ ] 環境變量已設置（NODE_ENV, JWT_SECRET, FRONTEND_URL）
- [ ] Post Deploy Command 已設置（`npm run migrate:prod`）
- [ ] 域名已生成
- [ ] 健康檢查通過

---

**現在開始在 Railway 部署！訪問 https://railway.app** 🚀
