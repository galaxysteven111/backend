# 📸 Railway 連接 PostgreSQL 圖解步驟

## 🎯 根據您的截圖，操作步驟如下：

### 步驟 1：在 Variables 頁面連接

根據您的截圖，您現在在 `foodbox-backend` 服務的 **Variables** 標籤頁面。

#### 方法 A：使用 "Add Variable" 提示（最簡單）

1. **找到紫色提示框**
   - 在 Variables 頁面中，找到 **"Trying to connect a database? Add Variable"** 提示
   - 點擊提示框中的 **"Add Variable"** 鏈接

2. **選擇數據庫服務**
   - 在彈出窗口中，選擇 **"Reference Variable from Service"** 或類似選項
   - 選擇 **`foodbox-db`** 服務
   - 選擇 **`DATABASE_URL`** 變量
   - 點擊 **"Add"** 或 **"Save"**

#### 方法 B：使用 + New Variable 按鈕

1. **點擊右上角的 "+ New Variable" 按鈕**
   - 在 Variables 頁面右上角，找到紫色 **"+ New Variable"** 按鈕
   - 點擊它

2. **選擇 Reference Variable**
   - 在彈出窗口中，選擇 **"Reference Variable from Service"** 選項
   - 或選擇 **"From Service"** 選項

3. **選擇 foodbox-db 服務**
   - 在服務列表中，選擇 **`foodbox-db`**
   - 在變量列表中，選擇 **`DATABASE_URL`**
   - 點擊 **"Add"** 或 **"Save"**

---

### 步驟 2：通過 foodbox-db 服務連接（替代方法）

如果方法 A 不工作，可以嘗試：

1. **點擊左側的 `foodbox-db` 服務**
   - 在左側服務列表中，點擊 **`foodbox-db`** 服務

2. **打開 Settings**
   - 點擊頂部標籤中的 **"Settings"** 標籤

3. **查找 Connections 或 Connect 選項**
   - 在 Settings 頁面中，查找 **"Connections"** 或 **"Connected Services"** 部分
   - 點擊 **"Connect"** 或 **"Add Connection"** 按鈕

4. **選擇 foodbox-backend**
   - 在彈出窗口中，選擇 **`foodway-backend`** 服務
   - 點擊 **"Connect"** 或 **"Save"**

---

### 步驟 3：確認連接成功

1. **返回 foodbox-backend → Variables**
   - 點擊左側的 **`foodbox-backend`** 服務
   - 點擊 **"Variables"** 標籤

2. **檢查環境變量**
   - 應該會看到 `DATABASE_URL` 已設置（值可能是 `${{foodbox-db.DATABASE_URL}}`）
   - 應該會看到 **"8 variables added by Railway"** 部分
   - 點擊右側箭頭展開這個部分
   - 應該會看到：
     - `PGUSER`
     - `PGPASSWORD`
     - `PGHOST` 或 `RAILWAY_PRIVATE_DOMAIN`
     - `PGDATABASE`
     - `PGPORT`

---

## ✅ 驗證連接

### 檢查 Variables

1. 在 `foodbox-backend` → Variables 頁面
2. 展開 **"8 variables added by Railway"** 部分
3. 確認看到 PG* 變量

### 檢查部署日誌

1. Railway 會自動重新部署（如果已連接）
2. 打開 `foodbox-backend` → Deploy Logs
3. 應該看到：
   ```
   PGUSER: ✅ 已設置
   PGHOST: ✅ 已設置
   PGDATABASE: ✅ 已設置
   ✅ DATABASE_URL 從 PG* 變量構建成功
   ```

---

## 💡 提示

- 如果看不到 "Add Variable" 提示，使用 **"+ New Variable"** 按鈕
- 連接後可能需要等待幾秒鐘，Railway 才會設置變量
- 如果變量沒有立即出現，刷新頁面
- `DATABASE_URL` 顯示為 `${{foodbox-db.DATABASE_URL}}` 是正常的，應用會自動解析

---

**請按照步驟操作，連接完成後告訴我結果！**
