# 📝 逐步部署指南（在 Cursor 終端執行）

## 🎯 請在 Cursor 終端中執行以下命令

### ⚠️ 重要：每個命令執行完後，告訴我結果，我會繼續下一步！

---

## 步驟 1：檢查 Railway CLI

**執行命令**：
```powershell
railway --version
```

**如果顯示版本號**：✅ 已安裝，繼續步驟 2

**如果顯示錯誤**：執行安裝命令：
```powershell
iwr https://railway.app/install.ps1 -useb | iex
```

---

## 步驟 2：登錄 Railway

**執行命令**：
```powershell
railway login
```

**這會打開瀏覽器**，完成登錄後告訴我。

---

## 步驟 3：進入後端目錄

**執行命令**：
```powershell
cd backend
```

---

## 步驟 4：初始化 Railway 項目

**執行命令**：
```powershell
railway init
```

**按照提示**：
- 選擇 "Create a new project"
- 輸入項目名稱（例如：`foodbox-backend`）

**完成後告訴我**。

---

## 步驟 5：添加 PostgreSQL 數據庫

**執行命令**：
```powershell
railway add postgresql
```

**完成後告訴我**。

---

## 步驟 6：生成 JWT_SECRET

**執行命令**：
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**複製生成的密鑰**，告訴我（我會幫你設置）。

---

## 步驟 7：設置環境變量

**執行命令**（替換 `YOUR_JWT_SECRET` 為步驟 6 生成的密鑰）：
```powershell
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=YOUR_JWT_SECRET
railway variables set FRONTEND_URL=http://localhost:3000
```

---

## 步驟 8：部署應用

**執行命令**：
```powershell
railway up
```

**等待部署完成**（約 2-5 分鐘），告訴我結果。

---

## 步驟 9：運行數據庫遷移

**執行命令**：
```powershell
railway run npm run migrate:prod
```

**完成後告訴我**。

---

## 步驟 10：獲取 API URL

**執行命令**：
```powershell
railway domain
```

**如果沒有域名**，生成一個：
```powershell
railway domain generate
railway domain
```

**告訴我顯示的 URL**。

---

## ✅ 完成！

部署完成後，你會得到：
- **後端 API URL**: `https://your-app.up.railway.app/api`

---

## 🎯 現在開始

**請執行步驟 1**，告訴我結果，我會指導你繼續！

---

## 💡 或者：使用自動化腳本

如果你想自動完成所有步驟，運行：

```powershell
cd "c:\Users\Galaxy\OneDrive\桌面\捐飯盒公司"
.\scripts\deploy-backend-windows.ps1
```

腳本會自動完成所有步驟！
