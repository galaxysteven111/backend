# 後端部署說明

## 🚀 快速部署（Railway 推薦）

### 1. 訪問 Railway
https://railway.app

### 2. 新建項目
- 選擇 "Deploy from GitHub repo"
- 選擇你的倉庫
- 設置 Root Directory 為 `backend`

### 3. 添加 PostgreSQL
- 點擊 "New" → "Database" → "PostgreSQL"
- Railway 會自動設置 `DATABASE_URL`

### 4. 設置環境變量
```
NODE_ENV=production
JWT_SECRET=你的密鑰（運行下方命令生成）
FRONTEND_URL=https://your-netlify-site.netlify.app
```

生成 JWT_SECRET：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. 運行遷移
在 Railway 終端運行：
```bash
npm run db:migrate
```

### 6. 獲取 API URL
- Settings → Networking → Generate Domain
- API URL: `https://your-app.up.railway.app/api`

---

## 📝 環境變量

必需：
- `DATABASE_URL` - PostgreSQL 連接字符串（Railway 自動設置）
- `JWT_SECRET` - JWT 密鑰（必須設置）
- `FRONTEND_URL` - 前端 URL（用於 CORS）

可選：
- `PORT` - 端口（Railway 自動設置）
- `NODE_ENV` - 環境（建議設置為 `production`）

---

## 🔧 構建和啟動

Railway 會自動：
1. 運行 `npm install`
2. 運行 `npm run build`（通過 postinstall）
3. 運行 `npm start`

---

## 📚 詳細文檔

查看 `BACKEND_DEPLOYMENT.md` 獲取完整部署指南。
