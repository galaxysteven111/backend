# 快速開始

## 5 分鐘快速啟動

### 1. 安裝依賴
```bash
npm run install:all
```

### 2. 設置數據庫
```bash
# 創建數據庫（在 PostgreSQL 中）
createdb foodbox_db

# 或使用 SQL
psql -U postgres
CREATE DATABASE foodbox_db;
```

### 3. 配置環境變數
```bash
# 複製並編輯 .env 文件
cp .env.example .env
# 編輯 .env，填入數據庫連接信息
```

### 4. 運行遷移
```bash
cd backend
npm run db:migrate
cd ..
```

### 5. 啟動應用
```bash
npm run dev
```

訪問 http://localhost:3000 開始使用！

## 測試帳號

註冊一個新帳號，或使用以下測試數據：

1. 註冊為「捐贈者」
2. 發布一個飯盒
3. 註冊另一個帳號為「接收者」
4. 申請飯盒
5. 以捐贈者身份批准申請

## 功能清單

✅ 用戶註冊和登錄
✅ 發布飯盒
✅ 瀏覽飯盒列表
✅ 申請飯盒
✅ 查看我的申請
✅ 個人資料頁面

## 待實現功能

- [ ] 地圖顯示（整合 Leaflet/Mapbox）
- [ ] 即時消息系統
- [ ] 評價系統
- [ ] 圖片上傳
- [ ] 郵件通知
- [ ] 管理員面板
