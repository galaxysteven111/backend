# 🔍 Railway 健康檢查失敗診斷

## 📊 當前狀態

✅ **構建成功**：23.61秒
❌ **健康檢查失敗**：`/health` 端點返回 "service unavailable"

---

## 🔍 問題分析

健康檢查失敗意味著：
- 應用可能沒有成功啟動
- 或者應用啟動了但無法響應請求

---

## 📋 診斷步驟

### 步驟 1：檢查部署日誌（最重要！）

1. 在 Railway 中打開 `foodbox-backend` 服務
2. 點擊 **"Deploy Logs"** 標籤（不是 Build Logs）
3. 查看應用啟動時的日誌

**查找以下內容**：

✅ **成功啟動的標誌**：
```
🔍 環境變量檢查
JWT_SECRET:   ✅ 已設置
DATABASE_URL: ✅ 已設置
✅ 環境變量驗證通過

🚀 服務器已啟動
   地址: http://0.0.0.0:XXXX
   環境: production
```

❌ **啟動失敗的標誌**：
```
❌ 環境變量驗證失敗！
缺少: JWT_SECRET
process.exit(1)
```

或
```
Error: ...
```

---

### 步驟 2：檢查環境變量

在 Railway Dashboard → Service → Variables 中確認：

**必須設置**：
- [ ] `JWT_SECRET` - 必須設置！
- [ ] `DATABASE_URL` - 必須設置（或數據庫連接變量）

**推薦設置**：
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL`（如果需要 CORS）

---

### 步驟 3：常見問題和解決方案

#### 問題 1：環境變量缺失

**症狀**：
- 部署日誌顯示：`❌ 環境變量驗證失敗`
- 應用沒有啟動

**解決方案**：
1. 在 Railway 中添加 `JWT_SECRET`：
   - Key: `JWT_SECRET`
   - Value: 任意隨機字符串（32+ 字符）
2. 確認 `DATABASE_URL` 已設置

---

#### 問題 2：數據庫連接失敗

**症狀**：
- 環境變量檢查通過
- 但應用無法連接數據庫

**解決方案**：
1. 確認 PostgreSQL 服務正在運行
2. 確認數據庫服務已連接到後端服務
3. 檢查 `DATABASE_URL` 是否正確

---

#### 問題 3：端口綁定問題

**症狀**：
- 應用啟動但無法響應請求

**解決方案**：
- 確認應用綁定到 `0.0.0.0`（已修復）
- 確認 Railway 自動設置的 `PORT` 環境變量正確

---

## 🔧 快速修復

### 如果環境變量缺失：

1. **登錄 Railway**
2. **打開服務設置**
   - 選擇 `foodbox-backend` 服務
   - 點擊 **"Variables"** 標籤
3. **添加 JWT_SECRET**
   - 點擊 **"New Variable"**
   - Key: `JWT_SECRET`
   - Value: `your-secret-key-here-change-this-in-production-12345`
   - 點擊 **"Add"**
4. **Railway 會自動重新部署**

---

## 📝 下一步

1. **檢查部署日誌**（最重要）
   - 查看應用啟動時的錯誤訊息
2. **設置環境變量**（如果缺失）
   - 添加 `JWT_SECRET`
   - 確認 `DATABASE_URL`
3. **等待重新部署**
   - Railway 會自動重新部署
4. **再次檢查健康檢查**
   - 應該會成功

---

## 💡 提示

最可能的原因是 **缺少 `JWT_SECRET` 環境變量**。

應用啟動時會驗證環境變量，如果 `JWT_SECRET` 缺失，應用會：
```typescript
console.error('❌ 環境變量驗證失敗！缺少: JWT_SECRET');
process.exit(1);  // 應用退出，無法啟動
```

這會導致健康檢查失敗，因為應用根本沒有運行。

---

請先檢查 **"Deploy Logs"**，然後告訴我看到了什麼錯誤訊息！
