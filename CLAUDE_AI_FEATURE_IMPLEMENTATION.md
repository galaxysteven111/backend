# Claude AI 功能實現 Prompt - 階段 2

## ✅ 階段 1 已完成

安全性修復和 Bug 修復已經完成，包括：
- JWT secret 處理
- Mass assignment 防護
- 輸入驗證（Zod）
- 速率限制
- 底部導覽列修復
- 路由保護
- 錯誤處理改進

---

## 🎯 階段 2：高優先級功能實現

現在請實現以下高優先級功能。這些功能對於平台的完整性和用戶體驗至關重要。

---

## 📍 功能 1：地圖整合（最高優先級）

### 需求
使用 Leaflet 顯示飯盒位置，支持地圖選點和瀏覽。

### 技術要求
- **前端**：使用 `react-leaflet` 和 `leaflet`
- **地圖服務**：使用 OpenStreetMap（免費，無需 API key）
- **功能**：
  1. **發布頁面**：地圖選點功能
     - 點擊地圖選擇位置
     - 顯示選中的經緯度
     - 自動獲取地址（可選，使用反向地理編碼）
  
  2. **飯盒列表頁**：地圖視圖切換
     - 列表視圖 / 地圖視圖切換按鈕
     - 地圖上顯示所有飯盒標記
     - 點擊標記跳轉到詳情頁
  
  3. **飯盒詳情頁**：顯示位置地圖
     - 顯示飯盒的具體位置
     - 標記取餐地點

### 需要修改的文件
- `frontend/src/pages/CreateFoodBoxPage.tsx` - 添加地圖選點
- `frontend/src/pages/FoodBoxListPage.tsx` - 添加地圖視圖
- `frontend/src/pages/FoodBoxDetailPage.tsx` - 顯示位置地圖
- `frontend/package.json` - 添加 `leaflet` 和 `react-leaflet` 依賴

### 實現步驟
1. 安裝依賴：`leaflet`, `react-leaflet`, `@types/leaflet`
2. 創建地圖組件：`frontend/src/components/Map.tsx`
3. 在發布頁面集成地圖選點
4. 在列表頁添加地圖視圖切換
5. 在詳情頁顯示位置

### CSS 注意事項
- 確保 Leaflet CSS 已導入
- 移動端適配（觸控友好）
- 地圖容器高度設置（至少 300px）

---

## 📸 功能 2：圖片上傳

### 需求
允許用戶上傳飯盒照片，支持多張圖片。

### 技術要求
- **前端**：
  - 圖片選擇（input type="file" multiple）
  - 圖片預覽
  - 圖片壓縮（可選，使用 `browser-image-compression`）
  - 上傳進度顯示
  
- **後端**：
  - 使用 `multer` 處理文件上傳
  - 文件驗證（類型、大小）
  - 存儲到 `backend/uploads/` 目錄
  - 返回圖片 URL

### 需要修改的文件
- `frontend/src/pages/CreateFoodBoxPage.tsx` - 添加圖片上傳 UI
- `backend/src/routes/foodBoxes.ts` - 添加圖片上傳端點
- `backend/src/index.ts` - 配置 multer 和靜態文件服務
- `backend/package.json` - 添加 `multer` 和 `@types/multer`

### 實現步驟
1. 後端：設置 multer 中間件
2. 後端：添加 `/api/food-boxes/:id/images` POST 端點
3. 後端：配置靜態文件服務 `/uploads`
4. 前端：創建圖片上傳組件
5. 前端：在發布頁面集成
6. 前端：在詳情頁顯示圖片

### 數據庫
- `food_boxes` 表已有 `images` 字段（JSON 數組）
- 存儲圖片文件名或 URL 路徑

### 安全考慮
- 文件類型驗證（只允許 jpg, png, webp）
- 文件大小限制（每張 < 5MB）
- 文件名清理（防止路徑遍歷）

---

## 🔍 功能 3：搜索和篩選

### 需求
允許用戶按地區、距離、時間等條件篩選飯盒。

### 技術要求
- **前端**：
  - 搜索欄（標題/描述搜索）
  - 地區篩選下拉框
  - 距離篩選（如果用戶允許位置權限）
  - 時間篩選（今天、本週、本月）
  - 排序選項（最新、距離、時間）
  
- **後端**：
  - 擴展現有的 GET `/api/food-boxes` 端點
  - 支持 `search`, `district`, `lat`, `lng`, `radius`, `time_range` 參數
  - 全文搜索（PostgreSQL 的 `ILIKE` 或全文搜索）

