# 📋 發送給 Claude AI 的 Railway 健康檢查失敗修復 Prompt

## 🎯 直接複製以下內容發送給 Claude AI：

---

我有一個 Node.js + TypeScript + Express 後端項目部署在 Railway，構建成功但健康檢查失敗。

### 當前狀態

✅ **構建成功**：23.61秒
❌ **健康檢查失敗**：`/health` 端點返回 "service unavailable"

**健康檢查日誌**：
```
Attempt #1 failed with service unavailable
Attempt #2 failed with service unavailable
Attempt #3 failed with service unavailable
Attempt #4 failed with service unavailable
```

### 問題分析

健康檢查失敗意味著應用可能沒有成功啟動。

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
- 未捕獲的錯誤

---

## 代碼上下文

### 環境變量驗證（backend/src/config/env.ts）

```typescript
if (!process.env.JWT_SECRET) {
  errors.push('JWT_SECRET - JWT 認證密鑰（必須設置且不能為空）');
}

if (errors.length > 0) {
  console.error('❌ 環境變量驗證失敗！缺少:\n');
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
- Railway 部署日誌（Deploy Logs）中的錯誤訊息
- 應用是否成功啟動
- 環境變量是否正確設置

### 2. 改進建議

**如果環境變量缺失**：
- 提供 Railway 環境變量設置指南

**如果應用啟動失敗**：
- 添加更好的錯誤處理
- 確保錯誤不會導致靜默退出

**如果健康檢查配置問題**：
- 改進健康檢查端點
- 即使數據庫未連接也返回 200（標記為 degraded）

### 3. 改進健康檢查

讓健康檢查更寬鬆，即使數據庫未連接也返回 200：

```typescript
app.get('/health', async (_req, res) => {
  try {
    await db.raw('SELECT 1');
    res.status(200).json({ status: 'ok', ... });
  } catch {
    // 即使數據庫未連接也返回 200，但標記為 degraded
    res.status(200).json({ status: 'degraded', ... });
  }
});
```

---

## Railway 配置檢查

請確認：
1. ✅ `JWT_SECRET` 環境變量已設置
2. ✅ `DATABASE_URL` 環境變量已設置
3. ✅ PostgreSQL 數據庫已連接

---

## 預期結果

修復後應該能夠：
1. ✅ 應用成功啟動
2. ✅ 健康檢查通過
3. ✅ `/health` 端點返回 200 狀態

---

請幫我診斷問題並提供修復方案。如果需要，我可以提供 Railway 部署日誌截圖。

---

## 📝 使用說明

1. 複製上面的內容
2. 發送給 Claude AI
3. 如果需要，可以附加：
   - Railway 部署日誌截圖
   - 環境變量配置截圖
