# 📋 發送給 Claude AI 的 Railway "Not Found" 錯誤修復 Prompt

## 🎯 直接複製以下內容發送給 Claude AI：

---

我有一個 Node.js + TypeScript + Express 後端項目部署在 Railway，構建成功但應用無法訪問。

### 錯誤情況

**訪問 URL**：`https://foodbox-backend-production-beaf.up.railway.app/health`

**錯誤**：Railway 顯示 "Not Found" 頁面

**構建狀態**：✅ Docker 構建成功，TypeScript 編譯成功

---

## 可能的原因

### 1. 環境變量缺失

應用啟動時驗證環境變量，如果缺失會 `process.exit(1)`：

**必需的環境變量**：
- `JWT_SECRET` - 必需（缺失會導致應用退出）
- `DATABASE_URL` - 生產環境必需（或 `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`）
- `PORT` - Railway 自動提供

### 2. 應用啟動失敗

可能原因：
- 環境變量驗證失敗
- 數據庫連接失敗
- 未捕獲的錯誤

### 3. 路由配置問題

- `/health` 端點可能沒有正確配置
- 根路由可能缺失

---

## 代碼上下文

### 環境變量驗證（backend/src/config/env.ts）

```typescript
if (!process.env.JWT_SECRET) {
  errors.push('JWT_SECRET - JWT 認證密鑰（必須設置且不能為空）');
}

if (!hasDbUrl && !hasDbParts && process.env.NODE_ENV === 'production') {
  errors.push('DATABASE_URL - 數據庫連接字符串（生產環境必需）');
}

if (errors.length > 0) {
  console.error('❌ 環境變量驗證失敗');
  process.exit(1);  // ← 這會導致應用無法啟動
}
```

### 健康檢查端點（backend/src/index.ts）

```typescript
app.get('/health', async (_req, res) => {
  // 檢查數據庫連接
  // 返回狀態信息
});
```

---

## 修復要求

### 1. 診斷問題

請檢查：
- Railway 部署日誌（Deploy Logs）
- 應用是否成功啟動
- 環境變量是否正確設置

### 2. 修復建議

**如果環境變量缺失**：
- 提供 Railway 環境變量設置指南
- 確保所有必需的環境變量都已設置

**如果應用啟動失敗**：
- 添加更好的錯誤處理
- 添加啟動日誌
- 確保錯誤不會導致靜默退出

**如果路由問題**：
- 確保 `/health` 端點正確配置
- 添加根路由 `/` 返回 API 信息

### 3. 改進建議

**添加啟動日誌**：
```typescript
console.log('環境變量檢查：');
console.log(`- PORT: ${env.PORT}`);
console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? '已設置' : '未設置'}`);
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? '已設置' : '未設置'}`);
```

**添加根路由**：
```typescript
app.get('/', (_req, res) => {
  res.json({
    message: '歡迎使用捐飯盒平台API',
    version: '1.0.0',
    endpoints: { health: '/health', api: '/api' }
  });
});
```

---

## Railway 配置檢查清單

請確認：
1. ✅ `JWT_SECRET` 環境變量已設置
2. ✅ `DATABASE_URL` 環境變量已設置（或數據庫連接變量）
3. ✅ PostgreSQL 數據庫已創建並連接到服務
4. ✅ 服務已公開（Public）
5. ✅ 檢查 "Deploy Logs" 查看啟動錯誤

---

## 預期結果

修復後應該能夠：
1. ✅ 應用成功啟動
2. ✅ `/health` 端點返回 200 狀態
3. ✅ `/` 端點返回 API 信息

---

請幫我診斷問題並提供修復方案。如果需要，我可以提供 Railway 部署日誌或環境變量配置截圖。

---

## 📝 使用說明

1. 複製上面的內容
2. 發送給 Claude AI
3. 如果需要，可以附加：
   - Railway 部署日誌截圖
   - 環境變量配置截圖
   - `backend/src/index.ts` 文件
   - `backend/src/config/env.ts` 文件
