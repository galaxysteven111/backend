# 🚀 立即部署指南

## ⚡ 最簡單的方式：複製命令到 Cursor 終端

### 方法 1：使用 PowerShell 腳本（推薦）

在 Cursor 終端中運行：

```powershell
cd "c:\Users\Galaxy\OneDrive\桌面\捐飯盒公司"
.\scripts\deploy-backend-windows.ps1
```

### 方法 2：手動執行命令（如果腳本有問題）

打開 Cursor 終端（`Ctrl + ``），然後**逐步執行**以下命令：

#### 1. 檢查 Railway CLI
```powershell
railway --version
```

如果沒有，安裝：
```powershell
iwr https://railway.app/install.ps1 -useb | iex
```

#### 2. 登錄 Railway
```powershell
railway login
```

#### 3. 進入後端目錄
```powershell
cd backend
```

#### 4. 初始化項目
```powershell
railway init
```
選擇 "Create a new project"，輸入名稱。

#### 5. 添加數據庫
```powershell
railway add postgresql
```

#### 6. 生成 JWT_SECRET
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
**複製生成的密鑰**！

#### 7. 設置環境變量
```powershell
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=剛才生成的密鑰
railway variables set FRONTEND_URL=http://localhost:3000
```

#### 8. 部署
```powershell
railway up
```

#### 9. 運行遷移
```powershell
railway run npm run migrate:prod
```

#### 10. 獲取 URL
```powershell
railway domain
```

如果沒有，生成：
```powershell
railway domain generate
railway domain
```

---

## 📝 完整命令列表（一次性複製）

**注意**：需要替換 `YOUR_JWT_SECRET` 為實際生成的密鑰

```powershell
# 檢查 Railway CLI
railway --version

# 如果沒有，安裝
iwr https://railway.app/install.ps1 -useb | iex

# 登錄
railway login

# 進入後端目錄
cd backend

# 初始化
railway init

# 添加數據庫
railway add postgresql

# 生成 JWT_SECRET（複製這個值）
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 設置環境變量（替換 YOUR_JWT_SECRET）
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=YOUR_JWT_SECRET
railway variables set FRONTEND_URL=http://localhost:3000

# 部署
railway up

# 運行遷移
railway run npm run migrate:prod

# 獲取 URL
railway domain generate
railway domain
```

---

## 🆘 遇到問題？

1. **Railway CLI 安裝失敗**
   - 手動下載：https://railway.app/cli
   - 或使用網站部署（https://railway.app）

2. **登錄失敗**
   - 確保網絡連接正常
   - 檢查瀏覽器是否打開

3. **部署失敗**
   - 檢查 Railway 日誌：`railway logs`
   - 確認環境變量設置正確

---

**現在開始執行！告訴我每一步的結果，我會幫你解決問題。** 🚀
