# Claude AI - 額外功能實現 Prompt

## ✅ 已完成功能

- ✅ 階段 1：安全性 + Bug 修復
- ✅ 階段 2：地圖、圖片上傳、搜索篩選、通知系統

---

## 🎯 額外功能實現

現在請實現以下額外功能，進一步完善平台功能。

---

## 📋 功能列表

### 1. 評價系統 ⭐⭐⭐

#### 需求
允許用戶在完成交易後評價對方，建立信任機制。

#### 功能要求
- **評價表單**：
  - 評分（1-5 星）
  - 評價內容（可選）
  - 評價類型（捐贈者評價接收者 / 接收者評價捐贈者）

- **評價顯示**：
  - 用戶個人資料頁顯示評價列表
  - 顯示平均評分
  - 顯示評價數量

- **評價管理**：
  - 只能評價一次
  - 只能評價已完成的交易
  - 可以編輯自己的評價

#### 技術實現
- **數據庫**：使用現有的 `ratings` 表（已創建）
- **後端 API**：
  - `POST /api/ratings` - 創建評價
  - `GET /api/ratings/:userId` - 獲取用戶評價
  - `PATCH /api/ratings/:id` - 更新評價
  - `DELETE /api/ratings/:id` - 刪除評價

- **前端頁面**：
  - 在 `MyApplicationsPage` 添加「評價」按鈕（已完成申請）
  - 創建 `RatingModal.tsx` 組件
  - 在 `ProfilePage` 顯示評價列表

#### 需要修改的文件
- `backend/src/routes/ratings.ts` - 新建評價路由
- `backend/src/index.ts` - 註冊路由
- `frontend/src/pages/MyApplicationsPage.tsx` - 添加評價按鈕
- `frontend/src/components/RatingModal.tsx` - 新建評價組件
- `frontend/src/pages/ProfilePage.tsx` - 顯示評價

---

### 2. 消息系統 ⭐⭐⭐

#### 需求
允許捐贈者和接收者即時溝通，協調取餐細節。

#### 功能要求
- **消息列表**：
  - 顯示所有對話
  - 顯示未讀消息數量
  - 按最後消息時間排序

- **消息對話**：
  - 顯示消息歷史
  - 發送新消息
  - 實時更新（使用 WebSocket 或輪詢）

- **消息通知**：
  - 新消息時顯示通知
  - 在通知列表中顯示

#### 技術實現
- **數據庫**：使用現有的 `messages` 表（已創建）
- **後端 API**：
  - `GET /api/messages` - 獲取對話列表
  - `GET /api/messages/:foodBoxId` - 獲取特定對話的消息
  - `POST /api/messages` - 發送消息
  - `PATCH /api/messages/:id/read` - 標記為已讀

- **WebSocket**（推薦）：
  - 使用 Socket.io（已安裝）
  - 實時消息推送
  - 在線狀態顯示

- **前端頁面**：
  - `MessagesPage.tsx` - 消息列表頁
  - `MessageChatPage.tsx` - 對話頁面
  - `MessageBubble.tsx` - 消息氣泡組件

#### 需要修改的文件
- `backend/src/routes/messages.ts` - 新建消息路由
- `backend/src/index.ts` - 註冊路由和 Socket.io 事件
- `frontend/src/pages/MessagesPage.tsx` - 新建消息列表頁
- `frontend/src/pages/MessageChatPage.tsx` - 新建對話頁
- `frontend/src/components/MessageBubble.tsx` - 新建消息組件
- `frontend/src/App.tsx` - 添加路由
- `frontend/src/components/BottomNav.tsx` - 添加消息入口

---

### 3. 個人資料編輯 ⭐⭐

#### 需求
允許用戶編輯個人資料，包括頭像、姓名、地區等。

#### 功能要求
- **編輯表單**：
  - 頭像上傳
  - 姓名編輯
  - 地區選擇
  - 聯繫方式編輯

- **頭像上傳**：
  - 圖片選擇和預覽
  - 圖片裁剪（可選）
  - 上傳進度顯示

#### 技術實現
- **後端 API**：
  - `PATCH /api/users/me` - 更新用戶資料
  - `POST /api/users/avatar` - 上傳頭像

- **前端頁面**：
  - `EditProfilePage.tsx` - 編輯資料頁
  - 在 `ProfilePage` 添加「編輯」按鈕

#### 需要修改的文件
- `backend/src/routes/auth.ts` - 添加更新資料路由
- `frontend/src/pages/EditProfilePage.tsx` - 新建編輯頁
- `frontend/src/pages/ProfilePage.tsx` - 添加編輯按鈕
- `frontend/src/App.tsx` - 添加路由

