# 📋 發送給 Claude AI 的 Docker 構建順序修復 Prompt

## 🎯 直接複製以下內容發送給 Claude AI：

---

我有一個 Node.js + TypeScript + Express 後端項目，Docker 構建時遇到構建順序問題。

### 錯誤訊息

```
error TS18003: No inputs were found in config file '/app/tsconfig.json'. 
Specified 'include' paths were '["src/**/*"]' and 'exclude' paths were '["node_modules","dist"]'.
```

### 問題分析

Dockerfile 的構建順序有問題：

1. 先複製 `package.json` 和 `tsconfig.json`
2. 運行 `npm install` → 觸發 `postinstall` 腳本 → 執行 `npm run build`
3. **但此時 `src/` 目錄還沒有被複製！**
4. 然後才複製源代碼

所以 TypeScript 編譯器找不到源文件。

### 當前 Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# 複製 package 文件
COPY package*.json ./
COPY tsconfig.json ./

# 安裝依賴 ← 這裡觸發 postinstall，但 src/ 還不存在
RUN npm install

# 複製源代碼 ← src/ 在這裡才被複製
COPY . .

# 構建 TypeScript
RUN npm run build
```

### package.json 中的 postinstall

```json
{
  "scripts": {
    "postinstall": "npm run build"  // ← 在 npm install 時自動執行
  }
}
```

---

## 修復要求

**推薦方案**：在 Docker 構建時跳過 postinstall 腳本

修改 Dockerfile：
```dockerfile
# 安裝依賴（跳過 postinstall）
RUN npm install --ignore-scripts

# 複製源代碼
COPY . .

# 手動構建
RUN npm run build
```

這樣的好處：
- ✅ 不影響本地開發（postinstall 仍然有效）
- ✅ Docker 構建順序正確
- ✅ 明確控制構建流程

---

## 預期結果

修復後應該能夠：
1. ✅ Docker 構建成功
2. ✅ TypeScript 編譯正常
3. ✅ 不影響本地開發

請修復 Dockerfile，確保構建順序正確。

---

## 📝 使用說明

1. 複製上面的內容
2. 發送給 Claude AI
3. 如果需要，可以附加 `backend/Dockerfile` 和 `backend/package.json`
4. Claude AI 會提供修復後的 Dockerfile
