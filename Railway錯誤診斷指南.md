# 🔍 Railway "Not Found" 錯誤診斷指南

## 📋 快速檢查清單

### 步驟 1：檢查 Railway 部署日誌

1. 登錄 Railway：https://railway.app
2. 打開 `foodbox-backend` 服務
3. 點擊 **"Deploy Logs"** 標籤（不是 Build Logs）
4. 查看應用啟動時的日誌

**查找以下內容**：
- ✅ `服務器運行在 http://localhost:XXXX`
- ✅ `Socket.io 已啟動`
- ❌ `❌ 環境變量驗證失敗`
- ❌ `Error: ...`
- ❌ `process.exit(1)`

---

### 步驟 2：檢查環境變量

1. 在 Railway 項目中，點擊 **"Variables"** 標籤
2. 確認以下環境變量已設置：

**必需的環境變量**：
- [ ] `JWT_SECRET` - 必須設置（任意字符串，用於 JWT 簽名）
- [ ] `DATABASE_URL` - 必須設置（Railway 會自動提供，如果已連接數據庫）

**可選的環境變量**：
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL` - 前端 URL（用於 CORS）

---

### 步驟 3：檢查數據庫連接

1. 確認 PostgreSQL 服務已創建
2. 確認數據庫服務已連接到 `foodbox-backend` 服務
3. Railway 會自動設置 `DATABASE_URL` 環境變量

---

### 步驟 4：檢查網絡設置

1. 在服務設置中，確認服務已設置為 **"Public"**
2. Railway 會自動分配一個公共 URL

---

## 🔧 常見問題和解決方案

### 問題 1：環境變量缺失

**症狀**：
- 部署日誌顯示：`❌ 環境變量驗證失敗`
- 應用沒有啟動

**解決方案**：
1. 在 Railway 中添加 `JWT_SECRET` 環境變量：
   - 值可以是任意字符串，例如：`your-secret-key-here-12345`
2. 確認 `DATABASE_URL` 已自動設置（如果數據庫已連接）

---

### 問題 2：數據庫連接失敗

**症狀**：
- 應用啟動但無法連接數據庫
- `/health` 端點返回 `"status": "degraded"`

**解決方案**：
1. 確認 PostgreSQL 服務正在運行
2. 確認數據庫服務已連接到後端服務
3. 檢查 `DATABASE_URL` 環境變量是否正確

---

### 問題 3：應用啟動但無法訪問

**症狀**：
- 部署日誌顯示應用已啟動
- 但訪問 URL 返回 "Not Found"

**解決方案**：
1. 確認服務已設置為 **"Public"**
2. 檢查端口配置（Railway 自動設置 `PORT`）
3. 確認路由配置正確

---

## 📝 設置環境變量的步驟

### 在 Railway 中設置環境變量：

1. 登錄 Railway
2. 選擇 `foodbox-backend` 服務
3. 點擊 **"Variables"** 標籤
4. 點擊 **"New Variable"**
5. 添加以下變量：

**JWT_SECRET**：
- Key: `JWT_SECRET`
- Value: `your-secret-key-here-change-this-in-production`（使用強隨機字符串）

**NODE_ENV**（可選）：
- Key: `NODE_ENV`
- Value: `production`

**FRONTEND_URL**（如果需要）：
- Key: `FRONTEND_URL`
- Value: `https://your-frontend-url.com`

6. 點擊 **"Add"**
7. Railway 會自動重新部署

---

## 🚀 測試應用

### 1. 檢查健康端點

訪問：
```
https://foodbox-backend-production-beaf.up.railway.app/health
```

**預期響應**：
```json
{
  "status": "ok",
  "timestamp": "2026-02-03T...",
  "database": {
    "connected": true,
    "latency": "5ms"
  },
  "version": "1.0.0",
  "environment": "production"
}
```

### 2. 檢查根端點

訪問：
```
https://foodbox-backend-production-beaf.up.railway.app/
```

**預期響應**：
```json
{
  "message": "歡迎使用捐飯盒平台API",
  "version": "1.0.0"
}
```

---

## 📞 需要幫助？

如果問題仍然存在，請：
1. 截圖 Railway 部署日誌
2. 截圖環境變量配置
3. 發送給 Claude AI 進行進一步診斷
