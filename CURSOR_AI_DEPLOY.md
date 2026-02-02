# 🤖 使用 Cursor AI 自動部署指南

## 🎯 方法：讓 Cursor AI 幫你執行部署命令

### 步驟 1：打開 Cursor 終端

1. 在 Cursor 中按 `Ctrl + `` (反引號)
2. 或點擊 `View → Terminal`

### 步驟 2：告訴 Cursor AI 部署後端

**複製以下提示給 Cursor AI**：

```
請幫我自動部署後端到 Railway：

1. 檢查 Railway CLI 是否安裝，如果沒有則安裝
2. 檢查是否已登錄 Railway，如果沒有則執行 railway login
3. 進入 backend 目錄
4. 如果還沒有初始化，執行 railway init 並添加 PostgreSQL
5. 生成 JWT_SECRET（使用 node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"）
6. 設置環境變量：
   - NODE_ENV=production
   - JWT_SECRET=(生成的密鑰)
   - FRONTEND_URL=http://localhost:3000（稍後更新）
7. 執行 railway up 部署
8. 部署完成後執行 railway run npm run migrate:prod 運行遷移
9. 獲取並顯示 API URL（railway domain）

請逐步執行這些命令，並告訴我每一步的結果。
```

### 步驟 3：告訴 Cursor AI 部署前端

**部署完後端後，複製以下提示**：

```
後端已部署，API URL 是：[你的 API URL]

現在請幫我部署前端到 Netlify：

1. 檢查 Netlify CLI 是否安裝，如果沒有則安裝（npm install -g netlify-cli）
2. 檢查是否已登錄 Netlify，如果沒有則執行 netlify login
3. 進入 frontend 目錄
4. 執行 npm install 和 npm run build
5. 如果還沒有初始化，執行 netlify init
6. 設置環境變量 VITE_API_URL=[後端 API URL]
7. 執行 netlify deploy --prod 部署
8. 顯示部署後的 URL

請逐步執行這些命令。
```

---

## 🚀 或者：直接運行自動化腳本

### Windows 用戶

```powershell
# 部署後端
.\scripts\deploy-backend-windows.ps1

# 部署前端（部署完後端後）
.\scripts\deploy-frontend-windows.ps1 https://your-backend.up.railway.app/api
```

### macOS/Linux 用戶

```bash
# 給腳本執行權限
chmod +x scripts/*.sh

# 部署後端
./scripts/deploy-backend.sh

# 部署前端（部署完後端後）
./scripts/deploy-frontend.sh https://your-backend.up.railway.app/api
```

---

## 💡 推薦方式

**最簡單的方式**：
1. 運行自動化腳本（我已經為你創建好了）
2. 腳本會自動完成所有步驟
3. 你只需要按照提示輸入少量信息

**或者**：
1. 告訴 Cursor AI 上面的提示
2. Cursor AI 會逐步執行命令
3. 你只需要確認每一步

---

## 📝 注意事項

- 首次使用需要登錄 Railway 和 Netlify（會打開瀏覽器）
- JWT_SECRET 會自動生成
- 前端 URL 可以先設置為 localhost，部署前端後再更新

---

**選擇一個方式開始吧！** 🎉
