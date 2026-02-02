# 設置指南

## 前置要求

- Node.js 18+ 
- PostgreSQL 14+
- npm 或 yarn

## 安裝步驟

### 1. 安裝所有依賴

```bash
npm run install:all
```

或者分別安裝：

```bash
# 根目錄
npm install

# 後端
cd backend
npm install

# 前端
cd ../frontend
npm install
```

### 2. 設置數據庫

1. 創建 PostgreSQL 數據庫：
```sql
CREATE DATABASE foodbox_db;
```

2. 配置環境變數：
```bash
# 複製環境變數範例文件
cp .env.example .env

# 編輯 .env 文件，填入你的數據庫連接信息
DATABASE_URL=postgresql://username:password@localhost:5432/foodbox_db
```

### 3. 運行數據庫遷移

```bash
cd backend
npm run db:migrate
```

### 4. 啟動開發服務器

#### 選項 1：同時啟動前後端（推薦）

在根目錄運行：
```bash
npm run dev
```

#### 選項 2：分別啟動

終端 1 - 後端：
```bash
npm run dev:backend
```

終端 2 - 前端：
```bash
npm run dev:frontend
```

### 5. 訪問應用

- 前端：http://localhost:3000
- 後端 API：http://localhost:3001
- API 健康檢查：http://localhost:3001/health

## 環境變數說明

### 後端環境變數

- `BACKEND_PORT`: 後端服務器端口（默認：3001）
- `DATABASE_URL`: PostgreSQL 數據庫連接字符串
- `JWT_SECRET`: JWT 令牌密鑰（生產環境請使用強密鑰）
- `JWT_EXPIRES_IN`: JWT 過期時間（默認：7d）
- `FRONTEND_URL`: 前端 URL（用於 CORS，默認：http://localhost:3000）

### 前端環境變數

在 `frontend/.env` 中設置：
- `VITE_API_URL`: 後端 API URL（默認：/api）

## 數據庫結構

平台包含以下主要表：

1. **users** - 用戶表
2. **food_boxes** - 飯盒表
3. **applications** - 申請表
4. **messages** - 消息表
5. **ratings** - 評價表

## 開發提示

- 後端使用 TypeScript + Express
- 前端使用 React + TypeScript + Vite
- 數據庫遷移使用 Knex.js
- 狀態管理使用 Zustand
- API 請求使用 Axios + React Query

## 常見問題

### 數據庫連接失敗

確保 PostgreSQL 服務正在運行，並且 `.env` 文件中的數據庫連接信息正確。

### 端口已被占用

修改 `.env` 文件中的 `BACKEND_PORT` 或 `frontend/vite.config.ts` 中的端口配置。

### 遷移失敗

確保數據庫已創建，並且用戶有足夠的權限。

## 下一步

1. 註冊一個帳號
2. 發布你的第一個飯盒
3. 或瀏覽可用的飯盒並申請
