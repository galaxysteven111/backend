# Claude AI 修復 DATABASE_URL 缺失 PG 變量問題 Prompt

請將以下內容發送給 Claude AI：

---

## 任務：修復 Railway 部署時 DATABASE_URL 缺失問題

我有一個 Node.js + TypeScript + Express 後端項目部署在 Railway，應用無法啟動因為 DATABASE_URL 未設置。

### 當前狀態

**部署日誌顯示**：
```
===================================
🔍 環境變量檢查
===================================
  NODE_EN�:     production
  PORT:         8080
  JWT_SECRET:   ✅ 已設置
  DATABASE_URL: ❌ 未設置
  FRONTEND_URL: (未設置, 默認 http://localhost:3000)
===================================
❌ 環境變量驗證失敗！缺少:
  • DATABASE_URL - 數據庫連接字符串（生產環境必需）。可設置 DATABASE_URL 或 PGUSER+PGPASSWORD+PGHOST+PGDATABASE
```

### 問題分析

**問題**：
- `DATABASE_URL` 未設置
- 錯誤訊息提到可以設置 `PGUSER+PGPASSWORD+PGHOST+PGDATABASE`，但日誌中沒有顯示這些變量的檢查結果
- Railway 可能沒有提供 PG 變量，或者檢查邏輯有問題

**當前代碼**（backend/src/config/env.ts）：
```typescript
// Resolve DATABASE_URL (may construct from individual PG vars)
const databaseUrl = resolveDatabaseUrl();

const rawDbUrl = process.env.DATABASE_URL;
if (rawDbUrl && rawDbUrl.includes('${{')) {
  console.log(`  DATABASE_URL: ⚠️  包含未解析的模板變量`);
  console.log(`    提示: Railway 的 ${{...}} 引用未解析。請確認 PostgreSQL 插件已正確連接。`);
  console.log(`    原始值: ${rawDbUrl.substring(0, 60)}...`);
} else {
  console.log(`  DATABASE_URL: ${databaseUrl ? '✅ 已設置' : '❌ 未設置'}`);
}

// Also log Railway PG vars for debugging
const hasPgVars = !!(process.env.PGUSER || process.env.PGHOST || process.env.PGDATABASE);
if (hasPgVars) {
  console.log(`  PGUSER:       ${process.env.PGUSER ? '✅ 已設置' : '❌ 未設置'}`);
  console.log(`  PGHOST:       ${process.env.PGHOST || process.env.RAILWAY_PRIVATE_DOMAIN || '❌ 未設置'}`);
  console.log(`  PGDATABASE:   ${process.env.PGDATABASE ? '✅ 未設置' : '❌ 未設置'}`);
}
```

**問題**：
- PG 變量檢查只在 `hasPgVars` 為 true 時才顯示
- 如果 Railway 沒有提供 PG 變量，日誌中不會顯示檢查結果
- 用戶無法知道是否應該設置 PG 變量

---

## 修復要求

### 1. 改進診斷日誌

**問題**：PG 變量檢查只在變量存在時才顯示，導致用戶無法知道是否應該設置這些變量。

**修復**：始終顯示 PG 變量檢查，即使變量不存在：

```typescript
// Always log Railway PG vars for debugging (even if not set)
console.log(`  PGUSER:       ${process.env.PGUSER ? '✅ 已設置' : '❌ 未設置'}`);
console.log(`  PGPASSWORD:   ${process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD ? '✅ 已設置' : '❌ 未設置'}`);
console.log(`  PGHOST:       ${process.env.PGHOST || process.env.RAILWAY_PRIVATE_DOMAIN ? '✅ 已設置' : '❌ 未設置'}`);
console.log(`  PGDATABASE:   ${process.env.PGDATABASE ? '✅ 已設置' : '❌ 未設置'}`);
```

### 2. 改進錯誤訊息

**問題**：錯誤訊息提到可以設置 PG 變量，但沒有明確說明如何設置。

**修復**：提供更詳細的錯誤訊息和解決方案：

