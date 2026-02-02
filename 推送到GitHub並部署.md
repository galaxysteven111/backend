# 🚀 推送到 GitHub 並部署到 Railway

## 📋 你的 GitHub 倉庫
https://github.com/galaxysteven111/backend

---

## 步驟 1：推送代碼到 GitHub

### 1.1 初始化 Git（如果還沒有）

在項目根目錄執行：

```bash
git init
git add .
git commit -m "初始提交：捐飯盒平台"
```

### 1.2 連接到 GitHub 倉庫

```bash
git remote add origin https://github.com/galaxysteven111/backend.git
git branch -M main
git push -u origin main
```

**如果遇到認證問題**：
- GitHub → Settings → Developer settings → Personal access tokens
- 創建 token（選擇 `repo` 權限）
- 使用 token 作為密碼

---

## 步驟 2：在 Railway 部署

### 2.1 訪問 Railway

1. **前往** https://railway.app
2. **使用 GitHub 登錄**（點擊 "Login with GitHub"）

### 2.2 創建新項目

1. **點擊** "New Project"
2. **選擇** "Deploy from GitHub repo"
3. **選擇** `galaxysteven111/backend` 倉庫
4. Railway 會自動開始部署

### 2.3 設置 Root Directory ⚠️ 重要！

1. **點擊**剛創建的服務
2. **進入** "Settings" 標籤
3. **找到** "Root Directory"
4. **設置為**：`backend`
5. **保存**（Railway 會自動重新部署）

**重要**：因為你的倉庫名稱是 `backend`，但項目結構是：
```
backend/
  ├── src/
  ├── package.json
  └── ...
```

所以 Root Directory 應該設置為 `.`（當前目錄）或者保持默認。

**如果倉庫結構是**：
```
backend/          ← 這是倉庫根目錄
  ├── src/
  ├── package.json
  └── ...
```

那麼 Root Directory 應該是：`.`（當前目錄，即倉庫根目錄）

**如果倉庫結構是**：
```
foodbox-platform/  ← 這是倉庫根目錄
  ├── backend/     ← 後端代碼在這裡
  ├── frontend/
  └── ...
```

那麼 Root Directory 應該是：`backend`

### 2.4 添加 PostgreSQL 數據庫

1. **在項目頁面**，點擊 "New"
2. **選擇** "Database" → "PostgreSQL"
3. Railway 會自動創建並連接
4. ✅ `DATABASE_URL` 會自動設置

### 2.5 生成 JWT_SECRET

在本地終端運行：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**複製生成的密鑰**（長字符串）

### 2.6 設置環境變量

在服務設置 → Variables 中添加：

```
NODE_ENV = production
JWT_SECRET = [步驟 2.5 生成的密鑰]
FRONTEND_URL = http://localhost:3000
```

### 2.7 運行數據庫遷移

**方法 1：使用 Post Deploy Command（推薦）**

1. 服務設置 → "Deploy" 標籤
2. 找到 "Post Deploy Command"
3. 輸入：`npm run migrate:prod`
4. 保存

**方法 2：使用 Shell**

1. 服務頁面 → "Deployments" → 最新部署 → "View Logs" → "Shell"
2. 運行：`npm run migrate:prod`

### 2.8 獲取 API URL

1. 服務設置 → "Networking" 標籤
2. 點擊 "Generate Domain"
3. 記下 URL，例如：`your-app.up.railway.app`
4. **API URL**：`https://your-app.up.railway.app/api`

---

## ✅ 完成！

部署完成後：
- **後端 API URL**: `https://your-app.up.railway.app/api`

---

## 🧪 測試

訪問：
```
https://your-app.up.railway.app/health
```

應該看到健康檢查響應。

---

## 🔄 下一步：部署前端

部署完後端後：
1. 記下 API URL
2. 在 Netlify 部署前端
3. 設置 `VITE_API_URL` 環境變量
4. 更新 Railway 的 `FRONTEND_URL`

---

**現在開始推送代碼到 GitHub！** 🚀
