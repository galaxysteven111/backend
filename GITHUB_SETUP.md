# GitHub 設置指南（快速）

## 🎯 目標
將本地代碼推送到 GitHub，以便在 Railway 等平台部署。

---

## ⚡ 快速步驟

### 1. 創建 GitHub 帳號（如果還沒有）

1. 訪問 https://github.com
2. 點擊 "Sign up"
3. 完成註冊（免費）

### 2. 安裝 Git（如果還沒有）

**Windows**:
- 下載：https://git-scm.com/download/win
- 安裝時選擇默認選項

**macOS**:
```bash
# 使用 Homebrew
brew install git

# 或使用 Xcode Command Line Tools
xcode-select --install
```

**Linux**:
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # CentOS/RHEL
```

### 3. 配置 Git（首次使用）

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 4. 初始化 Git 倉庫

```bash
# 在項目根目錄（捐飯盒公司）
cd "c:\Users\Galaxy\OneDrive\桌面\捐飯盒公司"

# 初始化 Git
git init

# 檢查 .gitignore 是否存在
# 如果沒有，我會幫你創建一個
```

### 5. 創建 GitHub 倉庫

1. **訪問 GitHub**
   - https://github.com
   - 登錄

2. **創建新倉庫**
   - 點擊右上角 "+" → "New repository"
   - Repository name: `foodbox-platform`（或你喜歡的名稱）
   - Description: `香港捐飯盒平台`
   - 選擇 Public 或 Private
   - **不要**勾選 "Initialize this repository with a README"
   - 點擊 "Create repository"

3. **記下倉庫 URL**
   - 例如：`https://github.com/your-username/foodbox-platform.git`

### 6. 連接並推送

```bash
# 在項目根目錄

# 添加所有文件
git add .

# 提交
git commit -m "初始提交：捐飯盒平台"

# 添加遠程倉庫
git remote add origin https://github.com/your-username/foodbox-platform.git

# 推送到 GitHub
git push -u origin main
```

**如果遇到認證問題**：

#### 選項 A：使用 Personal Access Token（推薦）

1. **創建 Token**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - 點擊 "Generate new token"
   - 選擇 "repo" 權限
   - 複製生成的 token

2. **使用 Token**
   ```bash
   # 當提示輸入密碼時，使用 token 而不是密碼
   git push -u origin main
   ```

#### 選項 B：使用 SSH（更安全）

1. **生成 SSH key**
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   # 按 Enter 使用默認路徑
   # 設置密碼（可選）
   ```

2. **添加 SSH key 到 GitHub**
   - 複製公鑰：`cat ~/.ssh/id_ed25519.pub`（macOS/Linux）或查看文件（Windows）
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - 粘貼公鑰並保存

3. **使用 SSH URL**
   ```bash
   git remote set-url origin git@github.com:your-username/foodbox-platform.git
   git push -u origin main
   ```

---

## ✅ 驗證

推送成功後：

1. **訪問 GitHub 倉庫**
   - 應該能看到所有文件

2. **檢查文件**
   - 確認 `.env` 等敏感文件沒有被提交（應該在 `.gitignore` 中）

---

## 🔒 安全檢查

### 確保敏感文件不被提交

檢查 `.gitignore` 是否包含：
```
.env
.env.local
node_modules/
dist/
uploads/
```

如果沒有，我會幫你更新。

---

## 🚀 下一步

推送成功後：

1. **訪問 Railway**
   - https://railway.app
   - 使用 GitHub 登錄

2. **部署後端**
   - 按照 `QUICK_DEPLOY_BACKEND.md` 的步驟

---

## 🆘 常見問題

### 問題 1：認證失敗

**解決**：使用 Personal Access Token 或 SSH key

### 問題 2：推送被拒絕

**解決**：
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 問題 3：文件太大

**解決**：檢查 `.gitignore`，確保 `node_modules/` 和 `dist/` 被忽略

---

**準備好了嗎？按照步驟操作即可！** 🎉
