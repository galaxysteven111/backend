# Claude AI 修復 Railway "Not Found" 錯誤 Prompt

請將以下內容發送給 Claude AI：

---

## 任務：診斷並修復 Railway 部署 "Not Found" 錯誤

我有一個 Node.js + TypeScript + Express 後端項目部署在 Railway，構建成功但應用無法訪問。

### 錯誤情況

**訪問 URL**：`https://foodbox-backend-production-beaf.up.railway.app/health`

**錯誤訊息**：
- Railway 顯示 "Not Found" 頁面
- "The train has not arrived at the station."
- Request ID: `G8b31vYTTB-Y-OGIAQeqjw`

### 構建狀態

✅ **構建成功**：
- Docker 構建完成（26.91秒）
- TypeScript 編譯成功
- 所有構建步驟都成功執行

❌ **部署問題**：
- 應用無法訪問
- 返回 "Not Found" 錯誤

---

## 可能的原因分析

### 1. 環境變量缺失

應用啟動時需要以下環境變量：
- `JWT_SECRET` - 必需（應用會在啟動時驗證，缺失會導致 `process.exit(1)`）
- `DATABASE_URL` - 生產環境必需（或 `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`）
- `PORT` - Railway 自動提供，但需要確保應用使用它
- `FRONTEND_URL` - 可選（默認 `http://localhost:3000`）

### 2. 應用啟動失敗

可能的原因：
- 環境變量驗證失敗導致應用退出
- 數據庫連接失敗
- 端口綁定問題
- 未捕獲的錯誤導致進程崩潰

### 3. 路由配置問題

- `/health` 端點可能沒有正確配置
- 根路由可能缺失

---

## 代碼上下文

### 環境變量驗證（backend/src/config/env.ts）

```typescript
export function validateEnv(): EnvConfig {
  const errors: string[] = [];

  // JWT_SECRET is always required
  if (!process.env.JWT_SECRET) {
    errors.push('JWT_SECRET - JWT 認證密鑰（必須設置且不能為空）');
  }

  // Database: either DATABASE_URL or individual DB_* vars
  const hasDbUrl = !!process.env.DATABASE_URL;
  const hasDbParts = !!(process.env.DB_HOST || process.env.DB_USER);
  if (!hasDbUrl && !hasDbParts && process.env.NODE_ENV === 'production') {
    errors.push('DATABASE_URL - 數據庫連接字符串（生產環境必需）');
  }

  if (errors.length > 0) {
    console.error('\n===================================');
    console.error('❌ 環境變量驗證失敗');
    console.error('===================================');
    // ... 顯示錯誤並退出
    process.exit(1);  // ← 這會導致應用無法啟動
  }
  // ...
}
```

### 服務器啟動（backend/src/index.ts）

```typescript
httpServer.listen(env.PORT, () => {
  console.log(`服務器運行在 http://localhost:${env.PORT}`);
  console.log(`環境: ${env.NODE_ENV}`);
  console.log(`Socket.io 已啟動`);
});
```

### 健康檢查端點（backend/src/index.ts）

```typescript
app.get('/health', async (_req, res) => {
  let dbStatus: { connected: boolean; latency?: string } = { connected: false };
  try {
    const start = Date.now();
    await db.raw('SELECT 1');
    dbStatus = { connected: true, latency: `${Date.now() - start}ms` };
  } catch {
    dbStatus = { connected: false };
  }

  const status = dbStatus.connected ? 'ok' : 'degraded';
  res.status(dbStatus.connected ? 200 : 503).json({
    status,
    timestamp: new Date().toISOString(),
    database: dbStatus,
    version: '1.0.0',
    environment: env.NODE_ENV,
  });
});
```

---

## 修復要求

### 1. 診斷問題

請檢查：
- Railway 部署日誌（Deploy Logs）
- 應用是否成功啟動
- 是否有錯誤訊息
- 環境變量是否正確設置

### 2. 修復建議

**如果環境變量缺失**：
- 提供 Railway 環境變量設置指南
- 確保所有必需的環境變量都已設置

**如果應用啟動失敗**：
- 檢查啟動日誌
- 添加更好的錯誤處理
- 確保應用在錯誤時不會靜默退出

**如果路由問題**：
- 確保 `/health` 端點正確配置
- 添加根路由 `/` 返回 API 信息

### 3. 改進建議

**添加更好的啟動錯誤處理**：
```typescript
// 在啟動前驗證環境變量，但不要立即退出
// 記錄警告而不是錯誤（對於可選變量）
```

**添加啟動日誌**：
```typescript
// 在應用啟動時記錄關鍵信息
console.log('環境變量檢查：');
console.log(`- PORT: ${env.PORT}`);
console.log(`- NODE_ENV: ${env.NODE_ENV}`);
console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? '已設置' : '未設置'}`);
console.log(`- DATABASE_URL: ${process.env.DATABASE_URL ? '已設置' : '未設置'}`);
```

**添加根路由**：
```typescript
app.get('/', (_req, res) => {
  res.json({
    message: '歡迎使用捐飯盒平台API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});
```

---

## Railway 配置檢查清單

請確認以下 Railway 設置：

1. **環境變量**：
   - [ ] `JWT_SECRET` 已設置
   - [ ] `DATABASE_URL` 已設置（或 `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`）
   - [ ] `NODE_ENV=production`（可選）
   - [ ] `FRONTEND_URL` 已設置（如果需要 CORS）

2. **數據庫服務**：
   - [ ] PostgreSQL 數據庫已創建
   - [ ] 數據庫已連接到後端服務
   - [ ] `DATABASE_URL` 環境變量已自動設置

3. **網絡設置**：
   - [ ] 服務已公開（Public）
   - [ ] 端口正確（Railway 自動設置 `PORT`）

4. **部署日誌**：
   - [ ] 檢查 "Deploy Logs" 標籤
   - [ ] 確認應用是否成功啟動
   - [ ] 查看是否有錯誤訊息

---

## 預期結果

修復後應該能夠：
1. ✅ 應用成功啟動
2. ✅ `/health` 端點返回 200 狀態
3. ✅ `/` 端點返回 API 信息
4. ✅ 所有路由正常工作

---

## 診斷步驟

1. **檢查 Railway 部署日誌**：
   - 登錄 Railway
   - 打開 `foodbox-backend` 服務
   - 查看 "Deploy Logs" 標籤
   - 查找錯誤訊息或啟動失敗的原因

2. **檢查環境變量**：
   - 在 Railway 項目設置中檢查環境變量
   - 確認所有必需的變量都已設置

3. **檢查數據庫連接**：
   - 確認 PostgreSQL 服務正在運行
   - 確認 `DATABASE_URL` 環境變量正確

4. **測試應用**：
   - 訪問 `/health` 端點
   - 訪問 `/` 端點
   - 檢查應用是否響應

---

請幫我診斷問題並提供修復方案。如果需要，我可以提供 Railway 部署日誌或環境變量配置截圖。
