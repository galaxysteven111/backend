# 🚀 Netlify 快速部署指南

## ⚡ 5 分鐘快速部署

### 前置條件
- ✅ 後端已部署（Railway/Render/Heroku 等）
- ✅ 後端 API URL 已準備好
- ✅ 代碼已提交到 Git（GitHub/GitLab/Bitbucket）

---

## 📝 步驟 1：準備配置文件（已完成）

✅ `netlify.toml` 已創建
✅ 重定向規則已配置
✅ 安全頭已設置

---

## 🌐 步驟 2：在 Netlify 網站部署

### 2.1 訪問 Netlify
1. 前往 https://app.netlify.com
2. 使用 GitHub/GitLab/Bitbucket 登錄

### 2.2 導入項目
1. 點擊 **"Add new site"** → **"Import an existing project"**
2. 選擇你的 Git 提供商（GitHub/GitLab/Bitbucket）
3. 選擇你的倉庫
4. 選擇分支（通常是 `main`）

### 2.3 配置構建設置

Netlify 會自動檢測 `netlify.toml`，但請確認：

**構建設置**：
- **Base directory**: （留空）
- **Build command**: `cd frontend && npm install && npm run build`
- **Publish directory**: `frontend/dist`

### 2.4 設置環境變量 ⚠️ 重要！

在部署前，點擊 **"Show advanced"** → **"New variable"**：

```
Key: VITE_API_URL
Value: https://your-backend-api.com/api
```

**重要**：
- 將 `https://your-backend-api.com/api` 替換為你的實際後端 API URL
- 確保 URL 正確（可以訪問 `/api/health` 測試）

### 2.5 部署

1. 點擊 **"Deploy site"**
2. 等待構建完成（2-5 分鐘）
3. ✅ 完成！你會得到一個 Netlify URL

---

## 🔧 步驟 3：配置後端 CORS

確保後端允許 Netlify 域名訪問：

```typescript
// backend/src/index.ts
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-site-name.netlify.app', // 替換為你的 Netlify URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
```

---

## ✅ 步驟 4：測試

訪問你的 Netlify URL，測試：
- [ ] 首頁正常加載
- [ ] 可以登錄/註冊
- [ ] API 請求正常（檢查瀏覽器控制台）
- [ ] 圖片正常顯示
- [ ] 地圖正常加載

---

## 🐛 常見問題

### ❌ 構建失敗
**解決**：檢查構建日誌，確保所有依賴都在 `package.json` 中

### ❌ API 請求失敗（CORS）
**解決**：檢查後端 CORS 配置，添加 Netlify 域名

### ❌ 路由 404
**解決**：確認 `netlify.toml` 中的重定向規則正確

---

## 📱 自定義域名（可選）

1. Netlify 控制台 → **"Domain settings"**
2. 點擊 **"Add custom domain"**
3. 輸入你的域名
4. 配置 DNS（CNAME 或 A 記錄）
5. SSL 證書自動配置

---

## 🔄 自動部署

每次推送到 `main` 分支會自動觸發部署！

---

**就是這麼簡單！開始部署吧！** 🎉
