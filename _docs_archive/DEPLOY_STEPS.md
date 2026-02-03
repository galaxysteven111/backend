# 📝 部署步驟（複製執行）

## 在 Cursor 終端中逐步執行

### 1️⃣ 檢查 Railway CLI
```powershell
railway --version
```

### 2️⃣ 如果沒有，安裝
```powershell
iwr https://railway.app/install.ps1 -useb | iex
```

### 3️⃣ 登錄
```powershell
railway login
```

### 4️⃣ 進入後端目錄
```powershell
cd backend
```

### 5️⃣ 初始化項目
```powershell
railway init
```

### 6️⃣ 添加數據庫
```powershell
railway add postgresql
```

### 7️⃣ 生成密鑰
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 8️⃣ 設置環境變量（替換 YOUR_JWT_SECRET）
```powershell
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=YOUR_JWT_SECRET
railway variables set FRONTEND_URL=http://localhost:3000
```

### 9️⃣ 部署
```powershell
railway up
```

### 🔟 運行遷移
```powershell
railway run npm run migrate:prod
```

### 1️⃣1️⃣ 獲取 URL
```powershell
railway domain generate
railway domain
```

---

**完成！記下 API URL** 🎉
