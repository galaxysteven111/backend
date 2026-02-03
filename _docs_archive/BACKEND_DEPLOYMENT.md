# 後端部署指南

## 🎯 推薦平台

### 1. Railway（最簡單）⭐ 推薦
- ✅ 免費額度充足
- ✅ 自動部署
- ✅ 內置 PostgreSQL
- ✅ 簡單易用

### 2. Render
- ✅ 免費層可用
- ✅ 自動部署
- ✅ 內置 PostgreSQL

### 3. Fly.io
- ✅ 全球 CDN
- ✅ 免費層可用
- ✅ 支持多區域

---

## 🚀 方法 1：Railway 部署（推薦）

### 步驟 1：準備代碼

確保代碼已提交到 Git：
```bash
git add .
git commit -m "準備 Railway 部署"
git push
```

### 步驟 2：創建 Railway 項目

1. **訪問 Railway**
   - 前往 https://railway.app
   - 使用 GitHub 登錄

2. **新建項目**
   - 點擊 "New Project"
   - 選擇 "Deploy from GitHub repo"
   - 選擇你的倉庫

3. **添加服務**
   - Railway 會自動檢測到 `backend` 目錄
   - 如果沒有，點擊 "New" → "GitHub Repo"
   - 選擇倉庫，設置 Root Directory 為 `backend`

### 步驟 3：添加數據庫

1. **添加 PostgreSQL**
   - 在項目中點擊 "New" → "Database" → "PostgreSQL"
   - Railway 會自動創建數據庫

2. **連接數據庫**
   - Railway 會自動設置 `DATABASE_URL` 環境變量
   - 無需手動配置

### 步驟 4：設置環境變量

在 Railway 服務設置中，添加以下環境變量：

```
NODE_ENV=production
BACKEND_PORT=3001
JWT_SECRET=your-very-secure-secret-key-here-change-this
FRONTEND_URL=https://your-netlify-site.netlify.app
```

**生成 JWT_SECRET**：
```bash
# 在終端運行
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 步驟 5：運行數據庫遷移

1. **添加部署後命令**
   - 在 Railway 服務設置中
   - 找到 "Deploy" 標籤
   - 添加 "Post Deploy Command"：
   ```
   npm run db:migrate
   ```

   或者手動運行：
   ```bash
   # 在 Railway 的服務終端中
   cd backend
   npm run db:migrate
   ```

### 步驟 6：部署

1. Railway 會自動開始部署
2. 等待構建完成（2-5 分鐘）
3. 部署完成後，Railway 會提供一個 URL，例如：
   - `https://your-app.up.railway.app`

### 步驟 7：獲取 API URL

1. 在 Railway 服務設置中
2. 找到 "Settings" → "Networking"
3. 點擊 "Generate Domain"
4. 記下這個 URL，例如：`https://your-app.up.railway.app`
5. **API 基礎 URL** 是：`https://your-app.up.railway.app/api`

---

## 🌐 方法 2：Render 部署

### 步驟 1：準備代碼

確保代碼已提交到 Git。

### 步驟 2：創建 Render 服務

1. **訪問 Render**
   - 前往 https://render.com
   - 使用 GitHub 登錄

2. **新建 Web Service**
   - 點擊 "New" → "Web Service"
   - 選擇你的 Git 倉庫

3. **配置服務**
   - **Name**: `foodbox-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

### 步驟 3：添加數據庫

1. **新建 PostgreSQL**
   - 點擊 "New" → "PostgreSQL"
   - **Name**: `foodbox-db`
   - **Plan**: Free
   - 創建數據庫

2. **連接數據庫**
   - 在 Web Service 設置中
   - 找到 "Environment" 標籤
   - Render 會自動添加 `DATABASE_URL`

### 步驟 4：設置環境變量

在 Web Service 的 "Environment" 標籤中，添加：

```
NODE_ENV=production
BACKEND_PORT=10000
JWT_SECRET=your-very-secure-secret-key-here
FRONTEND_URL=https://your-netlify-site.netlify.app
```

**注意**：Render 免費層使用端口 10000。

### 步驟 5：運行數據庫遷移

1. **使用 Render Shell**
   - 在服務頁面點擊 "Shell"
   - 運行：
   ```bash
   cd backend
   npm run db:migrate
   ```

2. **或使用本地連接**
   - 從 Render 獲取數據庫連接字符串
   - 在本地設置 `DATABASE_URL`
   - 運行遷移

### 步驟 6：部署

1. Render 會自動開始部署
2. 等待構建完成
3. 部署完成後，Render 會提供一個 URL

---

## ✈️ 方法 3：Fly.io 部署

### 步驟 1：安裝 Fly CLI

```bash
# macOS/Linux
curl -L https://fly.io/install.sh | sh

