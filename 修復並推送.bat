@echo off
chcp 65001 >nul
echo 🚀 修復 Git 配置並推送代碼...
echo.

echo 步驟 1: 設置 Git 用戶信息...
git config user.name "galaxysteven111"
git config user.email "galaxysteven111@users.noreply.github.com"
echo ✅ Git 用戶信息已設置

echo.
echo 步驟 2: 檢查並修復 .gitignore...
if not exist .gitignore (
    echo 創建 .gitignore...
    echo nul > .gitignore
    echo node_modules/ >> .gitignore
    echo .env >> .gitignore
    echo dist/ >> .gitignore
)

echo.
echo 步驟 3: 移除問題文件...
git rm --cached nul 2>nul
if exist nul del nul 2>nul

echo.
echo 步驟 4: 添加文件...
git add .
echo ✅ 文件已添加

echo.
echo 步驟 5: 提交代碼...
git commit -m "初始提交：捐飯盒平台"
if %errorlevel% neq 0 (
    echo ⚠️  提交失敗，檢查錯誤...
    git status
    pause
    exit /b 1
)
echo ✅ 代碼已提交

echo.
echo 步驟 6: 設置分支...
git branch -M main

echo.
echo 步驟 7: 推送到 GitHub...
echo ⚠️  如果遇到認證問題，請使用 Personal Access Token
echo    訪問: https://github.com/settings/tokens
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅✅✅ 推送成功！✅✅✅
    echo.
    echo 訪問 https://github.com/galaxysteven111/backend 確認
    echo.
    echo 下一步：在 Railway 部署
    echo 1. 訪問 https://railway.app
    echo 2. 使用 GitHub 登錄
    echo 3. 選擇 "Deploy from GitHub repo"
    echo 4. 選擇 galaxysteven111/backend
) else (
    echo.
    echo ❌ 推送失敗
    echo.
    echo 請使用 Personal Access Token:
    echo https://github.com/settings/tokens
)

echo.
pause
