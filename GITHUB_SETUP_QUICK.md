# ⚡ GitHub 設置快速指南

## 🎯 目標：將代碼推送到 GitHub，然後在 Railway 網站部署

---

## 📋 快速步驟

### 1. 初始化 Git（如果還沒有）

在項目根目錄執行：

```bash
git init
git add .
git commit -m "準備部署"
```

### 2. 創建 GitHub 倉庫

1. **訪問** https://github.com
2. **登錄**你的帳號
3. **點擊** "+" → "New repository"
4. **輸入**倉庫名稱：`foodbox-platform`
5. **不要**勾選 "Initialize with README"
6. **點擊** "Create repository"
7. **記下**倉庫 URL

### 3. 推送到 GitHub

```bash
git remote add origin https://github.com/your-username/foodbox-platform.git
git branch -M main
git push -u origin main
```

**如果遇到認證問題**：
- GitHub → Settings → Developer settings → Personal access tokens
- 創建 token（選擇 `repo` 權限）
- 使用 token 作為密碼

### 4. 在 Railway 部署

1. **訪問** https://railway.app
2. **使用 GitHub 登錄**
3. **點擊** "New Project" → "Deploy from GitHub repo"
4. **選擇**你的倉庫
5. **設置** Root Directory 為 `backend`
6. **添加** PostgreSQL 數據庫
7. **設置**環境變量（見下方）
8. **設置** Post Deploy Command：`npm run migrate:prod`
9. **生成**域名並獲取 API URL

---

## 🔐 環境變量設置

在 Railway 服務設置 → Variables 中添加：

```
NODE_ENV = production
JWT_SECRET = [生成密鑰，見下方]
FRONTEND_URL = http://localhost:3000
```

**生成 JWT_SECRET**：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## ✅ 完成！

部署完成後，你會得到 API URL：`https://your-app.up.railway.app/api`

---

**詳細步驟請查看 `GITHUB_RAILWAY_DEPLOY.md`** 📚
