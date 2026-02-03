# ⚡ Railway 連接 PostgreSQL 快速指南

## 🎯 目標

將 `foodbox-db` PostgreSQL 服務連接到 `foodbox-backend` 服務。

---

## 🚀 最簡單的方法

### 步驟 1：打開 foodbox-backend 服務

1. 在 Railway 項目頁面
2. 左側服務列表中，點擊 **`foodbox-backend`** 服務

### 步驟 2：打開 Variables 標籤

1. 點擊頂部標籤中的 **"Variables"** 標籤

### 步驟 3：連接數據庫

**選項 A：使用 "Add Variable" 提示**
1. 找到紫色提示框："**Trying to connect a database? Add Variable**"
2. 點擊 **"Add Variable"** 鏈接
3. 選擇 **"Reference Variable from Service"**
4. 選擇 **`foodbox-db`** 服務
5. 選擇 **`DATABASE_URL`** 變量
6. 點擊 **"Add"**

**選項 B：使用 + New Variable 按鈕**
1. 點擊右上角的 **"+ New Variable"** 按鈕
2. 選擇 **"Reference Variable from Service"**
3. 選擇 **`foodbox-db`** 服務
4. 選擇 **`DATABASE_URL`** 變量
5. 點擊 **"Add"**

### 步驟 4：確認連接

1. 在 Variables 列表中，應該會看到：
   - `DATABASE_URL` = `${{foodbox-db.DATABASE_URL}}`
   - **"8 variables added by Railway"** 部分（可展開）
   - 展開後應該看到 PG* 變量

---

## ✅ 驗證

### 檢查 Variables

1. 打開 `foodbox-backend` → Variables
2. 展開 **"8 variables added by Railway"** 部分
3. 應該看到：
   - `PGUSER` ✅
   - `PGPASSWORD` ✅
   - `PGHOST` 或 `RAILWAY_PRIVATE_DOMAIN` ✅
   - `PGDATABASE` ✅

### 檢查部署日誌

1. 推送代碼後，Railway 會自動重新部署
2. 打開 Deploy Logs
3. 應該看到：
   ```
   PGUSER: ✅ 已設置
   PGHOST: ✅ 已設置
   PGDATABASE: ✅ 已設置
   ✅ DATABASE_URL 從 PG* 變量構建成功
   ✅ 環境變量驗證通過
   🚀 服務器已啟動
   ```

---

## 🎯 完成！

連接完成後，Railway 會自動設置所有必需的 PG* 變量，應用應該能夠成功啟動！
