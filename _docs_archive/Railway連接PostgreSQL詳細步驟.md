# 🔗 Railway 連接 PostgreSQL 詳細步驟

## 📋 目標

將 `foodbox-db` PostgreSQL 服務連接到 `foodbox-backend` 服務，讓 Railway 自動設置 PG* 環境變量。

---

## 🚀 步驟說明

### 方法 1：通過 PostgreSQL 服務連接（推薦）

#### 步驟 1：打開 PostgreSQL 服務

1. **在 Railway 項目頁面**
   - 左側服務列表中，找到 **`foodbox-db`** 服務
   - 點擊 **`foodbox-db`** 服務

#### 步驟 2：打開 Settings

1. **在 `foodbox-db` 服務頁面**
   - 點擊頂部標籤中的 **"Settings"** 標籤
   - 或點擊服務名稱旁邊的設置圖標

#### 步驟 3：連接服務

1. **在 Settings 頁面中查找 "Connections" 或 "Connect" 選項**
   - 可能顯示為 "Connected Services" 或 "Service Connections"
   - 查找 **"Connect"** 或 **"Add Connection"** 按鈕

2. **選擇要連接的服務**
   - 點擊 **"Connect"** 或 **"Add Connection"**
   - 在彈出窗口中選擇 **`foodbox-backend`** 服務
   - 點擊 **"Connect"** 或 **"Save"**

#### 步驟 4：確認連接

1. **返回 `foodbox-backend` 服務**
   - 點擊左側服務列表中的 **`foodbox-backend`** 服務
   - 點擊 **"Variables"** 標籤

2. **檢查環境變量**
   - 應該會看到 **"8 variables added by Railway"** 部分
   - 展開這個部分（點擊右側箭頭）
   - 應該會看到 `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGDATABASE` 等變量

---

### 方法 2：通過 foodbox-backend 服務連接

#### 步驟 1：打開 foodbox-backend 服務

1. **在 Railway 項目頁面**
   - 左側服務列表中，點擊 **`foodbox-backend`** 服務

#### 步驟 2：打開 Variables 標籤

1. **在 `foodbox-backend` 服務頁面**
   - 點擊頂部標籤中的 **"Variables"** 標籤

#### 步驟 3：使用 "Add Variable" 連接數據庫

1. **查找 "Trying to connect a database?" 提示**
   - 在 Variables 頁面中，應該會看到紫色提示框
   - 提示文字：**"Trying to connect a database? Add Variable"**

2. **點擊 "Add Variable" 鏈接**
   - 點擊提示框中的 **"Add Variable"** 鏈接
   - 或點擊右上角的 **"+ New Variable"** 按鈕

3. **選擇數據庫連接**
   - 在彈出窗口中，選擇 **"Reference Variable from Service"** 或類似選項
   - 選擇 **`foodbox-db`** 服務
   - 選擇 **`DATABASE_URL`** 變量
   - 點擊 **"Add"** 或 **"Save"**

#### 步驟 4：確認連接

1. **檢查環境變量**
   - 在 Variables 列表中，應該會看到 `DATABASE_URL` 已設置
   - 應該會看到 **"8 variables added by Railway"** 部分
   - 展開這個部分，應該會看到 PG* 變量

---

### 方法 3：通過 Architecture 視圖連接

#### 步驟 1：打開 Architecture 視圖

1. **在 Railway 項目頁面**
   - 點擊頂部標籤中的 **"Architecture"** 標籤

#### 步驟 2：連接服務

1. **在 Architecture 視圖中**
   - 找到 **`foodbox-db`** 和 **`foodbox-backend`** 服務
   - 拖動連接線從 `foodbox-db` 到 `foodbox-backend`
   - 或點擊服務之間的連接按鈕

#### 步驟 3：確認連接

1. **檢查 Variables**
   - 打開 `foodbox-backend` → Variables
   - 確認 PG* 變量已自動設置

---

## ✅ 驗證連接

### 步驟 1：檢查 Variables

1. **打開 `foodbox-backend` → Variables**
2. **查找以下內容**：

**應該看到**：
- `DATABASE_URL` 變量（值應該是 `${{foodbox-db.DATABASE_URL}}` 或實際連接字符串）
- **"8 variables added by Railway"** 部分（可展開）
- 展開後應該看到：
  - `PGUSER`
  - `PGPASSWORD`
  - `PGHOST` 或 `RAILWAY_PRIVATE_DOMAIN`
  - `PGDATABASE`
  - `PGPORT`

### 步驟 2：檢查部署日誌

1. **推送代碼後，Railway 會自動重新部署**
2. **打開 Deploy Logs**
3. **應該看到**：
   ```
   🔍 環境變量檢查
   DATABASE_URL: ✅ 已設置
   PGUSER: ✅ 已設置
   PGHOST: ✅ 已設置
   PGDATABASE: ✅ 已設置
   ✅ 環境變量驗證通過
   🚀 服務器已啟動
   ```

---

## 🔧 如果連接不成功

### 問題 1：找不到 Connect 選項

**解決方案**：
- 確認 `foodbox-db` 服務已創建並運行
- 嘗試方法 2（通過 Variables 頁面連接）

### 問題 2：連接後沒有 PG 變量

**解決方案**：
- 等待幾秒鐘，Railway 可能需要時間設置變量
- 刷新頁面
- 檢查 `foodbox-db` 服務是否正在運行

### 問題 3：DATABASE_URL 仍然是模板

**解決方案**：
- 這是正常的，Railway 使用變量引用
- 應用會自動從 PG* 變量構建實際的 DATABASE_URL
- 檢查部署日誌確認構建是否成功

---

## 📝 快速檢查清單

- [ ] `foodbox-db` 服務已創建並運行
- [ ] `foodbox-db` 已連接到 `foodbox-backend`
- [ ] `foodbox-backend` Variables 中看到 PG* 變量
- [ ] 部署日誌顯示環境變量驗證通過
- [ ] 應用成功啟動

---

## 🎯 完成！

連接完成後，Railway 會自動設置所有必需的 PG* 變量，應用應該能夠成功啟動！
