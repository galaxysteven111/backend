# Claude AI - 最終步驟和部署準備 Prompt

## ✅ 項目當前狀態

所有核心功能已完成：
- ✅ 安全性修復和 Bug 修復
- ✅ 高優先級功能（地圖、圖片上傳、搜索、通知）
- ✅ 代碼優化和性能優化
- ✅ 部署配置文件已創建

---

## 🎯 最終任務：生產環境準備

現在請完成最後的部署準備工作，確保應用可以順利部署並穩定運行。

---

## 📋 任務清單

### 1. 環境變量驗證和文檔 ⚠️ 最高優先級

#### 任務 1.1：創建環境變量驗證模塊
**文件**：`backend/src/config/env.ts`

**功能**：
- 驗證所有必需的環境變量
- 啟動時檢查，缺少變量時優雅退出
- 顯示清晰的錯誤訊息

**必需變量**：
- `JWT_SECRET` - JWT 密鑰（必須）
- `DATABASE_URL` - 數據庫連接字符串（必須）
- `FRONTEND_URL` - 前端 URL（必須，用於 CORS）
- `NODE_ENV` - 環境（建議設置為 production）

**實現示例**：
```typescript
export function validateEnv() {
  const required = ['JWT_SECRET', 'DATABASE_URL', 'FRONTEND_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error(`❌ 缺少必需的環境變量: ${missing.join(', ')}`);
    console.error('請設置這些變量後再啟動應用');
    process.exit(1);
  }
  
  console.log('✅ 環境變量驗證通過');
}
```

#### 任務 1.2：創建環境變量文檔
**文件**：`ENV_VARIABLES.md`

**內容**：
- 所有環境變量列表
- 每個變量的說明
- 示例值（不包含真實密鑰）
- 如何設置

---

### 2. 數據庫遷移腳本

#### 任務 2.1：創建跨平台遷移腳本
**文件**：`backend/scripts/migrate.js`

**功能**：
- 檢查環境變量
- 運行數據庫遷移
- 顯示遷移結果
- 錯誤處理

**實現**：
```javascript
const { execSync } = require('child_process');
const requiredEnv = ['DATABASE_URL'];

// 檢查環境變量
// 運行遷移
// 顯示結果
```

#### 任務 2.2：更新 package.json 腳本
**文件**：`backend/package.json`

**添加**：
```json
{
  "scripts": {
    "migrate:prod": "NODE_ENV=production node scripts/migrate.js"
  }
}
```

---

### 3. 增強健康檢查

#### 任務 3.1：改進健康檢查端點
**文件**：`backend/src/index.ts`

**當前**：基本健康檢查
**改進**：
- 檢查數據庫連接
- 返回數據庫狀態
- 返回版本信息
- 返回環境信息（不包含敏感信息）

**響應格式**：
```json
{
  "status": "ok",
  "timestamp": "2026-02-02T...",
  "database": {
    "connected": true,
    "latency": "5ms"
  },
  "version": "1.0.0",
  "environment": "production"
}
```

---

### 4. 安全性加固

#### 任務 4.1：添加安全中間件
**文件**：`backend/src/middleware/security.ts`

**功能**：
- Helmet.js 配置
- 安全頭設置
- CSP 配置（如果適用）

**需要安裝**：
```bash
npm install helmet
npm install --save-dev @types/helmet
```

#### 任務 4.2：優化 CORS 配置
**文件**：`backend/src/index.ts`

**改進**：
- 支持多個前端域名
- 環境變量配置
- 生產環境嚴格配置

---

### 5. 日誌配置

#### 任務 5.1：創建日誌工具
**文件**：`backend/src/utils/logger.ts`

**功能**：
- 結構化日誌
- 不同日誌級別
- 生產環境不記錄敏感信息

**可選**：使用 `winston` 或簡單的 console.log 包裝

---

### 6. 錯誤處理改進

#### 任務 6.1：統一錯誤格式
**文件**：`backend/src/utils/errors.ts`

**功能**：
- 自定義錯誤類
- 統一錯誤響應格式
- 錯誤代碼映射

---

### 7. 部署檢查清單

#### 任務 7.1：創建檢查清單
**文件**：`DEPLOYMENT_CHECKLIST.md`

**內容**：
- 環境變量檢查
- 數據庫連接檢查
- 構建測試
- API 測試
- 功能測試

---

## 🎯 實現優先級

### 🔴 必須完成（部署前）
1. 環境變量驗證和文檔
2. 數據庫遷移腳本
3. 健康檢查增強
4. 安全性加固

### 🟡 建議完成
5. 日誌配置
6. 錯誤處理改進
7. 部署檢查清單

---

## 📝 實現要求

### 代碼質量
- TypeScript 完整類型
- 錯誤處理完善
- 清晰的註釋
- 遵循現有代碼風格

### 安全性
- 不洩露敏感信息
- 輸入驗證
- 安全頭設置
- CORS 正確配置

### 文檔
- 清晰的說明
- 使用示例
- 故障排查指南

---

## ✅ 完成標準

每個任務完成後：

- [ ] 功能正常工作
- [ ] 代碼符合規範
- [ ] 錯誤處理完善
- [ ] 文檔清晰
- [ ] 安全性檢查通過

---

## 🚀 開始實現

請按照優先級順序完成任務。每個任務完成後，請提供：

1. **實現說明**：做了什麼
2. **修改的文件**：列出所有修改的文件
3. **新增的文件**：列出所有新增的文件
4. **使用說明**：如何使用
5. **測試建議**：如何測試

**請開始第一個任務：環境變量驗證和文檔！**

---

## 📚 參考文件

- `BACKEND_DEPLOYMENT.md` - 後端部署指南
- `NETLIFY_DEPLOYMENT.md` - 前端部署指南
- `QUICK_DEPLOY_BACKEND.md` - 快速部署指南
