@echo off
chcp 65001 >nul
echo 🚀 開始推送代碼到 GitHub...
echo.

echo 步驟 1: 檢查 Git 狀態...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo 初始化 Git...
    git init
    git add .
    git commit -m "初始提交：捐飯盒平台"
    echo ✅ Git 已初始化
) else (
    echo ✅ Git 已初始化
)

echo.
echo 步驟 2: 檢查遠程倉庫...
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo 添加遠程倉庫...
    git remote add origin https://github.com/galaxysteven111/backend.git
    echo ✅ 遠程倉庫已添加
) else (
    echo ✅ 遠程倉庫已存在
    git remote set-url origin https://github.com/galaxysteven111/backend.git
)

echo.
echo 步驟 3: 設置分支...
git branch -M main

echo.
echo 步驟 4: 推送到 GitHub...
echo ⚠️  如果遇到認證問題，請使用 Personal Access Token
echo    訪問: https://github.com/settings/tokens
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ 推送成功！
    echo.
    echo 下一步：
    echo 1. 訪問 https://github.com/galaxysteven111/backend 確認
    echo 2. 訪問 https://railway.app 部署
) else (
    echo.
    echo ❌ 推送失敗
    echo.
    echo 可能的原因：
    echo 1. 認證失敗 - 請使用 Personal Access Token
    echo 2. 網絡問題 - 請檢查網絡連接
    echo.
    echo 獲取 Personal Access Token:
    echo https://github.com/settings/tokens
)

echo.
pause
