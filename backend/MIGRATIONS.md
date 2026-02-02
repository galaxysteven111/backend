# 數據庫遷移指南

## 遷移文件列表

| 序號 | 文件 | 說明 |
|------|------|------|
| 001 | `001_create_users.ts` | 用戶表 |
| 002 | `002_create_food_boxes.ts` | 飯盒表（含地理位置索引） |
| 003 | `003_create_applications.ts` | 申請表（含唯一約束） |
| 004 | `004_create_messages.ts` | 消息表 |
| 005 | `005_create_ratings.ts` | 評分表 |
| 006 | `006_create_notifications.ts` | 通知表 |
| 007 | `007_add_performance_indexes.ts` | 性能優化索引 |

## 運行遷移

### 本地開發

```bash
cd backend
npm run db:migrate
```

### 生產環境

```bash
# 方法 1：使用遷移腳本
DATABASE_URL=postgresql://... node scripts/migrate.js

# 方法 2：使用 npm script
DATABASE_URL=postgresql://... npm run migrate:prod

# 方法 3：直接使用 knex
NODE_ENV=production npx knex migrate:latest --knexfile knexfile.ts
```

### 部署平台自動遷移

在 Railway/Render 的部署命令中添加：
```
npm run migrate:prod && npm start
```

## 回滾

```bash
# 回滾最近一批遷移
npm run db:rollback

# 生產環境回滾（謹慎操作）
NODE_ENV=production DATABASE_URL=postgresql://... npx knex migrate:rollback --knexfile knexfile.ts
```

## 查看遷移狀態

```bash
npx knex migrate:status --knexfile knexfile.ts
```

## 創建新遷移

```bash
npx knex migrate:make migration_name --knexfile knexfile.ts
```

## 注意事項

- 遷移按照文件名順序執行
- 已執行的遷移不會重複執行
- 回滾會按照相反順序執行
- 生產環境回滾前請先備份數據庫
- 遷移文件一旦提交到生產環境，不應修改已有遷移
