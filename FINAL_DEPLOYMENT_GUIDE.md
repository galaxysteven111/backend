# 🚀 最終部署指南

## 📋 部署前準備

### 檢查清單

- [ ] 代碼已提交到 GitHub
- [ ] 環境變量已準備好
- [ ] JWT_SECRET 已生成
- [ ] 後端和前端部署配置已準備好

---

## 🌐 步驟 1：部署後端（Railway）

### 1.1 訪問 Railway

1. 前往 https://railway.app
2. 使用 GitHub 登錄

### 1.2 創建項目

1. 點擊 **"New Project"**
2. 選擇 **"Deploy from GitHub repo"**
3. 選擇你的倉庫
4. 如果沒有自動檢測，手動設置：
   - 點擊服務設置
   - 找到 "Root Directory"
   - 設置為 `backend`

### 1.3 添加數據庫

1. 在項目中點擊 **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway 會自動創建並連接數據庫
3. ✅ `DATABASE_URL` 會自動設置

### 1.4 設置環境變量

在服務設置中，點擊 **"Variables"** 標籤，添加：

```
NODE_ENV=production
JWT_SECRET=你的密鑰（見下方）
FRONTEND_URL=https://your-netlify-site.netlify.app
```

**生成 JWT_SECRET**：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

複製生成的字符串，設置為 `JWT_SECRET`。

**注意**：`FRONTEND_URL` 暫時可以設置為 `http://localhost:3000`，部署前端後再更新。

### 1.5 運行數據庫遷移

**方法 1：使用 Post Deploy Command（推薦）**

1. 在服務設置中
2. 找到 **"Deploy"** 標籤
3. 添加 **"Post Deploy Command"**：
   ```
   npm run migrate:prod
   ```

**方法 2：手動運行**

1. 在服務頁面點擊 **"View Logs"**
2. 點擊 **"Shell"** 標籤
3. 運行：
   ```bash
   npm run migrate:prod
   ```

### 1.6 獲取 API URL

1. 在服務設置中
2. 找到 **"Networking"** 標籤
3. 點擊 **"Generate Domain"**
4. 記下這個 URL，例如：`https://your-app.up.railway.app`
5. **API 基礎 URL** 是：`https://your-app.up.railway.app/api`

### 1.7 測試後端

在瀏覽器訪問：
```
https://your-app.up.railway.app/health
```

應該看到：
```json
{
  "status": "ok",
  "database": {
    "connected": true,
    "latency": "..."
  },
  "version": "1.0.0",
  "environment": "production"
}
```

---

## 🎨 步驟 2：部署前端（Netlify）

### 2.1 訪問 Netlify

1. 前往 https://app.netlify.com
2. 使用 GitHub 登錄

### 2.2 導入項目

1. 點擊 **"Add new site"** → **"Import an existing project"**
2. 選擇你的 Git 提供商（GitHub）
3. 選擇你的倉庫

### 2.3 配置構建設置

Netlify 會自動檢測 `netlify.toml`，但請確認：

- **Base directory**: （留空）
- **Build command**: `cd frontend && npm install && npm run build`
- **Publish directory**: `frontend/dist`

### 2.4 設置環境變量

在部署前，點擊 **"Show advanced"** → **"New variable"**：

```
Key: VITE_API_URL
Value: https://your-app.up.railway.app/api
```

**重要**：將 `https://your-app.up.railway.app/api` 替換為你的實際後端 API URL。

### 2.5 部署

1. 點擊 **"Deploy site"**
2. 等待構建完成（2-5 分鐘）
3. ✅ 完成！你會得到一個 Netlify URL

### 2.6 更新後端 CORS

部署前端後，更新後端的 `FRONTEND_URL`：

1. 在 Railway 服務設置中
2. 更新 `FRONTEND_URL` 環境變量：
   ```
   FRONTEND_URL=https://your-site-name.netlify.app
   ```
3. Railway 會自動重新部署

---

## ✅ 步驟 3：驗證部署

### 3.1 後端驗證

```bash
# 健康檢查
curl https://your-backend-url.com/health

# API 測試
curl https://your-backend-url.com/api
```

### 3.2 前端驗證

訪問你的 Netlify URL，測試：
- [ ] 首頁正常加載
- [ ] 路由正常工作
- [ ] API 請求正常（檢查瀏覽器控制台 Network 標籤）
- [ ] 圖片正常顯示
- [ ] 地圖正常加載

### 3.3 功能測試

- [ ] 用戶註冊
- [ ] 用戶登錄
- [ ] 發布飯盒
- [ ] 瀏覽飯盒列表
- [ ] 申請飯盒
- [ ] 查看通知
- [ ] 上傳圖片
- [ ] 使用地圖

---

## 🔧 常見問題

### 問題 1：後端構建失敗

**解決**：
1. 檢查 Railway 構建日誌
2. 確認 `package.json` 正確
3. 確認環境變量已設置

### 問題 2：數據庫遷移失敗

**解決**：
1. 確認 `DATABASE_URL` 已設置
2. 檢查數據庫連接
3. 手動運行遷移：`npm run migrate:prod`

### 問題 3：前端 API 請求失敗（CORS）

**解決**：
1. 確認後端 `FRONTEND_URL` 設置正確
2. 確認前端 `VITE_API_URL` 設置正確
3. 檢查後端 CORS 配置

### 問題 4：圖片無法加載

**解決**：
1. 確認後端 `/uploads` 路由正常
2. 確認圖片 URL 正確
3. 檢查 CORS 設置

---

## 📊 部署後監控

### Railway 監控

- 查看日誌：服務頁面 → "View Logs"
- 查看指標：服務頁面 → "Metrics"
- 查看部署：服務頁面 → "Deployments"

### Netlify 監控

- 查看構建日誌：站點 → "Deploys"
- 查看訪問統計：站點 → "Analytics"（需要啟用）
- 查看函數日誌：站點 → "Functions"

---

## 🎯 完成！

恭喜！你的應用已經部署到生產環境了！

**後端 URL**: `https://your-app.up.railway.app/api`  
**前端 URL**: `https://your-site-name.netlify.app`

---

## 📚 相關文檔

- `DEPLOYMENT_CHECKLIST.md` - 部署檢查清單
- `ENV_VARIABLES.md` - 環境變量文檔
- `backend/MIGRATIONS.md` - 數據庫遷移指南
- `QUICK_DEPLOY_BACKEND.md` - 後端快速部署
- `QUICK_DEPLOY_NETLIFY.md` - 前端快速部署

---

**祝你部署順利！** 🎉
