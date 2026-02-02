# 給 Claude AI 的專案審查總結

## 📌 專案信息

**專案名稱**：捐飯盒平台（FoodBox Donation Platform）  
**目標**：連接願意分享食物的捐贈者與需要幫助的人  
**地區**：香港  
**技術棧**：React + TypeScript + Node.js + Express + PostgreSQL

## 🎯 審查目標

1. **修復現有 Bug**
2. **實現缺失的核心功能**
3. **改進代碼質量和安全性**
4. **優化用戶體驗**

## 📁 專案結構

```
捐飯盒公司/
├── frontend/              # React 前端
│   ├── src/
│   │   ├── components/   # 組件
│   │   ├── pages/        # 頁面
│   │   ├── lib/          # 工具函數
│   │   └── store/        # 狀態管理
│   └── package.json
├── backend/              # Express 後端
│   ├── src/
│   │   ├── routes/       # API 路由
│   │   ├── middleware/   # 中間件
│   │   └── config/       # 配置
│   ├── migrations/       # 數據庫遷移
│   └── package.json
├── test-page.html        # 靜態 HTML 測試頁
└── index.html            # Netlify 部署用
```

## 🔍 重點審查區域

### 1. 前端核心文件
- `frontend/src/components/BottomNav.tsx` - 底部導覽（已知顯示問題）
- `frontend/src/pages/HomePage.tsx` - 首頁
- `frontend/src/pages/CreateFoodBoxPage.tsx` - 發布頁面
- `frontend/src/lib/api.ts` - API 調用
- `frontend/src/store/authStore.ts` - 認證狀態

### 2. 後端核心文件
- `backend/src/routes/auth.ts` - 認證路由
- `backend/src/routes/foodBoxes.ts` - 飯盒路由
- `backend/src/routes/applications.ts` - 申請路由
- `backend/src/middleware/auth.ts` - 認證中間件

### 3. 數據庫
- `backend/migrations/` - 檢查表結構是否合理
- 索引是否足夠
- 外鍵約束是否正確

## 🐛 已知問題清單

1. **底部導覽列顯示問題**
   - 位置：`frontend/src/components/BottomNav.tsx`
   - 問題：在某些情況下需要滾動才能看到
   - 狀態：已部分修復，需要確認

2. **缺少輸入驗證**
   - 位置：多個表單頁面
   - 問題：前端和後端驗證不夠完善

3. **錯誤處理不完善**
   - 位置：API 調用處
   - 問題：錯誤訊息不夠友好

4. **功能缺失**
   - 地圖顯示
   - 圖片上傳
   - 搜索篩選
   - 通知系統

## 🎨 UI/UX 已知問題

1. 移動端觸控目標大小
2. 字體大小和對比度
3. 加載狀態顯示
4. 空狀態處理

## 🔒 安全性關注點

1. JWT 實現是否安全
2. 密碼加密是否正確
3. SQL 注入防護
4. XSS 防護
5. CSRF 防護
6. 輸入驗證

## 📊 數據庫設計檢查

1. 表結構是否合理
2. 索引是否足夠
3. 外鍵約束
4. 數據完整性

## 🚀 優先實現的功能

1. **地圖整合**（高優先級）
   - 使用 Leaflet 顯示飯盒位置
   - 發布時可以地圖選點
   - 瀏覽時顯示地圖視圖

2. **圖片上傳**（高優先級）
   - 前端：圖片選擇和預覽
   - 後端：multer 處理上傳
   - 存儲：本地或雲存儲

3. **搜索和篩選**（高優先級）
   - 按地區篩選
   - 按距離排序
   - 按時間篩選

4. **通知系統**（中優先級）
   - 申請狀態變更通知
   - 新申請通知
   - 使用 React Query 輪詢或 WebSocket

## 📝 代碼改進建議

1. **組件重用**
   - 提取 FormInput 組件
   - 提取 Card 組件
   - 提取 Button 組件

2. **錯誤處理**
   - 添加 Error Boundary
   - 統一錯誤處理
   - 友好的錯誤訊息

3. **性能優化**
   - 使用 React.memo
   - 使用 useMemo/useCallback
   - 圖片懶加載

4. **類型安全**
   - 完善 TypeScript 類型
   - 定義 API 響應類型
   - 避免 any 類型

## 🧪 測試建議

1. 單元測試（Jest + React Testing Library）
2. API 測試（Supertest）
3. E2E 測試（Playwright/Cypress）

## 📚 文檔需求

1. API 文檔（Swagger）
2. 組件文檔
3. 部署文檔
4. 開發指南

---

## 🎯 審查輸出要求

請提供：

1. **Bug 報告**：列出所有發現的 bug 和修復方案
2. **代碼改進**：重構建議和具體代碼
3. **功能實現**：新功能的完整實現
4. **安全審查**：安全問題和修復建議
5. **性能優化**：優化建議和實現

請開始審查，並提供詳細的改進報告和代碼。
