# 🚀 通過 GitHub 部署到 Railway（最簡單）

## ✅ 優點
- ✅ 不需要安裝 Railway CLI
- ✅ 通過網站操作，簡單直觀
- ✅ 自動部署（每次推送代碼自動部署）

---

## 📋 步驟

### 步驟 1：確保代碼已推送到 GitHub

#### 1.1 如果還沒有 Git 倉庫

**初始化 Git**：
```bash
git init
git add .
git commit -m "準備部署"
```

#### 1.2 創建 GitHub 倉庫

1. **訪問 GitHub**
   - 前往 https://github.com
   - 登錄你的帳號

2. **創建新倉庫**
   - 點擊右上角 "+" → "New repository"
   - Repository name: `foodbox-platform`（或你喜歡的名稱）
   - Description: `香港捐飯盒平台`
   - 選擇 Public 或 Private
   - **不要**勾選 "Initialize this repository with a README"
   - 點擊 "Create repository"

3. **記下倉庫 URL**
   - 例如：`https://github.com/your-username/foodbox-platform.git`

#### 1.3 推送到 GitHub

```bash
git remote add origin https://github.com/your-username/foodbox-platform.git
git branch -M main
git push -u origin main
```

**如果遇到認證問題**：
- 使用 Personal Access Token（GitHub → Settings → Developer settings → Personal access tokens）

---

### 步驟 2：在 Railway 部署

#### 2.1 訪問 Railway

1. **前往 Railway**
   - https://railway.app
   - 使用 GitHub 登錄（點擊 "Login with GitHub"）

#### 2.2 創建新項目

1. **點擊 "New Project"**
2. **選擇 "Deploy from GitHub repo"**
3. **選擇你的倉庫**（foodbox-platform）
4. Railway 會自動開始部署

#### 2.3 配置服務

**重要**：需要設置 Root Directory

1. **點擊剛創建的服務**
2. **進入 "Settings"**
3. **找到 "Root Directory"**
4. **設置為**：`backend`
5. **保存**

#### 2.4 添加 PostgreSQL 數據庫

1. **在項目中點擊 "New"**
2. **選擇 "Database"**
3. **選擇 "PostgreSQL"**
4. Railway 會自動創建並連接數據庫
5. ✅ `DATABASE_URL` 會自動設置

#### 2.5 設置環境變量

1. **在服務設置中，點擊 "Variables" 標籤**
2. **添加以下環境變量**：

```
NODE_ENV = production
JWT_SECRET = 你的密鑰（見下方）
FRONTEND_URL = http://localhost:3000
```

**生成 JWT_SECRET**：
在本地終端運行：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

複製生成的字符串，設置為 `JWT_SECRET`。

#### 2.6 運行數據庫遷移

**方法 1：使用 Post Deploy Command（推薦）**

1. **在服務設置中**
2. **找到 "Deploy" 標籤**
3. **添加 "Post Deploy Command"**：
   ```
   npm run migrate:prod
   ```
4. **保存**

Railway 會在每次部署後自動運行遷移。

**方法 2：使用 Railway 終端**

1. **在服務頁面點擊 "View Logs"**
2. **點擊 "Shell" 標籤**
3. **運行**：
   ```bash
   npm run migrate:prod
   ```

#### 2.7 獲取 API URL

1. **在服務設置中**
2. **找到 "Networking" 標籤**
3. **點擊 "Generate Domain"**
4. **記下這個 URL**，例如：`your-app.up.railway.app`
5. **API 基礎 URL** 是：`https://your-app.up.railway.app/api`

---

### 步驟 3：測試部署

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

## ✅ 完成！

部署完成後，你會得到：
- **後端 API URL**: `https://your-app.up.railway.app/api`

---

## 🔄 自動部署

**好處**：每次你推送代碼到 GitHub，Railway 會自動重新部署！

**測試自動部署**：
1. 修改代碼
2. 提交並推送：
   ```bash
   git add .
   git commit -m "測試自動部署"
   git push
   ```
3. Railway 會自動開始新的部署

---

## 🎯 下一步：部署前端

部署完後端後：

1. **記下後端 API URL**：`https://your-app.up.railway.app/api`

2. **在 Netlify 部署前端**：
   - 訪問 https://app.netlify.com
   - 使用 GitHub 登錄
   - 選擇 "Deploy from GitHub repo"
   - 選擇你的倉庫
   - 設置 Build command: `cd frontend && npm install && npm run build`
   - 設置 Publish directory: `frontend/dist`
   - 設置環境變量：`VITE_API_URL = https://your-app.up.railway.app/api`

3. **更新後端 CORS**：
   - 在 Railway 服務設置中
   - 更新 `FRONTEND_URL` 為你的 Netlify URL

---

## 🆘 常見問題

### 問題 1：找不到 backend 目錄

**解決**：確保設置了 Root Directory 為 `backend`

### 問題 2：構建失敗

**解決**：
- 檢查構建日誌
- 確認 `package.json` 中有 `build` 和 `start` 腳本
- 確認環境變量已設置

### 問題 3：數據庫連接失敗

**解決**：
- 確認 PostgreSQL 服務已創建
- 確認 `DATABASE_URL` 已自動設置（Railway 會自動設置）

### 問題 4：遷移失敗

**解決**：
- 在 Railway Shell 中手動運行：`npm run migrate:prod`
- 檢查遷移文件是否存在

---

## 📝 檢查清單

部署前：
- [ ] 代碼已推送到 GitHub
- [ ] Railway 帳號已創建（使用 GitHub 登錄）
- [ ] 項目已創建並連接 GitHub 倉庫
- [ ] Root Directory 設置為 `backend`
- [ ] PostgreSQL 數據庫已添加
- [ ] 環境變量已設置（JWT_SECRET, NODE_ENV, FRONTEND_URL）
- [ ] Post Deploy Command 已設置（`npm run migrate:prod`）

部署後：
- [ ] 構建成功
- [ ] 健康檢查通過：`/health`
- [ ] API 可訪問：`/api`
- [ ] 數據庫遷移成功

---

**這就是最簡單的方式！不需要 CLI，全部通過網站操作！** 🎉
