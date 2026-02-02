# 🔧 Railway CLI 安裝問題解決方案

## ❌ 問題
Railway CLI 安裝失敗：404 錯誤

## ✅ 解決方案

### 方法 1：使用 Railway 網站部署（推薦，無需 CLI）⭐

**這是最簡單的方式，不需要安裝 CLI！**

#### 步驟：

1. **訪問 Railway 網站**
   - 前往 https://railway.app
   - 使用 GitHub 登錄

2. **新建項目**
   - 點擊 "New Project"
   - 選擇 "Deploy from GitHub repo"
   - 選擇你的倉庫

3. **設置 Root Directory**
   - 在服務設置中
   - 找到 "Root Directory"
   - 設置為 `backend`

4. **添加數據庫**
   - 點擊 "New" → "Database" → "PostgreSQL"

5. **設置環境變量**
   - 在服務設置中，點擊 "Variables"
   - 添加：
     ```
     NODE_ENV=production
     JWT_SECRET=你的密鑰（見下方）
     FRONTEND_URL=http://localhost:3000
     ```

6. **生成 JWT_SECRET**
   在本地終端運行：
   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

7. **運行數據庫遷移**
   - 在 Railway 服務頁面
   - 點擊 "Deployments" → 最新的部署 → "View Logs"
   - 點擊 "Shell" 標籤
   - 運行：`npm run migrate:prod`

8. **獲取 API URL**
   - Settings → Networking → Generate Domain
   - 記下 URL

---

### 方法 2：手動安裝 Railway CLI

#### 選項 A：使用 npm 安裝（推薦）

```powershell
npm install -g @railway/cli
```

#### 選項 B：下載二進制文件

1. 訪問 https://github.com/railwayapp/cli/releases
2. 下載 Windows 版本（railway-windows-amd64.exe）
3. 重命名為 `railway.exe`
4. 放到系統 PATH 中，或放在項目目錄

#### 選項 C：使用 Chocolatey（如果已安裝）

```powershell
choco install railway
```

---

### 方法 3：使用 Railway 官方安裝腳本（新 URL）

嘗試這個新的安裝命令：

```powershell
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://railway.app/install.sh'))"
```

或者：

```powershell
curl -fsSL https://railway.app/install.sh | sh
```

---

## 🎯 推薦：使用網站部署（方法 1）

**這是最簡單的方式，不需要 CLI！**

按照上面的步驟，在 Railway 網站上完成部署。

---

## 📝 更新後的部署指南

我已經為你創建了使用網站部署的指南，查看：
- `QUICK_DEPLOY_BACKEND.md` - 快速部署指南（網站方式）

---

**建議使用方法 1（網站部署），這樣就不需要安裝 CLI 了！** 🚀
