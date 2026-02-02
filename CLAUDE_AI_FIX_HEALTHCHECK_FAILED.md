# Claude AI 修復 Railway 健康檢查失敗 Prompt

請將以下內容發送給 Claude AI：

---

## 任務：修復 Railway 健康檢查失敗

我有一個 Node.js + TypeScript + Express 後端項目部署在 Railway，構建成功但健康檢查失敗。

### 當前狀態

✅ **構建成功**：23.61秒
❌ **健康檢查失敗**：`/health` 端點返回 "service unavailable"

**健康檢查日誌**：
```
Attempt #1 failed with service unavailable. Continuing to retry for 4m59s
Attempt #2 failed with service unavailable. Continuing to retry for 4m48s
Attempt #3 failed with service unavailable. Continuing to retry for 4m36s
Attempt #4 failed with service unavailable. Continuing to retry for 4m32s
```

### 問題分析

健康檢查失敗意味著：
- 應用可能沒有成功啟動
- 或者應用啟動了但無法響應請求

---

## 可能的原因

### 1. 環境變量缺失（最可能）

應用啟動時驗證環境變量，如果缺失會 `process.exit(1)`：

**必需的環境變量**：
- `JWT_SECRET` - 必需（缺失會導致應用退出）
- `DATABASE_URL` - 生產環境必需

### 2. 應用啟動失敗

可能原因：
- 環境變量驗證失敗
- 數據庫連接失敗
- 未捕獲的錯誤導致進程崩潰

### 3. 端口或網絡問題

- 應用沒有正確綁定到端口
- Railway 健康檢查無法連接到應用

---

## 代碼上下文

### 環境變量驗證（backend/src/config/env.ts）

```typescript
export function validateEnv(): EnvConfig {
  console.log('🔍 環境變量檢查');
  console.log(`  JWT_SECRET:   ${process.env.JWT_SECRET ? '✅ 已設置' : '❌ 未設置'}`);
  console.log(`  DATABASE_URL: ${process.env.DATABASE_URL ? '✅ 已設置' : '❌ 未設置'}`);

  const errors: string[] = [];

  if (!process.env.JWT_SECRET) {
    errors.push('JWT_SECRET - JWT 認證密鑰（必須設置且不能為空）');
  }

  if (!hasDbUrl && !hasDbParts && process.env.NODE_ENV === 'production') {
    errors.push('DATABASE_URL - 數據庫連接字符串（生產環境必需）');
  }

  if (errors.length > 0) {
    console.error('❌ 環境變量驗證失敗！缺少:\n');
    errors.forEach((e) => console.error(`  • ${e}`));
    process.exit(1);  // ← 這會導致應用無法啟動
  }

  console.log('✅ 環境變量驗證通過\n');
  // ...
}
```

### 服務器啟動（backend/src/index.ts）

```typescript
httpServer.listen(env.PORT, '0.0.0.0', () => {
  console.log('🚀 服務器已啟動');
  console.log(`   地址: http://0.0.0.0:${env.PORT}`);
  console.log(`   環境: ${env.NODE_ENV}`);
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
- Railway 部署日誌（Deploy Logs）中的錯誤訊息
- 應用是否成功啟動
- 環境變量是否正確設置

### 2. 改進建議

**如果環境變量缺失**：
- 提供 Railway 環境變量設置指南
- 確保錯誤訊息清晰

**如果應用啟動失敗**：
- 添加更好的錯誤處理
- 確保錯誤不會導致靜默退出
- 添加啟動超時處理

**如果健康檢查配置問題**：
- 檢查 Railway 健康檢查配置
- 確保 `/health` 端點正確響應
- 考慮添加啟動延遲（如果應用需要時間初始化）

### 3. 改進健康檢查

**選項 A**：讓健康檢查更寬鬆
```typescript
// 即使數據庫未連接也返回 200
app.get('/health', async (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    // ...
  });
});
```

**選項 B**：添加簡單的啟動檢查端點
```typescript
// 簡單的啟動檢查（不檢查數據庫）
app.get('/health/startup', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});
```

**選項 C**：改進錯誤處理
```typescript
// 確保健康檢查端點永遠不會失敗
app.get('/health', async (_req, res) => {
  try {
    // 檢查邏輯
    res.status(200).json({ status: 'ok', ... });
  } catch (error) {
    // 即使出錯也返回 200，但標記為 degraded
    res.status(200).json({ 
      status: 'degraded', 
      error: error.message 
    });
  }
});
```

---

## Railway 配置檢查

請確認：
1. ✅ `JWT_SECRET` 環境變量已設置
2. ✅ `DATABASE_URL` 環境變量已設置
3. ✅ PostgreSQL 數據庫已連接
4. ✅ 服務已設置為 Public
5. ✅ 健康檢查路徑設置為 `/health`

---

## 預期結果

修復後應該能夠：
1. ✅ 應用成功啟動
2. ✅ 健康檢查通過
3. ✅ `/health` 端點返回 200 狀態
4. ✅ 應用正常響應請求

---

請幫我診斷問題並提供修復方案。如果需要，我可以提供 Railway 部署日誌截圖。
