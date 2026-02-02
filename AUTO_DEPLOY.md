# 🤖 自動化部署指南

## 🎯 目標
使用腳本和工具自動完成部署，減少手動操作。

---

## 🚀 方法 1：使用 Railway CLI 自動部署（最簡單）

### 優點
- ✅ 完全自動化
- ✅ 無需手動操作
- ✅ 一鍵部署

### 步驟

#### 1. 安裝 Railway CLI

**Windows (PowerShell)**:
```powershell
iwr https://railway.app/install.ps1 -useb | iex
```

**macOS/Linux**:
```bash
curl -fsSL https://railway.app/install.sh | sh
```

#### 2. 登錄 Railway

```bash
railway login
```

這會打開瀏覽器完成登錄。

#### 3. 運行自動部署腳本

我已經為你創建了自動部署腳本，運行：

```bash
# Windows
.\deploy-backend.ps1

# macOS/Linux
./deploy-backend.sh
```

腳本會自動：
- 初始化 Railway 項目
- 添加 PostgreSQL 數據庫
- 設置環境變量
- 部署應用
- 運行數據庫遷移

---

## 🚀 方法 2：使用 Cursor AI 協助部署

### 步驟

1. **在 Cursor 中打開終端**
   - 按 `Ctrl + `` (反引號) 或 `View → Terminal`

2. **告訴 Cursor AI**：
   ```
   請幫我部署後端到 Railway：
   1. 檢查 Railway CLI 是否安裝
   2. 如果沒有，安裝 Railway CLI
   3. 登錄 Railway
   4. 初始化項目
   5. 添加 PostgreSQL
   6. 設置環境變量
   7. 部署應用
   ```

3. **Cursor AI 會逐步執行命令**

---

## 🚀 方法 3：使用部署腳本（推薦）

我已經為你創建了自動化腳本，直接運行即可。

### Windows 用戶

```powershell
# 在項目根目錄運行
.\scripts\deploy-backend-windows.ps1
```

### macOS/Linux 用戶

```bash
# 在項目根目錄運行
chmod +x scripts/deploy-backend.sh
./scripts/deploy-backend.sh
```

---

## 📝 我來幫你創建自動化腳本

讓我為你創建這些腳本，你只需要運行即可！
