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

### Railway PostgreSQL 自動變量（PG*）

當你在 Railway 中添加 PostgreSQL 插件並連接到後端服務時，Railway 會自動注入以下變量：

| 變量名 | 說明 | 由 Railway 自動設置 |
|--------|------|---------------------|
| `PGUSER` | PostgreSQL 用戶名 | ✅ |
| `PGPASSWORD` | PostgreSQL 密碼 | ✅ |
| `PGHOST` | PostgreSQL 主機地址 | ✅ |
| `PGPORT` | PostgreSQL 端口 | ✅ |
| `PGDATABASE` | PostgreSQL 數據庫名 | ✅ |
| `POSTGRES_PASSWORD` | PostgreSQL 密碼（備用） | ✅ |
| `RAILWAY_PRIVATE_DOMAIN` | Railway 內部域名 | ✅ |

> **重要**：後端的 `env.ts` 會自動偵測這些變量。如果 `DATABASE_URL` 缺失或包含未解析的模板（`${{...}}`），系統會自動從 PG* 變量構建連接字符串。

### 數據庫連接優先級

系統按以下優先級解析數據庫連接：

1. **`DATABASE_URL`**（如果是有效的 `postgresql://` URL 且不含 `${{` 模板）
2. **PG* 變量自動構建**（`PGUSER` + `PGPASSWORD` + `PGHOST` + `PGDATABASE`）
3. **DB_* 變量回退**（`DB_USER` + `DB_PASSWORD` + `DB_HOST` + `DB_NAME`）

生產環境推薦使用方式 1 或方式 2（Railway 自動設置）。

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

**手動設置的變量**（在 Railway Dashboard → 後端服務 → Variables）：
- `JWT_SECRET` — 必需，至少 32 字符的隨機密鑰
- `FRONTEND_URL` — 前端部署地址（如 `https://your-app.netlify.app`）
- `NODE_ENV` — 設為 `production`

**自動設置的變量**（連接 PostgreSQL 插件後自動注入）：
- `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGPORT`, `PGDATABASE`
- 或者手動設置 `DATABASE_URL`（二選一）

> 詳細的 Railway 部署步驟請參考 `RAILWAY_DEPLOY.md`

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