### 需要修改的文件
- `frontend/src/pages/FoodBoxListPage.tsx` - 添加篩選 UI
- `backend/src/routes/foodBoxes.ts` - 擴展查詢邏輯
- `frontend/src/lib/constants.ts` - 添加時間範圍常量

### 實現步驟
1. 前端：創建篩選組件
2. 前端：集成到列表頁
3. 後端：實現搜索邏輯
4. 後端：實現時間範圍篩選
5. 測試各種篩選組合

### UI 設計
- 篩選欄固定在頂部（移動端可收起）
- 顯示當前篩選條件
- 清除篩選按鈕
- 結果數量顯示

---

## 🔔 功能 4：通知系統

### 需求
當申請狀態變更時，通知相關用戶。

### 技術要求
- **方案選擇**：
  - **方案 A（簡單）**：使用 React Query 輪詢檢查新通知
  - **方案 B（推薦）**：使用 WebSocket（Socket.io）實時推送
  
- **功能**：
  1. 申請被批准/拒絕時通知接收者
  2. 有新申請時通知捐贈者
  3. 飯盒狀態變更通知
  4. 前端顯示通知徽章和列表

### 需要修改的文件
- `backend/src/index.ts` - Socket.io 配置（如果選擇方案 B）
- `backend/src/routes/applications.ts` - 發送通知事件
- `frontend/src/components/NotificationBell.tsx` - 新建通知組件
- `frontend/src/pages/NotificationsPage.tsx` - 新建通知列表頁
- `frontend/src/components/BottomNav.tsx` - 添加通知徽章

### 數據庫
- 可以創建 `notifications` 表，或使用現有的 `messages` 表結構

### 實現步驟（方案 A - 簡單）
1. 後端：創建通知 API 端點
2. 前端：使用 React Query 輪詢（每 30 秒）
3. 前端：顯示通知徽章
4. 前端：創建通知列表頁

### 實現步驟（方案 B - 推薦）
1. 後端：配置 Socket.io
2. 後端：在申請狀態變更時發送事件
3. 前端：連接 WebSocket
4. 前端：實時接收通知
5. 前端：顯示通知徽章和列表

---

## 📋 實現優先級

請按照以下順序實現：

1. **地圖整合** ⭐⭐⭐（最重要，提升用戶體驗）
2. **圖片上傳** ⭐⭐⭐（視覺化很重要）
3. **搜索篩選** ⭐⭐（提升可用性）
4. **通知系統** ⭐⭐（改善交互）

---

## 🎨 UI/UX 要求

### 移動端優先
- 所有新功能必須在移動端正常工作
- 觸控目標 ≥ 44px
- 字體大小 ≥ 16px
- 響應式設計

### 一致性
- 使用現有的 Tailwind CSS 類
- 遵循現有的設計系統
- 保持顏色和樣式一致

### 用戶體驗
- 加載狀態顯示
- 錯誤處理友好
- 空狀態提示
- 操作確認（重要操作）

---

## 🔧 技術注意事項

### 依賴管理
- 添加新依賴後，更新 `package.json`
- 確保版本兼容性
- 添加 TypeScript 類型定義

### 錯誤處理
- 所有 API 調用都要有錯誤處理
- 顯示友好的錯誤訊息
- 記錄錯誤日誌

### 性能優化
- 圖片懶加載
- 地圖標記聚合（如果標記很多）
- 搜索防抖（debounce）
- 列表虛擬化（如果項目很多）

### 安全性
- 圖片上傳驗證
- 文件大小限制
- 文件類型檢查
- 路徑清理

---

## 📝 代碼規範

### TypeScript
- 完整的類型定義
- 避免使用 `any`
- 使用接口定義數據結構

### React
- 使用函數組件和 Hooks
- 提取可重用組件
- 使用 React Query 管理服務器狀態
- 適當使用 `useMemo` 和 `useCallback`

### 文件組織
- 組件放在 `components/` 目錄
- 工具函數放在 `lib/` 目錄
- 類型定義放在組件文件或 `types/` 目錄

---

## ✅ 完成標準

每個功能完成後，請確認：

- [ ] 功能正常工作
- [ ] 移動端適配良好
- [ ] 錯誤處理完善
- [ ] 代碼符合規範
- [ ] 沒有引入新的 bug
- [ ] 性能良好

---

## 🚀 開始實現

請按照優先級順序實現上述功能。每個功能完成後，請提供：

1. **功能說明**：實現了什麼功能
2. **修改的文件**：列出所有修改的文件
3. **新增的文件**：列出所有新增的文件
4. **使用說明**：如何使用新功能
5. **測試建議**：如何測試新功能

請開始實現第一個功能：**地圖整合**。
