# 🖥️ Cursor 終端部署命令（逐步執行）

## 📋 在 Cursor 終端中逐步執行以下命令

### 步驟 1：檢查 Railway CLI

```powershell
railway --version
```

**如果沒有安裝**，執行：
```powershell
iwr https://railway.app/install.ps1 -useb | iex
```

---

### 步驟 2：登錄 Railway

```powershell
railway login
```

這會打開瀏覽器，完成登錄。

---

### 步驟 3：進入後端目錄

```powershell
cd backend
```

---

### 步驟 4：初始化 Railway 項目

```powershell
railway init
```

按照提示：
- 選擇 "Create a new project"
- 輸入項目名稱（例如：foodbox-backend）

---

### 步驟 5：添加 PostgreSQL 數據庫

```powershell
railway add postgresql
```

---

### 步驟 6：生成 JWT_SECRET

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**複製生成的密鑰**，下一步會用到。

---

### 步驟 7：設置環境變量

```powershell
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=你的密鑰（替換為步驟6生成的）
railway variables set FRONTEND_URL=http://localhost:3000
```

**注意**：將 `你的密鑰` 替換為步驟 6 生成的實際密鑰。

---

### 步驟 8：部署應用

```powershell
railway up
```

等待部署完成（約 2-5 分鐘）。

---

### 步驟 9：運行數據庫遷移

```powershell
railway run npm run migrate:prod
```

---

### 步驟 10：獲取 API URL

```powershell
railway domain
```

如果沒有域名，生成一個：
```powershell
railway domain generate
railway domain
```

**記下這個 URL**，例如：`your-app.up.railway.app`

**API 基礎 URL** 是：`https://your-app.up.railway.app/api`

---

## ✅ 完成！

部署完成後，你會得到：
- **後端 API URL**: `https://your-app.up.railway.app/api`

---

## 🔄 下一步：部署前端

部署完後端後，告訴我 API URL，我會幫你部署前端！

---

## 💡 提示

- 每個命令執行後，等待完成再執行下一個
- 如果遇到錯誤，告訴我，我會幫你解決
- Railway 會自動設置 `DATABASE_URL`，無需手動設置

---

**現在開始執行步驟 1！** 🚀
