@echo off
chcp 65001 >nul
echo 🔧 生成 package-lock.json...
echo.

cd backend

echo 步驟 1: 安裝依賴並生成 package-lock.json...
call npm install

if %errorlevel% equ 0 (
    echo.
    echo ✅ package-lock.json 已生成！
    echo.
    echo 現在可以推送代碼了：
    echo   git add backend/package-lock.json
    echo   git commit -m "添加 package-lock.json"
    echo   git push
) else (
    echo.
    echo ❌ 生成失敗
    echo 請檢查錯誤訊息
)

echo.
pause
