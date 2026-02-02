# Claude AI 修復 Docker 構建順序錯誤 Prompt

請將以下內容發送給 Claude AI：

---

## 任務：修復 Docker 構建順序錯誤

我有一個 Node.js + TypeScript + Express 後端項目，在 Docker 構建時遇到構建順序問題。

### 錯誤訊息

```
error TS18003: No inputs were found in config file '/app/tsconfig.json'. 
Specified 'include' paths were '["src/**/*"]' and 'exclude' paths were '["node_modules","dist"]'.

npm error code 2
npm error path /app
npm error command failed
npm error command sh -c npm run build
```

### 問題分析

Dockerfile 的構建順序有問題：

1. **第 7 行**：複製 `package*.json` 和 `tsconfig.json`
2. **第 11 行**：運行 `npm install` 
   - 這會觸發 `postinstall` 腳本
   - `postinstall` 腳本執行 `npm run build`
   - 但此時 `src/` 目錄還沒有被複製！
3. **第 14 行**：才複製源代碼 `COPY . .`

所以 TypeScript 編譯器找不到源文件，因為 `src/` 目錄還不存在。

### 當前 Dockerfile

```dockerfile
# 多階段構建 Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# 複製 package 文件
COPY package*.json ./
COPY tsconfig.json ./

# 安裝依賴
RUN npm install          # ← 這裡觸發 postinstall，但 src/ 還不存在

# 複製源代碼
COPY . .                 # ← src/ 在這裡才被複製

# 構建 TypeScript
RUN npm run build
```

### 當前 package.json

```json
{
  "scripts": {
    "postinstall": "npm run build"  // ← 這個在 npm install 時自動執行
  }
}
```

---

## 修復要求

### 方案 1：修改 Dockerfile 順序（推薦）

**選項 A**：先複製源代碼，再安裝依賴
```dockerfile
# 複製所有文件（包括源代碼）
COPY . .

# 安裝依賴（此時 src/ 已存在，postinstall 可以正常運行）
RUN npm install

# 構建 TypeScript（如果 postinstall 已經構建了，這步可以省略）
RUN npm run build
```

**選項 B**：跳過 postinstall 腳本
```dockerfile
# 複製 package 文件
COPY package*.json ./
COPY tsconfig.json ./

# 安裝依賴（跳過 postinstall）
RUN npm install --ignore-scripts

# 複製源代碼
COPY . .

# 手動構建
RUN npm run build
```

### 方案 2：修改 package.json（不推薦）

移除 `postinstall` 腳本，但這會影響本地開發體驗。

---

## 推薦解決方案

**使用方案 1 的選項 B**：
- 在 Docker 構建時使用 `npm install --ignore-scripts` 跳過 postinstall
- 然後複製源代碼
- 最後手動運行 `npm run build`

這樣的好處：
- ✅ 不影響本地開發（postinstall 仍然有效）
- ✅ Docker 構建順序正確
- ✅ 明確控制構建流程

---

## 項目結構

```
backend/
├── src/                    # TypeScript 源代碼
│   ├── index.ts
│   ├── config/
│   ├── middleware/
│   └── routes/
├── Dockerfile
├── package.json
└── tsconfig.json
```

---

## 預期結果

修復後應該能夠：
1. ✅ Docker 構建成功
2. ✅ TypeScript 編譯正常（在源代碼複製後）
3. ✅ 不影響本地開發體驗
4. ✅ 構建順序正確

---

## 注意事項

- 保持 Dockerfile 的多階段構建結構
- 確保生產階段也正確配置
- 不要破壞本地開發流程
- 確保構建緩存優化（先複製 package.json，再安裝依賴）

請修復 Dockerfile，確保構建順序正確，並提供修復後的完整 Dockerfile。
