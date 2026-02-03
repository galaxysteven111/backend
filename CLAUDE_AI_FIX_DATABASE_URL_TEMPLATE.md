# Claude AI 修復 DATABASE_URL 模板變量問題 Prompt

請將以下內容發送給 Claude AI：

---

## 任務：修復 DATABASE_URL 模板變量解析問題

我有一個 Node.js + TypeScript + Express 後端項目部署在 Railway，遇到 `DATABASE_URL` 環境變量解析問題。

### 問題描述

**當前情況**：
- ✅ `DATABASE_URL` 環境變量在 Railway 中已設置
- ❌ 但值是模板字符串：`postgresql://${{PGUSER}}:${{POSTGRES_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:5432/${{PGDATABASE}}`
- ❌ 應用報告：`DATABASE_URL: ❌ 未設置`
- ❌ 應用無法啟動（環境變量驗證失敗）

### 錯誤日誌

```
===================================
🔍 環境變量檢查
===================================
  DATABASE_URL: ❌ 未設置
===================================
❌ 環境變量驗證失敗！缺少:
  • DATABASE_URL - 數據庫連接字符串（生產環境必需）
```

### 問題分析

**根本原因**：
- Railway 的 `DATABASE_URL` 使用了變量引用模板：`${{PGUSER}}`, `${{POSTGRES_PASSWORD}}` 等
- 這些變量引用在 Node.js 運行時可能沒有正確解析
- `process.env.DATABASE_URL` 可能仍然是模板字符串，而不是實際的連接字符串
- 環境變量驗證邏輯檢查 `!!process.env.DATABASE_URL`，如果值是模板字符串且未解析，可能被認為是"未設置"

---

## 代碼上下文

### 環境變量驗證（backend/src/config/env.ts）

```typescript
export function validateEnv(): EnvConfig {
  console.log('🔍 環境變量檢查');
  console.log(`  DATABASE_URL: ${process.env.DATABASE_URL ? '✅ 已設置' : '❌ 未設置'}`);

  const errors: string[] = [];

  // Database: either DATABASE_URL or individual DB_* vars
  const hasDbUrl = !!process.env.DATABASE_URL;
  const hasDbParts = !!(process.env.DB_HOST || process.env.DB_USER);
  
  if (!hasDbUrl && !hasDbParts && process.env.NODE_ENV === 'production') {
    errors.push('DATABASE_URL - 數據庫連接字符串（生產環境必需）');
  }

  if (errors.length > 0) {
    console.error('❌ 環境變量驗證失敗！缺少:\n');
    errors.forEach((e) => console.error(`  • ${e}`));
    process.exit(1);
  }
  // ...
}
```

### 數據庫配置（backend/src/config/database.ts）

```typescript
const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'foodbox_db'
  },
  // ...
};
```

---

## 修復要求

### 方案 1：改進環境變量驗證邏輯（推薦）

**問題**：
- 當前檢查 `!!process.env.DATABASE_URL` 可能無法正確識別模板字符串
- 需要檢查變量是否存在且不是空字符串

**修復**：
```typescript
// 改進 DATABASE_URL 檢查
const hasDbUrl = !!(
  process.env.DATABASE_URL && 
  process.env.DATABASE_URL.trim() !== '' &&
  !process.env.DATABASE_URL.startsWith('${{') // 檢查是否是未解析的模板
);
```

**或者更寬鬆的檢查**：
```typescript
// 只要變量存在就認為已設置（Railway 會在運行時解析）
const hasDbUrl = !!process.env.DATABASE_URL && process.env.DATABASE_URL.length > 0;
```

### 方案 2：添加詳細的診斷日誌

**改進日誌輸出**：
```typescript
console.log(`  DATABASE_URL: ${process.env.DATABASE_URL ? '✅ 已設置' : '❌ 未設置'}`);
if (process.env.DATABASE_URL) {
  // 顯示前幾個字符（隱藏敏感信息）
  const preview = process.env.DATABASE_URL.substring(0, 30);
  const isTemplate = process.env.DATABASE_URL.includes('${{');
  console.log(`   值預覽: ${preview}...`);
  console.log(`   是否為模板: ${isTemplate ? '是（Railway 會在運行時解析）' : '否'}`);
}
```

### 方案 3：允許模板字符串通過驗證

**修改驗證邏輯**：
```typescript
// Railway 的變量引用模板應該被視為"已設置"
// Railway 會在運行時解析這些模板
const hasDbUrl = !!(
  process.env.DATABASE_URL && 
  process.env.DATABASE_URL.trim() !== ''
);

// 即使包含 ${{ 也認為已設置（Railway 會解析）
// 或者檢查是否包含 postgresql:// 前綴
const isValidDbUrl = hasDbUrl && (
  process.env.DATABASE_URL.includes('postgresql://') ||
  process.env.DATABASE_URL.includes('${{') // Railway 模板
);
```

### 方案 4：改進錯誤處理

**如果 DATABASE_URL 是模板但未解析**：
- 記錄警告而不是錯誤
- 允許應用啟動，但標記數據庫連接可能失敗
- 在實際連接時處理錯誤

---

## 推薦修復方案

**組合方案 1 + 3**：

1. **改進環境變量檢查**：
   - 只要 `DATABASE_URL` 存在且非空，就認為已設置
   - 即使包含 `${{` 模板語法也認為已設置（Railway 會解析）

2. **添加詳細診斷**：
   - 顯示 `DATABASE_URL` 的前幾個字符
   - 標記是否為模板字符串
   - 幫助調試

3. **改進錯誤處理**：
   - 在數據庫連接時處理錯誤
   - 不要因為模板字符串而阻止應用啟動

---

## 預期結果

修復後應該能夠：
1. ✅ 環境變量驗證通過（即使 `DATABASE_URL` 是模板字符串）
2. ✅ 應用成功啟動
3. ✅ Railway 在運行時解析模板變量
4. ✅ 數據庫連接正常工作

---

## 注意事項

- Railway 會在運行時解析 `${{VAR}}` 模板變量
- 應用啟動時，模板可能還沒有解析
- 但實際連接數據庫時，Railway 應該已經解析了變量
- 驗證邏輯應該允許模板字符串通過

---

請修復環境變量驗證邏輯，確保即使 `DATABASE_URL` 是 Railway 模板字符串也能通過驗證，並提供修復後的代碼。
