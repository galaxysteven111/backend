# 捐飯盒平台 - FoodBox Donation Platform

一個專為香港設計的飯盒捐贈平台，連接願意分享食物的捐贈者與需要幫助的人。

## 功能特色

- 🍱 **飯盒捐贈**：捐贈者可以發布可用的飯盒信息
- 📍 **地理位置**：基於香港地區的精確位置匹配
- ⏰ **時間管理**：顯示飯盒的有效期和取餐時間
- 🤝 **智能配對**：自動匹配附近的捐贈者和需求者
- 💬 **即時溝通**：內建消息系統方便聯繫
- ⭐ **評價系統**：建立信任和社區評分

## 技術棧

### 前端
- React 18 + TypeScript
- Tailwind CSS（現代化UI設計）
- React Router（路由管理）
- React Query（數據獲取）
- Leaflet/Mapbox（地圖顯示）

### 後端
- Node.js + Express + TypeScript
- PostgreSQL（數據庫）
- JWT（身份驗證）
- Socket.io（即時通訊）

## 專案結構

```
捐飯盒公司/
├── frontend/          # React前端應用
├── backend/           # Express後端API
├── database/          # 數據庫遷移和種子文件
└── docs/              # 文檔
```

## 開始使用

### 環境要求
- Node.js 18+
- PostgreSQL 14+
- npm 或 yarn

### 安裝步驟

1. 安裝依賴
```bash
npm run install:all
```

2. 設置環境變數
```bash
cp .env.example .env
# 編輯 .env 文件填入你的配置
```

3. 運行數據庫遷移
```bash
npm run db:migrate
```

4. 啟動開發服務器
```bash
# 同時啟動前後端（推薦）
npm run dev

# 或分別啟動
npm run dev:backend  # 後端
npm run dev:frontend # 前端
```

### 手機 H5 測試

1. **確保手機和電腦在同一 WiFi**
2. **查找電腦 IP 地址**
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. **在手機瀏覽器訪問**
   ```
   http://你的IP地址:3000
   例如：http://192.168.1.100:3000
   ```

詳細測試指南請查看 [TESTING.md](./TESTING.md)

## 開發計劃

- [x] 專案初始化
- [ ] 用戶認證系統
- [ ] 捐贈發布功能
- [ ] 申請和配對系統
- [ ] 地圖整合
- [ ] 消息系統
- [ ] 評價功能

## 授權

MIT License
