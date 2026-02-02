# 部署檢查清單

## 部署前準備

### 環境變量
- [ ] `JWT_SECRET` 已設置（至少32字符的隨機字符串）
- [ ] `DATABASE_URL` 已設置（PostgreSQL 連接字符串）
- [ ] `FRONTEND_URL` 已設置（前端域名，支持逗號分隔多個）
- [ ] `NODE_ENV` 設置為 `production`
- [ ] 前端 `VITE_API_URL` 指向正確的後端地址

### 數據庫
- [ ] PostgreSQL 實例已創建
- [ ] 數據庫遷移已運行（`npm run migrate:prod`）
- [ ] 數據庫連接正常（檢查 `/health` 端點）

### 構建測試
- [ ] 後端 `npm run build` 成功（TypeScript 編譯無錯誤）
- [ ] 前端 `npm run build` 成功（Vite 構建無錯誤）

## 部署後驗證

### API 測試
- [ ] `GET /health` 返回 `{"status":"ok","database":{"connected":true}}`
- [ ] `GET /api` 返回歡迎訊息
- [ ] `POST /api/auth/register` 可以註冊新用戶
- [ ] `POST /api/auth/login` 可以登入
- [ ] `GET /api/food-boxes` 返回飯盒列表

### 功能測試
- [ ] 用戶可以註冊和登入
- [ ] 可以創建飯盒（含圖片上傳）
- [ ] 可以搜索和篩選飯盒
- [ ] 地圖顯示正常
- [ ] 可以申請飯盒
- [ ] 通知系統正常

### 安全檢查
- [ ] HTTPS 已啟用
- [ ] CORS 僅允許指定域名
- [ ] API 速率限制生效
- [ ] 安全頭正確設置（檢查 X-Frame-Options, Content-Security-Policy 等）
- [ ] JWT_SECRET 不是默認值

### 性能檢查
- [ ] Gzip 壓縮已啟用（檢查響應頭 Content-Encoding: gzip）
- [ ] 靜態資源有緩存頭（上傳圖片 Cache-Control: 7d）
- [ ] 前端代碼已分包（vendor-react, vendor-query, vendor-map）

## 常見問題

### 數據庫連接失敗
1. 檢查 `DATABASE_URL` 格式
2. 確認數據庫實例是否運行中
3. 檢查網絡/防火牆設置

### 前端無法連接 API
1. 檢查 `VITE_API_URL` 是否正確
2. 檢查 CORS 中 `FRONTEND_URL` 是否包含前端域名
3. 確認後端服務是否運行中

### 圖片上傳失敗
1. 確認 `uploads` 目錄存在且有寫入權限
2. 檢查文件大小限制（5MB）
3. 確認磁盤空間充足
