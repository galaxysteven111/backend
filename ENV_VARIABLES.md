# 環境變量說明 Environment Variables

## 後端 (Backend)

### 必需變量

| 變量名 | 說明 | 示例值 |
|--------|------|--------|
| `JWT_SECRET` | JWT 認證密鑰，至少32字符 | `your-super-secret-key-at-least-32-chars` |
| `DATABASE_URL` | PostgreSQL 連接字符串（生產環境必需） | `postgresql://user:pass@host:5432/foodbox_db` |

### 可選變量

| 變量名 | 說明 | 默認值 |
|--------|------|--------|
| `NODE_ENV` | 運行環境 | `development` |
| `PORT` | 服務器端口 | `3001` |
| `BACKEND_PORT` | 服務器端口（PORT 優先） | `3001` |
| `FRONTEND_URL` | 前端域名，支持逗號分隔多個 | `http://localhost:3000` |
| `DB_HOST` | 數據庫主機（無 DATABASE_URL 時使用） | `localhost` |
| `DB_PORT` | 數據庫端口 | `5432` |
| `DB_USER` | 數據庫用戶名 | `postgres` |
| `DB_PASSWORD` | 數據庫密碼 | *(空)* |
| `DB_NAME` | 數據庫名稱 | `foodbox_db` |

### 數據庫連接

生產環境使用 `DATABASE_URL`：
```
DATABASE_URL=postgresql://username:password@hostname:5432/foodbox_db
```

本地開發可以用個別變量：
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=foodbox_db
```

## 前端 (Frontend)

| 變量名 | 說明 | 示例值 |
|--------|------|--------|
| `VITE_API_URL` | 後端 API 地址 | `https://api.example.com/api` |

> 前端變量必須以 `VITE_` 開頭才能在代碼中使用。

## 設置方法

### 本地開發

1. 複製範例文件：
```bash
cp backend/.env.example backend/.env
```

2. 編輯 `.env` 填入實際值。

### Railway

在 Railway Dashboard → 項目 → Variables 中設置：
- `JWT_SECRET`
- `DATABASE_URL`（Railway PostgreSQL 插件會自動設置）
- `FRONTEND_URL`

### Render

在 Render Dashboard → Service → Environment 中設置：
- `JWT_SECRET`
- `DATABASE_URL`（Render PostgreSQL 會自動設置）
- `FRONTEND_URL`

### Netlify (前端)

在 Netlify Dashboard → Site → Environment Variables 中設置：
- `VITE_API_URL`

## .env.example

```env
# 後端環境變量
NODE_ENV=development
PORT=3001

# JWT 密鑰（生產環境請使用隨機生成的強密鑰）
JWT_SECRET=change-this-to-a-random-secret-key

# 數據庫（使用 DATABASE_URL 或個別變量）
DATABASE_URL=postgresql://postgres:password@localhost:5432/foodbox_db

# 前端地址（CORS）
FRONTEND_URL=http://localhost:3000
```