# Windows (使用 PowerShell)
iwr https://fly.io/install.ps1 -useb | iex
```

### 步驟 2：登錄

```bash
fly auth login
```

### 步驟 3：初始化

```bash
cd backend
fly launch
```

按照提示：
- 選擇應用名稱
- 選擇區域（建議選擇 `hkg` 香港）
- 選擇 PostgreSQL（會自動創建）

### 步驟 4：設置環境變量

```bash
fly secrets set JWT_SECRET="your-very-secure-secret-key-here"
fly secrets set FRONTEND_URL="https://your-netlify-site.netlify.app"
fly secrets set NODE_ENV="production"
```

### 步驟 5：運行數據庫遷移

```bash
fly ssh console
# 在 SSH 會話中
cd /app
npm run db:migrate
```

### 步驟 6：部署

```bash
fly deploy
```

---

## 🔧 通用配置

### 環境變量清單

所有平台都需要設置：

```
NODE_ENV=production
BACKEND_PORT=3001  # 或平台指定的端口
JWT_SECRET=your-very-secure-secret-key
DATABASE_URL=postgresql://...  # 通常平台自動設置
FRONTEND_URL=https://your-netlify-site.netlify.app
```

### 數據庫遷移

部署後必須運行數據庫遷移：

```bash
# 方法 1：通過平台終端
npm run db:migrate

# 方法 2：本地連接（設置 DATABASE_URL）
NODE_ENV=production npm run db:migrate
```

### 健康檢查

部署後測試健康檢查端點：
```
GET https://your-backend-url.com/health
```

應該返回：
```json
{
  "status": "ok",
  "message": "捐飯盒平台API運行中",
  "timestamp": "..."
}
```

---

## 🧪 測試部署

### 1. 健康檢查

```bash
curl https://your-backend-url.com/health
```

### 2. API 測試

```bash
curl https://your-backend-url.com/api
```

### 3. 數據庫連接

檢查日誌，確認數據庫連接成功。

---

## 🔍 常見問題

### 問題 1：構建失敗

**可能原因**：
- TypeScript 編譯錯誤
- 依賴安裝失敗

**解決方法**：
1. 檢查構建日誌
2. 本地運行 `npm run build` 測試
3. 確保所有依賴都在 `package.json` 中

### 問題 2：數據庫連接失敗

**可能原因**：
- `DATABASE_URL` 未設置
- 數據庫未創建
- 連接字符串錯誤

**解決方法**：
1. 檢查環境變量
2. 確認數據庫已創建
3. 檢查連接字符串格式

### 問題 3：端口錯誤

**可能原因**：
- 平台使用不同的端口

**解決方法**：
- Railway: 使用 `PORT` 環境變量（自動設置）
- Render: 使用 `10000`
- Fly.io: 使用 `8080`

### 問題 4：遷移失敗

**可能原因**：
- 數據庫未連接
- 遷移文件錯誤

**解決方法**：
1. 確認數據庫連接
2. 檢查遷移文件
3. 查看錯誤日誌

---

## 📝 部署檢查清單

部署前：
- [ ] 代碼已提交到 Git
- [ ] `package.json` 中有 `build` 和 `start` 腳本
- [ ] 環境變量已準備好
- [ ] JWT_SECRET 已生成

部署後：
- [ ] 構建成功
- [ ] 服務運行正常
- [ ] 數據庫遷移成功
- [ ] 健康檢查通過
- [ ] API 端點可訪問
- [ ] CORS 配置正確

---

## 🎯 推薦流程

1. **選擇平台**：Railway（最簡單）或 Render
2. **部署後端**：按照上述步驟
3. **運行遷移**：確保數據庫結構正確
4. **測試 API**：確認所有端點正常
5. **更新前端**：在 Netlify 設置 `VITE_API_URL`
6. **測試完整流程**：端到端測試

---

## 🚀 快速開始（Railway）

```bash
# 1. 提交代碼
git add .
git commit -m "準備部署"
git push

# 2. 訪問 Railway
# https://railway.app

# 3. 新建項目 → 選擇 GitHub repo

# 4. 添加 PostgreSQL 數據庫

# 5. 設置環境變量：
# JWT_SECRET=...
# FRONTEND_URL=...

# 6. 運行遷移（在 Railway 終端）
npm run db:migrate

# 7. 獲取 API URL
# Settings → Networking → Generate Domain
```

---

**準備好部署了嗎？選擇一個平台開始吧！** 🎉
