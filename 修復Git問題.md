# 🔧 修復 Git 問題並推送

## ❌ 遇到的問題

1. **Git 用戶信息未設置**
2. **提交失敗**（`nul` 文件問題）

---

## ✅ 解決方案

### 方法 1：運行修復腳本（推薦）

在 Cursor 終端中執行：

```cmd
.\修復並推送.bat
```

這會自動：
- 設置 Git 用戶信息
- 修復 .gitignore
- 移除問題文件
- 重新提交
- 推送到 GitHub

---

### 方法 2：手動執行命令

#### 步驟 1：設置 Git 用戶信息

```bash
git config user.name "galaxysteven111"
git config user.email "galaxysteven111@users.noreply.github.com"
```

#### 步驟 2：修復 .gitignore

`.gitignore` 已經更新，添加了 `nul` 到忽略列表。

#### 步驟 3：移除問題文件並重新提交

```bash
# 移除 nul 文件（如果存在）
git rm --cached nul 2>nul
if exist nul del nul

# 重新添加文件
git add .

# 提交
git commit -m "初始提交：捐飯盒平台"

# 設置分支
git branch -M main

# 推送
git push -u origin main
```

---

## 🔐 如果推送時要求認證

### 使用 Personal Access Token

1. **訪問**：https://github.com/settings/tokens
2. **點擊** "Generate new token (classic)"
3. **設置**：
   - Note: `Deploy Token`
   - Expiration: `90 days`
   - **勾選** `repo` 權限
4. **點擊** "Generate token"
5. **複製 token**（只顯示一次！）
6. **推送時**：
   - Username: `galaxysteven111`
   - Password: **使用 token**（不是 GitHub 密碼）

---

## ✅ 推送成功的標誌

推送成功後，訪問 https://github.com/galaxysteven111/backend，你會看到：
- ✅ 文件列表
- ✅ 提交歷史
- ✅ 不再是空倉庫

---

## 🎯 下一步

推送成功後：
1. 訪問 https://railway.app
2. 使用 GitHub 登錄
3. 選擇 "Deploy from GitHub repo"
4. 選擇 `galaxysteven111/backend`
5. 設置 Root Directory = `.`（因為整個項目在倉庫根目錄）

---

**現在運行修復腳本：`.\修復並推送.bat`** 🚀