---

### 4. 我的發布頁面 ⭐⭐

#### 需求
允許捐贈者查看和管理自己發布的所有飯盒。

#### 功能要求
- **飯盒列表**：
  - 顯示所有發布的飯盒
  - 顯示狀態（可用、已預訂、已完成）
  - 顯示申請數量

- **管理功能**：
  - 編輯飯盒信息
  - 刪除飯盒
  - 查看所有申請
  - 批量操作（可選）

#### 技術實現
- **後端 API**：
  - `GET /api/food-boxes/my` - 獲取我的發布
  - `PATCH /api/food-boxes/:id` - 更新飯盒（已有）
  - `DELETE /api/food-boxes/:id` - 刪除飯盒（已有）

- **前端頁面**：
  - `MyFoodBoxesPage.tsx` - 我的發布頁

#### 需要修改的文件
- `backend/src/routes/foodBoxes.ts` - 添加 `/my` 路由
- `frontend/src/pages/MyFoodBoxesPage.tsx` - 新建頁面
- `frontend/src/App.tsx` - 添加路由
- `frontend/src/components/BottomNav.tsx` - 添加入口（可選）

---

### 5. 收藏功能 ⭐

#### 需求
允許用戶收藏感興趣的飯盒，方便後續查看。

#### 功能要求
- **收藏操作**：
  - 收藏/取消收藏按鈕
  - 收藏列表頁面
  - 收藏數量顯示

#### 技術實現
- **數據庫**：需要創建 `favorites` 表
- **後端 API**：
  - `POST /api/favorites` - 添加收藏
  - `DELETE /api/favorites/:id` - 取消收藏
  - `GET /api/favorites` - 獲取收藏列表

- **前端頁面**：
  - 在 `FoodBoxDetailPage` 添加收藏按鈕
  - `FavoritesPage.tsx` - 收藏列表頁

#### 需要修改的文件
- `backend/migrations/007_create_favorites.ts` - 新建遷移
- `backend/src/routes/favorites.ts` - 新建路由
- `frontend/src/pages/FoodBoxDetailPage.tsx` - 添加收藏按鈕
- `frontend/src/pages/FavoritesPage.tsx` - 新建頁面

---

### 6. 統計數據 ⭐

#### 需求
顯示用戶的捐贈/接收統計，激勵用戶參與。

#### 功能要求
- **統計顯示**：
  - 已捐贈飯盒數量
  - 已接收飯盒數量
  - 幫助的人數
  - 平均評分

- **顯示位置**：
  - 個人資料頁
  - 首頁（總體統計）

#### 技術實現
- **後端 API**：
  - `GET /api/users/:id/stats` - 獲取用戶統計
  - `GET /api/stats` - 獲取平台總體統計

- **前端頁面**：
  - 在 `ProfilePage` 顯示統計
  - 在 `HomePage` 顯示總體統計

#### 需要修改的文件
- `backend/src/routes/users.ts` - 新建用戶路由（或擴展現有路由）
- `frontend/src/pages/ProfilePage.tsx` - 添加統計顯示
- `frontend/src/pages/HomePage.tsx` - 更新統計數據

---

## 🎯 優先級建議

### 高優先級（推薦先實現）
1. **評價系統** ⭐⭐⭐ - 建立信任機制
2. **消息系統** ⭐⭐⭐ - 改善溝通
3. **個人資料編輯** ⭐⭐ - 基本功能

### 中優先級
4. **我的發布頁面** ⭐⭐ - 管理功能
5. **統計數據** ⭐ - 激勵用戶

### 低優先級
6. **收藏功能** ⭐ - 便利功能

---

## 📝 實現要求

### 代碼規範
- 使用 TypeScript 完整類型定義
- 遵循現有代碼風格
- 移動端適配
- 錯誤處理完善

### 用戶體驗
- 加載狀態顯示
- 錯誤提示友好
- 操作確認（重要操作）
- 空狀態處理

### 安全性
- 權限檢查
- 輸入驗證
- 防止重複操作

---

## ✅ 完成標準

每個功能完成後，請確認：

- [ ] 功能正常工作
- [ ] 移動端適配良好
- [ ] 錯誤處理完善
- [ ] 代碼符合規範
- [ ] 沒有引入新的 bug
- [ ] 已更新相關文檔

---

## 🚀 開始實現

請按照優先級順序實現功能。每個功能完成後，請提供：

1. **功能說明**：實現了什麼功能
2. **修改的文件**：列出所有修改的文件
3. **新增的文件**：列出所有新增的文件
4. **使用說明**：如何使用新功能
5. **測試建議**：如何測試新功能

**建議先實現：評價系統和消息系統！**
