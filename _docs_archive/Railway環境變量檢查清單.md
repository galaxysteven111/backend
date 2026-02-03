# 🔍 Railway 環境變量檢查清單

## 📊 當前問題

根據部署日誌：
- ✅ `JWT_SECRET` 已設置
- ❌ `DATABASE_URL` 未設置
- ❌ 沒有顯示 PG 變量檢查日誌

**這意味著**：
1. 修復可能還沒有推送到 Railway（代碼還是舊版本）
2. 或者 Railway 沒有提供 PGUSER, PGHOST, PGDATABASE 等變量

---

## 🚀 立即行動

### 步驟 1：推送修復

運行：
```cmd
.\推送DATABASE_URL修復.bat
```

或手動執行：
```bash
git add backend/src/config/env.ts
git commit -m "修復 DATABASE_URL 模板變量解析：添加回退機制從 PG* 變量構建"
git push
```

### 步驟 2：檢查 Railway 環境變量

1. **登錄 Railway**
   - https://railway.app

2. **打開 foodbox-backend 服務**
   - 點擊 "Variables" 標籤

3. **檢查以下變量**：

**必須設置（至少一種方式）**：

**方式 A：DATABASE_URL（直接值）**
- `DATABASE_URL` = `postgresql://user:password@host:port/database`
- 應該是實際的連接字符串，不是模板

**方式 B：個別 PG 變量**
- `PGUSER` = 數據庫用戶名
- `PGPASSWORD` = 數據庫密碼（或 `POSTGRES_PASSWORD`）
- `PGHOST` = 數據庫主機（或 `RAILWAY_PRIVATE_DOMAIN`）
- `PGPORT` = 數據庫端口（默認 5432）
- `PGDATABASE` = 數據庫名稱

---

## 🔍 診斷步驟

### 如果修復已推送，部署日誌應該顯示：

**情況 1：DATABASE_URL 是模板**
```
DATABASE_URL: ⚠️  包含未解析的模板變量
  提示: Railway 的 ${{...}} 引用未解析。請確認 PostgreSQL 插件已正確連接。
  原始值: postgresql://${{PGUSER}}:${{POSTGRES_PASSWORD}}@...
PGUSER: ✅ 已設置
PGHOST: ✅ 已設置
PGDATABASE: ✅ 已設置
ℹ️  DATABASE_URL 從 PG* 變量構建
✅ 環境變量驗證通過
```

**情況 2：沒有 PG 變量**
```
DATABASE_URL: ❌ 未設置
PGUSER: ❌ 未設置
PGHOST: ❌ 未設置
PGDATABASE: ❌ 未設置
❌ 環境變量驗證失敗！缺少: DATABASE_URL
```

---

## 🔧 解決方案

### 如果沒有 PG 變量：

1. **確認 PostgreSQL 服務已添加**
   - Railway → 項目 → 應該有 PostgreSQL 服務

2. **確認服務已連接**
   - PostgreSQL 服務應該連接到 `foodbox-backend` 服務
   - Railway 會自動設置 PG 變量

3. **手動設置 DATABASE_URL**
   - 從 PostgreSQL 服務的連接設置中複製實際值
   - 在 `foodbox-backend` 的 Variables 中設置

---

## ✅ 驗證步驟

推送修復後：

1. **等待 Railway 重新部署**（1-2 分鐘）

2. **檢查部署日誌**
   - Railway → `foodbox-backend` → "Deploy Logs"
   - 應該看到 PG 變量檢查日誌
   - 應該看到 `ℹ️  DATABASE_URL 從 PG* 變量構建`（如果有 PG 變量）

3. **檢查環境變量**
   - Railway → `foodbox-backend` → "Variables"
   - 確認 PG 變量或 DATABASE_URL 已設置

---

## 🎯 下一步

1. **立即推送修復**
   ```cmd
   .\推送DATABASE_URL修復.bat
   ```

2. **檢查 Railway 環境變量**
   - 確認 PG 變量或 DATABASE_URL 已設置

3. **等待重新部署**
   - Railway 會自動重新部署

4. **檢查結果**
   - 部署日誌應該顯示應用成功啟動

---

**請先推送修復，然後檢查 Railway 環境變量！**
