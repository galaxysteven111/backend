# 🚀 快速部署指南

## ⚡ 最簡單的方式：運行批處理文件

### Windows 用戶

**雙擊運行**：
```
deploy-backend.bat
```

或者**在 Cursor 終端中運行**：
```cmd
.\deploy-backend.bat
```

---

## 📋 或者：手動執行命令

如果批處理文件有問題，請在 Cursor 終端中逐步執行：

### 1. 檢查 Railway CLI
```powershell
railway --version
```

### 2. 如果沒有，安裝
```powershell
iwr https://railway.app/install.ps1 -useb | iex
```

### 3. 登錄
```powershell
railway login
```

### 4. 進入後端目錄
```powershell
cd backend
```

### 5. 初始化項目
```powershell
railway init
```

### 6. 添加數據庫
```powershell
railway add postgresql
```

### 7. 生成密鑰
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 8. 設置環境變量（替換 YOUR_JWT_SECRET）
```powershell
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=YOUR_JWT_SECRET
railway variables set FRONTEND_URL=http://localhost:3000
```

### 9. 部署
```powershell
railway up
```

### 10. 運行遷移
```powershell
railway run npm run migrate:prod
```

### 11. 獲取 URL
```powershell
railway domain generate
railway domain
```

---

## 🎯 推薦方式

**直接運行批處理文件**：
```cmd
.\deploy-backend.bat
```

這會自動完成所有步驟！

---

**開始部署吧！** 🚀
