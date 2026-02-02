# ✅ 部署前準備檢查清單

## 📋 快速檢查清單

### 1. 代碼準備 ✅
- [ ] 代碼已提交到 Git
- [ ] 已推送到 GitHub/GitLab/Bitbucket
- [ ] `.gitignore` 正確配置
- [ ] 敏感文件沒有被提交

### 2. 環境變量準備 🔐
- [ ] JWT_SECRET 已生成
- [ ] 記錄了所有環境變量值
- [ ] 準備好設置環境變量的地方

**生成 JWT_SECRET**：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. 數據庫準備 🗄️
- [ ] 所有遷移文件存在（001-007）
- [ ] 遷移腳本 `backend/scripts/migrate.js` 存在
- [ ] `package.json` 中有 `migrate:prod` 腳本

### 4. 配置文件檢查 🔧
- [ ] `backend/package.json` 正確
- [ ] `backend/Procfile` 存在
- [ ] `backend/railway.json` 存在（如果使用 Railway）
- [ ] `netlify.toml` 存在
- [ ] `frontend/vite.config.ts` 正確

### 5. 本地測試 🧪
- [ ] 後端可以正常構建：`cd backend && npm run build`
- [ ] 前端可以正常構建：`cd frontend && npm run build`
- [ ] 沒有構建錯誤

### 6. 平台帳號 🌐
- [ ] Railway/Render/Fly.io 帳號已創建
- [ ] Netlify 帳號已創建
- [ ] GitHub/GitLab/Bitbucket 帳號已創建

### 7. 文檔準備 📝
- [ ] 已閱讀 `DEPLOYMENT_CHECKLIST.md`
- [ ] 已閱讀 `ENV_VARIABLES.md`
- [ ] 已閱讀 `QUICK_DEPLOY_BACKEND.md`
- [ ] 已閱讀 `QUICK_DEPLOY_NETLIFY.md`

---

## 🎯 準備完成標準

當所有項目都打勾 ✅ 後，你就可以開始部署了！

---

## 📝 重要信息記錄

**部署前記錄這些信息**：

```
JWT_SECRET: [生成後填寫]
GitHub 倉庫: [你的倉庫 URL]
後端平台: Railway / Render / Fly.io
前端平台: Netlify
```

**部署後記錄這些信息**：

```
後端 API URL: [部署後填寫]
前端網站 URL: [部署後填寫]
```

---

## 🚀 下一步

準備完成後：

1. **部署後端** - 查看 `QUICK_DEPLOY_BACKEND.md`
2. **部署前端** - 查看 `QUICK_DEPLOY_NETLIFY.md`
3. **測試驗證** - 查看 `DEPLOYMENT_CHECKLIST.md`

---

**準備好了嗎？開始部署！** 🎉
