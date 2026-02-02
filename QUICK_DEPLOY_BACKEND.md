# 🚀 後端快速部署指南（Railway）

## ⚡ 5 分鐘快速部署

### 前置條件
- ✅ GitHub 帳號
- ✅ 代碼已提交到 GitHub

---

## 📝 步驟 1：準備代碼

```bash
# 確保代碼已提交
git add .
git commit -m "準備部署"
git push
```

---

## 🌐 步驟 2：Railway 部署

### 2.1 訪問 Railway
1. 前往 https://railway.app
2. 點擊 "Login" → 使用 GitHub 登錄

### 2.2 創建項目
1. 點擊 **"New Project"**
2. 選擇 **"Deploy from GitHub repo"**
3. 選擇你的倉庫
4. 如果沒有自動檢測，點擊 **"New"** → **"GitHub Repo"**
5. 設置 **Root Directory** 為 `backend`

### 2.3 添加數據庫
1. 在項目中點擊 **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway 會自動創建並連接數據庫
3. ✅ `DATABASE_URL` 會自動設置

### 2.4 設置環境變量

在服務設置中，點擊 **"Variables"** 標籤，添加：

```
NODE_ENV=production
JWT_SECRET=你的密鑰（見下方）
FRONTEND_URL=https://your-netlify-site.netlify.app
```

**生成 JWT_SECRET**：
```bash
# 在終端運行
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

複製生成的字符串，設置為 `JWT_SECRET`。

### 2.5 運行數據庫遷移

1. 在服務頁面，點擊 **"Deployments"** 標籤
2. 點擊最新的部署
3. 點擊 **"View Logs"**
4. 在終端中運行：
   ```bash
   npm run db:migrate
   ```

或者：
1. 在服務設置中
2. 找到 **"Deploy"** 標籤
3. 添加 **"Post Deploy Command"**：
   ```
   npm run db:migrate
   ```

### 2.6 獲取 API URL

1. 在服務設置中
2. 找到 **"Networking"** 標籤
3. 點擊 **"Generate Domain"**
4. 記下這個 URL，例如：`https://your-app.up.railway.app`
5. **API 基礎 URL** 是：`https://your-app.up.railway.app/api`

---

## ✅ 步驟 3：測試

### 3.1 健康檢查

在瀏覽器訪問：
```
https://your-app.up.railway.app/health
```

應該看到：
```json
{
  "status": "ok",
  "message": "捐飯盒平台API運行中",
  "timestamp": "..."
}
```

### 3.2 API 測試

訪問：
```
https://your-app.up.railway.app/api
```

應該看到：
```json
{
  "message": "歡迎使用捐飯盒平台API",
  "version": "1.0.0"
}
```

---

## 🔧 步驟 4：更新前端配置

在 Netlify 控制台：

1. 進入你的前端站點設置
2. 找到 **"Environment variables"**
3. 設置：
   ```
   VITE_API_URL = https://your-app.up.railway.app/api
   ```
4. 重新部署前端

---

## 🎯 完成！

現在你的後端已經部署完成！

**API URL**: `https://your-app.up.railway.app/api`

---

## 🐛 常見問題

### ❌ 構建失敗
**解決**：檢查 Railway 構建日誌，確保 `package.json` 正確

### ❌ 數據庫連接失敗
**解決**：確認 PostgreSQL 服務已創建，`DATABASE_URL` 已自動設置

### ❌ 遷移失敗
**解決**：在 Railway 終端手動運行 `npm run db:migrate`

---

## 📚 其他平台

- **Render**: 查看 `BACKEND_DEPLOYMENT.md`
- **Fly.io**: 查看 `BACKEND_DEPLOYMENT.md`

---

**就是這麼簡單！開始部署吧！** 🎉
