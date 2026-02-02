# 📋 發送給 Claude AI 的修復 Prompt

## 🎯 直接複製以下內容發送給 Claude AI：

---

我有一個 Node.js + TypeScript + Express 後端項目，在 Railway 部署時遇到 TypeScript 編譯錯誤和 Docker 構建問題，請幫我修復。

### 問題 1：TypeScript 編譯錯誤

構建時出現以下錯誤：

1. **未使用的變量**：
   - `src/index.ts(88,18)`: 'req' is declared but its value is never read
   - `src/index.ts(110,10)`: 'req' is declared but its value is never read  
   - `src/middleware/auth.ts(45,3)`: 'res' is declared but its value is never read

2. **函數返回值**（多個路由文件）：
   - `src/routes/applications.ts`: Not all code paths return a value (多處)
   - `src/routes/auth.ts`: Not all code paths return a value (多處)
   - `src/routes/foodBoxes.ts`: Not all code paths return a value (多處)
   - `src/routes/notifications.ts`: Not all code paths return a value

3. **JWT Sign 類型錯誤**：
   - `src/routes/auth.ts(67,23)` 和 `(108,23)`: No overload matches this call

### 問題 2：Docker 構建錯誤

Dockerfile 使用 `npm ci` 但缺少 `package-lock.json`：
```
npm error The `npm ci` command can only install with an existing package-lock.json
```

---

## 修復要求

### 1. TypeScript 錯誤修復

**未使用的變量**：
- 將未使用的參數改為 `_req`, `_res` 等（以下劃線開頭）

**函數返回值**：
- 所有 Express 路由處理函數添加 `Promise<void>` 返回類型
- 確保所有代碼路徑都有明確的 `return` 語句
- 將 `return res.status(...).json(...)` 改為：
  ```typescript
  res.status(...).json(...);
  return;
  ```

**JWT Sign 錯誤**：
- 添加 JWT_SECRET 檢查
- 使用類型斷言：
  ```typescript
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ error: '服務器配置錯誤' });
    return;
  }
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    jwtSecret,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as string }
  );
  ```

### 2. Dockerfile 修復

**選項 A（推薦）**：生成 `package-lock.json` 並保持使用 `npm ci`

**選項 B（臨時）**：將 `npm ci` 改為 `npm install`

---

## 項目結構

```
backend/
├── src/
│   ├── index.ts
│   ├── middleware/auth.ts
│   └── routes/
│       ├── auth.ts
│       ├── applications.ts
│       ├── foodBoxes.ts
│       └── notifications.ts
├── Dockerfile
├── package.json
└── tsconfig.json
```

tsconfig.json 啟用了 `strict: true`, `noUnusedParameters: true`, `noImplicitReturns: true`

---

## 預期結果

修復後應該：
1. ✅ `npm run build` 成功，無 TypeScript 錯誤
2. ✅ Docker 構建成功
3. ✅ 所有路由函數都有 `Promise<void>` 返回類型
4. ✅ 沒有未使用的變量警告

請掃描代碼並修復所有問題，提供修復後的完整代碼。

---

## 📝 使用說明

1. 複製上面的內容
2. 發送給 Claude AI
3. 如果需要，可以附加相關源代碼文件
4. Claude AI 會提供修復後的代碼
