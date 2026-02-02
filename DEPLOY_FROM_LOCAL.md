# 從本地代碼部署後端指南

## 🎯 兩種方式

### 方式 1：推送到 GitHub 後部署（推薦）⭐
- ✅ 最簡單
- ✅ 自動部署
- ✅ 版本控制

### 方式 2：直接部署本地代碼
- ✅ 無需 GitHub
- ⚠️ 需要 CLI 工具

---

## 🚀 方式 1：推送到 GitHub（推薦）

### 步驟 1：初始化 Git（如果還沒有）

```bash
# 在項目根目錄
git init
git add .
git commit -m "初始提交"
```

### 步驟 2：創建 GitHub 倉庫

1. **訪問 GitHub**
   - 前往 https://github.com
   - 登錄你的帳號

2. **創建新倉庫**
   - 點擊右上角 "+" → "New repository"
   - 輸入倉庫名稱，例如：`foodbox-platform`
   - 選擇 Public 或 Private
   - **不要**勾選 "Initialize this repository with a README"
   - 點擊 "Create repository"

3. **記下倉庫 URL**
   - 例如：`https://github.com/your-username/foodbox-platform.git`

### 步驟 3：推送到 GitHub

```bash
# 在項目根目錄運行
git remote add origin https://github.com/your-username/foodbox-platform.git
git branch -M main
git push -u origin main
```

**如果遇到認證問題**：
- 使用 Personal Access Token（推薦）
- 或使用 SSH key

### 步驟 4：在 Railway 部署

1. **訪問 Railway**
   - https://railway.app
   - 使用 GitHub 登錄

2. **新建項目**
   - 點擊 "New Project"
   - 選擇 "Deploy from GitHub repo"
   - 選擇剛創建的倉庫
   - 設置 Root Directory 為 `backend`

3. **繼續按照之前的步驟**（添加數據庫、設置環境變量等）

---

## 🔧 方式 2：使用 Railway CLI 直接部署

### 步驟 1：安裝 Railway CLI

```bash
# macOS/Linux
curl -fsSL https://railway.app/install.sh | sh

# Windows (PowerShell)
iwr https://railway.app/install.ps1 -useb | iex
```

### 步驟 2：登錄 Railway

```bash
railway login
```

這會打開瀏覽器，完成登錄。

### 步驟 3：初始化項目

```bash
cd backend
railway init
```

按照提示：
- 選擇 "Create a new project"
- 輸入項目名稱

### 步驟 4：添加 PostgreSQL 數據庫

```bash
railway add postgresql
```

### 步驟 5：設置環境變量

```bash
# 設置 JWT_SECRET（先生成一個）
railway variables set JWT_SECRET="your-generated-secret-here"

# 設置其他變量
railway variables set NODE_ENV=production
railway variables set FRONTEND_URL="https://your-netlify-site.netlify.app"
```

**生成 JWT_SECRET**：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 步驟 6：部署

```bash
railway up
```

這會：
1. 構建項目
2. 部署到 Railway
3. 提供一個 URL

### 步驟 7：運行數據庫遷移

```bash
railway run npm run db:migrate
```

### 步驟 8：獲取 URL

```bash
railway domain
```

或訪問 Railway 網站查看 URL。

---

## 🐳 方式 3：使用 Docker 部署

### 步驟 1：構建 Docker 鏡像

```bash
cd backend
docker build -t foodbox-backend .
```

### 步驟 2：運行容器（本地測試）

```bash
docker run -p 3001:3001 \
  -e DATABASE_URL="your-database-url" \
  -e JWT_SECRET="your-secret" \
  -e FRONTEND_URL="http://localhost:3000" \
  foodbox-backend
```

### 步驟 3：推送到 Docker Hub（可選）

```bash
# 登錄 Docker Hub
docker login

# 標記鏡像
docker tag foodbox-backend your-username/foodbox-backend

# 推送
docker push your-username/foodbox-backend
```

然後可以在任何支持 Docker 的平台部署。

---

## 📝 快速開始（推薦流程）

### 選項 A：推送到 GitHub（最簡單）

```bash
# 1. 初始化 Git（如果還沒有）
git init
git add .
git commit -m "準備部署"

# 2. 在 GitHub 創建倉庫（通過網站）

# 3. 連接並推送
git remote add origin https://github.com/your-username/foodbox-platform.git
git push -u origin main

# 4. 在 Railway 網站部署（選擇 GitHub repo）
```

### 選項 B：使用 Railway CLI

```bash
# 1. 安裝 Railway CLI
# macOS/Linux:
curl -fsSL https://railway.app/install.sh | sh

# Windows:
iwr https://railway.app/install.ps1 -useb | iex

# 2. 登錄
railway login

# 3. 初始化
cd backend
railway init

# 4. 添加數據庫
railway add postgresql

# 5. 設置環境變量
railway variables set JWT_SECRET="your-secret"
railway variables set NODE_ENV=production
railway variables set FRONTEND_URL="https://your-netlify-site.netlify.app"

# 6. 部署
railway up

# 7. 運行遷移
railway run npm run db:migrate

# 8. 獲取 URL
railway domain
```

---

## 🔍 檢查清單

### 推送到 GitHub 前：
- [ ] Git 已初始化
- [ ] `.gitignore` 已配置（避免提交敏感文件）
- [ ] 代碼已提交
- [ ] GitHub 倉庫已創建

### 部署前：
- [ ] 環境變量已準備好
- [ ] JWT_SECRET 已生成
- [ ] 數據庫已創建（Railway 自動）

### 部署後：
- [ ] 構建成功
- [ ] 數據庫遷移成功
- [ ] 健康檢查通過
- [ ] API 可訪問

---

## 💡 推薦

**如果你還沒有 GitHub 帳號**：
1. 創建 GitHub 帳號（免費）
2. 推送到 GitHub
3. 使用 Railway 網站部署（最簡單）

**如果你不想使用 GitHub**：
1. 使用 Railway CLI 直接部署
2. 或使用 Docker 部署

---

## 🆘 需要幫助？

如果遇到問題：
1. 檢查 Railway 日誌
2. 確認環境變量設置正確
3. 確認數據庫連接正常
4. 查看 `BACKEND_DEPLOYMENT.md` 獲取詳細指南

---

**選擇一個方式開始部署吧！** 🚀