```typescript
if (!hasDbConnection && process.env.NODE_ENV === 'production') {
  console.error('\n❌ 數據庫連接配置缺失！\n');
  console.error('請選擇以下方式之一設置：\n');
  console.error('方式 1：設置 DATABASE_URL');
  console.error('  Railway → foodbox-backend → Variables → New Variable');
  console.error('  Key: DATABASE_URL');
  console.error('  Value: postgresql://user:password@host:port/database\n');
  console.error('方式 2：設置個別 PG 變量（如果已連接 PostgreSQL 插件）');
  console.error('  Railway 會自動設置：PGUSER, PGPASSWORD, PGHOST, PGDATABASE');
  console.error('  請確認 PostgreSQL 插件已正確連接到 foodbox-backend 服務\n');
  errors.push('DATABASE_URL - 數據庫連接字符串（生產環境必需）');
}
```

### 3. 改進 resolveDatabaseUrl 函數的日誌

**問題**：如果從 PG 變量構建失敗，沒有清晰的日誌說明原因。

**修復**：添加詳細的構建過程日誌：

```typescript
function resolveDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;

  // If set and looks like a real URL (not an unresolved template), use it
  if (raw && raw.startsWith('postgresql://') && !raw.includes('${{')) {
    return raw;
  }

  // Try Railway's individual Postgres variables
  const user = process.env.PGUSER || process.env.DB_USER;
  const password = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD;
  const host = process.env.PGHOST || process.env.RAILWAY_PRIVATE_DOMAIN || process.env.DB_HOST;
  const port = process.env.PGPORT || process.env.DB_PORT || '5432';
  const database = process.env.PGDATABASE || process.env.DB_NAME;

  // Log what we found
  console.log('  🔍 嘗試從個別變量構建 DATABASE_URL:');
  console.log(`    PGUSER:       ${user ? '✅ ' + user : '❌ 未設置'}`);
  console.log(`    PGPASSWORD:   ${password ? '✅ 已設置' : '❌ 未設置'}`);
  console.log(`    PGHOST:       ${host ? '✅ ' + host : '❌ 未設置'}`);
  console.log(`    PGDATABASE:   ${database ? '✅ ' + database : '❌ 未設置'}`);

  if (user && password && host && database) {
    const constructed = `postgresql://${user}:${password}@${host}:${port}/${database}`;
    console.log('  ✅ DATABASE_URL 從 PG* 變量構建成功');
    process.env.DATABASE_URL = constructed;
    return constructed;
  } else {
    console.log('  ❌ 無法從 PG* 變量構建 DATABASE_URL（缺少必需變量）');
    return undefined;
  }
}
```

---

## 預期結果

修復後，部署日誌應該顯示：

```
===================================
🔍 環境變量檢查
===================================
  NODE_ENV:     production
  PORT:         8080
  JWT_SECRET:   ✅ 已設置
  DATABASE_URL: ❌ 未設置
  FRONTEND_URL: (未設置, 默認 http://localhost:3000)
  PGUSER:       ❌ 未設置
  PGPASSWORD:   ❌ 未設置
  PGHOST:       ❌ 未設置
  PGDATABASE:   ❌ 未設置
  🔍 嘗試從個別變量構建 DATABASE_URL:
    PGUSER:       ❌ 未設置
    PGPASSWORD:   ❌ 未設置
    PGHOST:       ❌ 未設置
    PGDATABASE:   ❌ 未設置
  ❌ 無法從 PG* 變量構建 DATABASE_URL（缺少必需變量）
===================================
❌ 數據庫連接配置缺失！

請選擇以下方式之一設置：

方式 1：設置 DATABASE_URL
  Railway → foodbox-backend → Variables → New Variable
  Key: DATABASE_URL
  Value: postgresql://user:password@host:port/database

方式 2：設置個別 PG 變量（如果已連接 PostgreSQL 插件）
  Railway 會自動設置：PGUSER, PGPASSWORD, PGHOST, PGDATABASE
  請確認 PostgreSQL 插件已正確連接到 foodbox-backend 服務
```

---

## 修復重點

1. **始終顯示 PG 變量檢查**：即使變量不存在，也要顯示檢查結果
2. **詳細的構建過程日誌**：顯示嘗試從 PG 變量構建的過程
3. **清晰的錯誤訊息**：提供具體的設置步驟
4. **改進的診斷信息**：幫助用戶理解問題和解決方案

---

請修復 `backend/src/config/env.ts`，改進診斷日誌和錯誤訊息，確保用戶能夠清楚地看到問題和解決方案。
