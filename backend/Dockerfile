# 多階段構建 Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# 複製 package 文件
COPY package*.json ./
COPY tsconfig.json ./

# 安裝依賴
RUN npm ci

# 複製源代碼
COPY . .

# 構建 TypeScript
RUN npm run build

# 生產階段
FROM node:20-alpine

WORKDIR /app

# 只複製必要的文件
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/knexfile.ts ./
COPY --from=builder /app/migrations ./migrations

# 安裝生產依賴
RUN npm ci --only=production

# 創建上傳目錄
RUN mkdir -p uploads

# 暴露端口
EXPOSE 3001

# 啟動命令
CMD ["npm", "start"]
