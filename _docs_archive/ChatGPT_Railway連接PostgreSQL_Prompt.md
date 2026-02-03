# ChatGPT Railway PostgreSQL 連接問題 Prompt

請將以下內容發送給 ChatGPT：

---

我有一個 Node.js + TypeScript + Express 後端項目部署在 Railway，應用無法啟動因為缺少數據庫連接配置。

## 當前問題

**部署日誌顯示**：
```
🔍 環境變量檢查
DATABASE_URL: ❌ 未設置
PGUSER: ❌ 未設置
PGPASSWORD: ❌ 未設置
PGHOST: ❌ 未設置
PGDATABASE: ❌ 未設置
❌ 環境變量驗證失敗！缺少: DATABASE_URL
```

**Railway 設置**：
- 項目中已有 `foodbox-db` PostgreSQL 服務
- 項目中已有 `foodbox-backend` 後端服務
- 但兩個服務沒有連接

## 問題分析

應用需要數據庫連接才能啟動，但 Railway 沒有自動設置 PG* 環境變量，因為 PostgreSQL 服務沒有連接到後端服務。

## 解決方案要求

### 目標

將 `foodbox-db` PostgreSQL 服務連接到 `foodbox-backend` 服務，讓 Railway 自動設置 PG* 環境變量。

### Railway 操作步驟

請提供詳細的步驟說明如何在 Railway 平台中：

1. **連接 PostgreSQL 服務到後端服務**
   - 在 Railway 項目中，如何將 `foodbox-db` 連接到 `foodbox-backend`
   - 具體的點擊路徑和操作步驟

2. **確認連接成功**
   - 如何檢查連接是否成功
   - 如何確認 PG* 環境變量已自動設置

3. **驗證應用啟動**
   - 連接後如何驗證應用成功啟動
   - 如何檢查部署日誌確認環境變量已設置

### 預期結果

連接成功後，Railway 應該自動設置：
- `PGUSER` - 數據庫用戶名
- `PGPASSWORD` - 數據庫密碼
- `PGHOST` - 數據庫主機
- `PGDATABASE` - 數據庫名稱

應用應該能夠：
- 從 PG* 變量構建 DATABASE_URL
- 成功連接數據庫
- 正常啟動

## 具體問題

1. **在 Railway Variables 頁面中**：
   - 看到 "Trying to connect a database? Add Variable" 提示
   - 看到 "+ New Variable" 按鈕
   - 但不知道如何正確連接 PostgreSQL 服務

2. **在 Railway 服務列表中**：
   - 看到 `foodbox-db` PostgreSQL 服務
   - 看到 `foodbox-backend` 後端服務
   - 但不知道如何將它們連接

## 需要的幫助

請提供：
1. **詳細的操作步驟**（每一步的具體操作）
2. **Railway 界面說明**（每個步驟應該在哪裡操作）
3. **常見問題解決方案**（如果連接不成功）
4. **驗證步驟**（如何確認連接成功）

---

請提供詳細的 Railway 操作步驟，幫助我將 PostgreSQL 服務連接到後端服務，讓應用能夠成功啟動。
