# Claude AI 修復 TypeScript 和 Docker 構建錯誤 Prompt

請將以下內容發送給 Claude AI：

---

## 任務：修復 TypeScript 編譯錯誤和 Docker 構建問題

我有一個 Node.js + TypeScript + Express 後端項目，在 Railway 部署時遇到以下問題：

### 問題 1：TypeScript 編譯錯誤

構建時出現多個 TypeScript 錯誤：

1. **未使用的變量錯誤**：
   - `src/index.ts(88,18)`: 'req' is declared but its value is never read
   - `src/index.ts(110,10)`: 'req' is declared but its value is never read
   - `src/middleware/auth.ts(45,3)`: 'res' is declared but its value is never read

2. **函數返回值錯誤**：
   - `src/routes/applications.ts(16,32)`: Not all code paths return a value
   - `src/routes/applications.ts(113,55)`: Not all code paths return a value
   - `src/routes/applications.ts(142,36)`: Not all code paths return a value
   - `src/routes/auth.ts(33,26)`: Not all code paths return a value
   - `src/routes/auth.ts(85,23)`: Not all code paths return a value
   - `src/routes/auth.ts(132,33)`: Not all code paths return a value
   - `src/routes/foodBoxes.ts(142,34)`: Not all code paths return a value
   - `src/routes/foodBoxes.ts(181,32)`: Not all code paths return a value
   - `src/routes/foodBoxes.ts(219,36)`: Not all code paths return a value
   - `src/routes/foodBoxes.ts(258,37)`: Not all code paths return a value
   - `src/routes/foodBoxes.ts(277,68)`: Not all code paths return a value
   - `src/routes/notifications.ts(40,41)`: Not all code paths return a value

3. **JWT Sign 類型錯誤**：
   - `src/routes/auth.ts(67,23)`: No overload matches this call
   - `src/routes/auth.ts(108,23)`: No overload matches this call

### 問題 2：Docker 構建錯誤

Dockerfile 使用 `npm ci` 但缺少 `package-lock.json` 文件：
```
npm error The `npm ci` command can only install with an existing package-lock.json
```

---

## 修復要求

### 1. 修復 TypeScript 錯誤

**未使用的變量**：
- 將未使用的參數改為以下劃線開頭（如 `_req`, `_res`）
- 或者添加 TypeScript 註釋 `// eslint-disable-next-line @typescript-eslint/no-unused-vars`

**函數返回值**：
- 所有 Express 路由處理函數應該明確返回類型 `Promise<void>`
- 確保所有代碼路徑都有明確的 `return` 語句
- 將所有 `return res.status(...).json(...)` 改為：
  ```typescript
  res.status(...).json(...);
  return;
  ```

**JWT Sign 類型錯誤**：
- 確保 `process.env.JWT_SECRET` 在使用前進行檢查
- 使用類型斷言或類型守衛來確保類型正確
- 示例修復：
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

### 2. 修復 Dockerfile

**選項 A（推薦）**：
- 生成 `package-lock.json` 文件（運行 `npm install`）
- 保持使用 `npm ci`（更快、更可靠）

**選項 B（臨時方案）**：
- 將 Dockerfile 中的 `npm ci` 改為 `npm install`
- 將 `npm ci --only=production` 改為 `npm install --only=production`

---

## 項目結構

```
backend/
├── src/
│   ├── index.ts              # Express 應用入口
│   ├── middleware/
│   │   └── auth.ts           # JWT 認證中間件
│   └── routes/
│       ├── auth.ts           # 認證路由（註冊、登錄）
│       ├── applications.ts   # 申請路由
│       ├── foodBoxes.ts      # 飯盒路由
│       └── notifications.ts  # 通知路由
├── Dockerfile
├── package.json
└── tsconfig.json
```

---

## 代碼上下文

### tsconfig.json 配置
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### Express 路由示例格式
```typescript
router.post('/endpoint', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // 驗證邏輯
    if (!valid) {
      res.status(400).json({ error: '錯誤訊息' });
      return; // 明確返回
    }
    
    // 處理邏輯
    res.json({ data: result });
    return; // 明確返回
  } catch (error: any) {
    console.error('錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
    return; // 明確返回
  }
});
```

---

## 修復步驟

1. **掃描所有路由文件**，確保：
   - 所有路由處理函數都有 `Promise<void>` 返回類型
   - 所有代碼路徑都有明確的 `return` 語句
   - 未使用的參數以下劃線開頭

2. **修復 JWT Sign 調用**：
   - 添加 JWT_SECRET 的檢查
   - 使用正確的類型斷言

3. **修復 Dockerfile**：
   - 生成 `package-lock.json` 或改用 `npm install`

4. **驗證修復**：
   - 運行 `npm run build` 確保沒有 TypeScript 錯誤
   - 確保所有路由函數都有正確的返回類型

---

## 注意事項

- 保持代碼風格一致
- 不要改變業務邏輯
- 確保所有錯誤處理路徑都有明確的返回
- 保持 Express 中間件的正確使用方式
- 確保 JWT 簽名邏輯正確且類型安全

---

## 預期結果

修復後應該能夠：
1. ✅ `npm run build` 成功，無 TypeScript 錯誤
2. ✅ Docker 構建成功
3. ✅ 所有路由函數都有明確的返回類型
4. ✅ 沒有未使用的變量警告
5. ✅ JWT 簽名類型正確

請幫我修復這些問題，並提供修復後的代碼。
