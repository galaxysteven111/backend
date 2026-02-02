# Netlify 部署指南

## 📋 部署前準備

### 1. 確保後端已部署

Netlify 主要用於前端部署。你需要先將後端部署到其他平台：

**推薦平台**：
- **Railway** (https://railway.app) - 簡單易用，免費額度
- **Render** (https://render.com) - 免費層可用
- **Heroku** - 需要信用卡
- **Fly.io** - 免費層可用
- **DigitalOcean App Platform** - 付費但穩定

**後端部署後，記下 API URL**，例如：
- `https://your-backend.railway.app/api`
- `https://your-backend.onrender.com/api`

---

## 🚀 Netlify 部署步驟

### 方法 1：通過 Netlify 網站部署（推薦）

#### 步驟 1：準備代碼

1. **確保代碼已提交到 Git**
   ```bash
   git add .
   git commit -m "準備 Netlify 部署"
   git push
   ```

2. **確認 `netlify.toml` 文件存在**
   - 文件應該在項目根目錄
   - 已經為你創建好了

#### 步驟 2：連接 Netlify

1. **訪問 Netlify**
   - 前往 https://app.netlify.com
   - 使用 GitHub/GitLab/Bitbucket 登錄

2. **添加新站點**
   - 點擊 "Add new site" → "Import an existing project"
   - 選擇你的 Git 倉庫
   - 選擇分支（通常是 `main` 或 `master`）

#### 步驟 3：配置構建設置

Netlify 會自動檢測 `netlify.toml`，但請確認：

- **Base directory**: （留空，因為構建命令已經包含 `cd frontend`）
- **Build command**: `cd frontend && npm install && npm run build`
- **Publish directory**: `frontend/dist`

**或者手動設置**：
- Build command: `cd frontend && npm install && npm run build`
- Publish directory: `frontend/dist`

#### 步驟 4：設置環境變量

在 Netlify 控制台：

1. 進入站點設置 → "Environment variables"
2. 添加以下環境變量：

```
VITE_API_URL = https://your-backend-api.com/api
```

**重要**：
- 將 `https://your-backend-api.com/api` 替換為你的實際後端 API URL
- 確保 URL 以 `/api` 結尾（如果後端路由是 `/api`）

#### 步驟 5：部署

1. 點擊 "Deploy site"
2. 等待構建完成（通常 2-5 分鐘）
3. 部署完成後，你會得到一個 Netlify URL，例如：
   - `https://your-site-name.netlify.app`

---

### 方法 2：通過 Netlify CLI 部署

#### 安裝 Netlify CLI

```bash
npm install -g netlify-cli
```

#### 登錄

```bash
netlify login
```

#### 初始化（首次部署）

```bash
# 在項目根目錄
netlify init
```

按照提示：
1. 選擇 "Create & configure a new site"
2. 輸入站點名稱（或使用默認）
3. 選擇團隊（如果有）
4. 構建命令：`cd frontend && npm install && npm run build`
5. 發布目錄：`frontend/dist`

#### 設置環境變量

```bash
netlify env:set VITE_API_URL "https://your-backend-api.com/api"
```

#### 部署

```bash
netlify deploy --prod
```

---

## 🔧 配置說明

### 環境變量

**必需**：
- `VITE_API_URL` - 後端 API 基礎 URL

**示例**：
```
VITE_API_URL=https://your-backend.railway.app/api
```

### 重定向規則

`netlify.toml` 中已配置：
- 所有路由重定向到 `index.html`（支持 React Router）
- 靜態資源緩存優化
- 安全頭設置

---

## 🧪 測試部署

### 1. 檢查構建日誌

在 Netlify 控制台的 "Deploys" 標籤：
- 查看構建是否成功
- 檢查是否有錯誤

### 2. 測試功能

訪問你的 Netlify URL，測試：
- [ ] 首頁正常加載
- [ ] 路由正常工作（點擊導航）
- [ ] API 請求正常（檢查 Network 標籤）
- [ ] 圖片正常顯示
- [ ] 地圖正常加載

### 3. 檢查環境變量

在瀏覽器控制台：
```javascript
console.log(import.meta.env.VITE_API_URL);
```

應該顯示你設置的後端 API URL。

---

## 🔍 常見問題排查

### 問題 1：構建失敗

**可能原因**：
- 依賴安裝失敗
- TypeScript 錯誤
- 構建命令錯誤

**解決方法**：
1. 檢查構建日誌
2. 本地運行 `cd frontend && npm run build` 測試
3. 確保所有依賴都在 `package.json` 中

### 問題 2：API 請求失敗（CORS 錯誤）

**可能原因**：
- 後端 CORS 配置不正確
- 環境變量未設置

**解決方法**：
1. 檢查後端 CORS 配置，確保允許 Netlify 域名
2. 檢查 `VITE_API_URL` 環境變量是否正確設置
3. 檢查後端是否正常運行

### 問題 3：路由 404 錯誤

**可能原因**：
- 重定向規則未生效

**解決方法**：
1. 確認 `netlify.toml` 中的重定向規則正確
2. 重新部署

### 問題 4：圖片無法加載

**可能原因**：
- 圖片路徑錯誤
- 後端靜態文件服務未配置

**解決方法**：
1. 檢查圖片 URL 是否正確
2. 確認後端 `/uploads` 路由正常
3. 檢查 CORS 設置

---

## 📝 後端 CORS 配置

確保後端允許 Netlify 域名訪問：

```typescript
// backend/src/index.ts
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'https://your-site-name.netlify.app',
  // 添加其他允許的域名
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
```

或者使用環境變量：

```typescript
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

---

## 🔄 持續部署

### 自動部署

Netlify 會自動監聽 Git 推送：
- 每次推送到 `main` 分支會自動觸發部署
- 可以在 Netlify 控制台設置分支和構建鉤子

### 部署預覽

- Pull Request 會自動創建部署預覽
- 可以在 PR 中測試更改

---

## 🎯 自定義域名

### 設置步驟

1. 在 Netlify 控制台 → "Domain settings"
2. 點擊 "Add custom domain"
3. 輸入你的域名
4. 按照提示配置 DNS：
   - 添加 CNAME 記錄指向 Netlify
   - 或添加 A 記錄指向 Netlify IP

### SSL 證書

- Netlify 自動提供免費 SSL 證書（Let's Encrypt）
- 部署後自動配置 HTTPS

---

## 📊 監控和分析

### Netlify Analytics

- 在 Netlify 控制台啟用 Analytics
- 查看訪問統計、性能指標

### 日誌

- 在 "Functions" 標籤查看函數日誌
- 在 "Deploys" 標籤查看構建日誌

---

## ✅ 部署檢查清單

部署前：
- [ ] 後端已部署並運行正常
- [ ] 後端 CORS 配置允許 Netlify 域名
- [ ] `netlify.toml` 文件存在
- [ ] 環境變量 `VITE_API_URL` 已設置
- [ ] 代碼已提交到 Git

部署後：
- [ ] 構建成功
- [ ] 網站可以訪問
- [ ] 路由正常工作
- [ ] API 請求正常
- [ ] 圖片正常顯示
- [ ] 地圖正常加載

---

## 🚀 快速部署命令

```bash
# 1. 確保代碼已提交
git add .
git commit -m "準備 Netlify 部署"
git push

# 2. 安裝 Netlify CLI（如果還沒安裝）
npm install -g netlify-cli

# 3. 登錄
netlify login

# 4. 初始化（首次）
netlify init

# 5. 設置環境變量
netlify env:set VITE_API_URL "https://your-backend-api.com/api"

# 6. 部署
netlify deploy --prod
```

---

## 📚 相關資源

- [Netlify 文檔](https://docs.netlify.com/)
- [Netlify 重定向規則](https://docs.netlify.com/routing/redirects/)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)

---

**準備好部署了嗎？按照上述步驟操作即可！** 🎉
