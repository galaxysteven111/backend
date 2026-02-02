# 🔧 修復 Docker 構建錯誤

## ❌ 問題

Docker 構建失敗，錯誤訊息：
```
npm error The `npm ci` command can only install with an existing package-lock.json
```

## ✅ 解決方案

### 方案 1：生成 package-lock.json（推薦）

在本地生成 `package-lock.json` 文件：

```bash
cd backend
npm install
```

這會生成 `package-lock.json` 文件。

然後推送：
```bash
git add backend/package-lock.json
git commit -m "添加 package-lock.json"
git push
```

### 方案 2：使用 npm install（已修改 Dockerfile）

我已經修改了 `backend/Dockerfile`，將 `npm ci` 改為 `npm install`。

這樣可以立即解決構建問題，但 `npm install` 比 `npm ci` 慢一些。

---

## 📝 已修改的文件

- `backend/Dockerfile` - 將 `npm ci` 改為 `npm install`

---

## 🚀 下一步

### 選項 A：使用修改後的 Dockerfile（立即可用）
直接推送代碼，Dockerfile 已經修改為使用 `npm install`。

### 選項 B：生成 package-lock.json（最佳實踐）
1. 運行 `.\生成package-lock.bat` 或手動執行：
   ```bash
   cd backend
   npm install
   ```
2. 推送 `package-lock.json`：
   ```bash
   git add backend/package-lock.json
   git commit -m "添加 package-lock.json"
   git push
   ```
3. 然後可以將 Dockerfile 改回使用 `npm ci`（更快）

---

## 💡 建議

**推薦使用方案 B**，因為：
- `npm ci` 比 `npm install` 更快
- `npm ci` 更適合生產環境
- `package-lock.json` 確保依賴版本一致性
