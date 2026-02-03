# ⚡ Railway 快速部署（5分鐘）

## ✅ 代碼已推送成功！

現在在 Railway 部署：

---

## 🚀 快速步驟

### 1. 訪問 Railway
https://railway.app → 使用 GitHub 登錄

### 2. 創建項目
"New Project" → "Deploy from GitHub repo" → 選擇 `galaxysteven111/backend`

### 3. 設置 Root Directory ⚠️
Settings → Root Directory → 設置為：`backend` → 保存

### 4. 添加數據庫
"New" → "Database" → "PostgreSQL"

### 5. 設置環境變量
Variables → 添加：
- `NODE_ENV` = `production`
- `JWT_SECRET` = `[生成密鑰]`
- `FRONTEND_URL` = `http://localhost:3000`

**生成 JWT_SECRET**：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. 設置遷移
Deploy → Post Deploy Command → `npm run migrate:prod`

### 7. 獲取 URL
Networking → Generate Domain → 記下 URL

---

## ✅ 完成！

API URL: `https://your-app.up.railway.app/api`

---

**詳細步驟見 `Railway部署步驟.md`** 📚
