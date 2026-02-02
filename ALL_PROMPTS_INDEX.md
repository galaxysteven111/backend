# 📚 所有 Claude AI Prompt 文件索引

## 📋 文件列表和使用指南

這裡列出了所有可以發給 Claude AI 的 prompt 文件，按階段和用途分類。

---

## 🎯 按階段分類

### 階段 1：安全性 + Bug 修復 ✅ **已完成**
- **文件**：`CLAUDE_AI_REVIEW_PROMPT.md`
- **狀態**：✅ 已完成
- **內容**：安全性審查、Bug 修復、輸入驗證、速率限制等
- **使用時機**：已完成，無需再發送

---

### 階段 2：高優先級功能 ✅ **已完成**
- **文件**：`CLAUDE_AI_FEATURE_IMPLEMENTATION.md`
- **狀態**：✅ 已完成（地圖、圖片上傳、搜索篩選、通知系統）
- **內容**：4 個高優先級功能的詳細實現指南
- **使用時機**：已完成，無需再發送

---

### 階段 3：代碼優化和改進 🟡 **可選**
- **文件**：`CLAUDE_AI_PHASE3_OPTIMIZATION.md`
- **狀態**：🟡 可選
- **內容**：
  - 代碼重構和組件化
  - React 性能優化
  - 圖片優化
  - TypeScript 類型完善
  - 錯誤邊界實現
  - 可訪問性改進
- **使用時機**：想要提升代碼質量和性能時
- **優先級**：中高

---

## 🚀 額外功能實現 🟡 **可選**

### 1. 評價系統、消息系統等
- **文件**：`CLAUDE_AI_ADDITIONAL_FEATURES.md`
- **狀態**：🟡 可選
- **內容**：
  - 評價系統（⭐⭐⭐）
  - 消息系統（⭐⭐⭐）
  - 個人資料編輯（⭐⭐）
  - 我的發布頁面（⭐⭐）
  - 收藏功能（⭐）
  - 統計數據（⭐）
- **使用時機**：想要添加更多功能時
- **優先級**：根據需求選擇

---

## ⚡ 性能優化專項 🟡 **可選**

- **文件**：`CLAUDE_AI_PERFORMANCE_OPTIMIZATION.md`
- **狀態**：🟡 可選
- **內容**：
  - 前端性能優化（代碼分割、圖片優化、React 優化）
  - 後端性能優化（數據庫查詢、API 響應、緩存）
  - 網絡優化（HTTP/2、CDN）
  - 移動端優化
  - 性能監控
- **使用時機**：應用變慢或想要提升性能時
- **優先級**：中

---

## 🚢 生產部署準備 🟡 **可選**

- **文件**：`CLAUDE_AI_DEPLOYMENT_READY.md`
- **狀態**：🟡 可選
- **內容**：
  - 環境配置管理
  - 安全性加固
  - 錯誤處理和日誌
  - 數據庫準備
  - 構建和打包優化
  - 部署文檔
  - 監控和健康檢查
- **使用時機**：準備部署到生產環境時
- **優先級**：高（如果準備部署）

---

## 📝 其他參考文件

### 審查和檢查清單
- `CLAUDE_AI_CODE_REVIEW.md` - 簡潔版代碼審查 prompt
- `CODE_REVIEW_CHECKLIST.md` - 結構化檢查清單
- `CLAUDE_REVIEW_SUMMARY.md` - 專案總結和審查指南

### 狀態和測試
- `COMPLETE_STATUS.md` - 階段 2 完成狀態報告
- `TESTING_GUIDE.md` - 完整測試指南
- `PHASE2_STATUS.md` - 階段 2 狀態追蹤

---

## 🎯 推薦使用順序

### 如果現在想要...

#### 1. **提升代碼質量和性能**
   → 發送：`CLAUDE_AI_PHASE3_OPTIMIZATION.md`

#### 2. **添加更多功能（評價、消息等）**
   → 發送：`CLAUDE_AI_ADDITIONAL_FEATURES.md`

#### 3. **優化應用性能**
   → 發送：`CLAUDE_AI_PERFORMANCE_OPTIMIZATION.md`

#### 4. **準備部署到生產環境**
   → 發送：`CLAUDE_AI_DEPLOYMENT_READY.md`

#### 5. **全面改進（所有優化）**
   → 按順序發送：
   1. `CLAUDE_AI_PHASE3_OPTIMIZATION.md`
   2. `CLAUDE_AI_PERFORMANCE_OPTIMIZATION.md`
   3. `CLAUDE_AI_DEPLOYMENT_READY.md`

---

## 💡 使用建議

### 單獨發送
每個 prompt 文件都是獨立的，可以單獨發送給 Claude AI。

### 組合使用
可以將多個 prompt 組合使用，例如：
- 先優化代碼 → `CLAUDE_AI_PHASE3_OPTIMIZATION.md`
- 再優化性能 → `CLAUDE_AI_PERFORMANCE_OPTIMIZATION.md`
- 最後準備部署 → `CLAUDE_AI_DEPLOYMENT_READY.md`

### 自定義修改
可以根據需要修改 prompt 內容，添加或刪除特定任務。

---

## 📊 優先級建議

### 高優先級（建議先做）
1. **生產部署準備** - 如果準備部署
2. **代碼優化** - 提升代碼質量
3. **評價系統** - 建立信任機制

### 中優先級
1. **性能優化** - 如果應用變慢
2. **消息系統** - 改善溝通
3. **個人資料編輯** - 基本功能

### 低優先級
1. **收藏功能** - 便利功能
2. **統計數據** - 激勵功能

---

## ✅ 快速選擇指南

**問自己：**
- 想要添加新功能？ → `CLAUDE_AI_ADDITIONAL_FEATURES.md`
- 想要提升性能？ → `CLAUDE_AI_PERFORMANCE_OPTIMIZATION.md`
- 想要優化代碼？ → `CLAUDE_AI_PHASE3_OPTIMIZATION.md`
- 準備部署？ → `CLAUDE_AI_DEPLOYMENT_READY.md`
- 想要全面改進？ → 按順序發送所有優化相關的 prompt

---

## 🎉 總結

現在你有 **4 個新的 prompt 文件**可以發給 Claude AI：

1. ✅ `CLAUDE_AI_PHASE3_OPTIMIZATION.md` - 代碼優化
2. ✅ `CLAUDE_AI_ADDITIONAL_FEATURES.md` - 額外功能
3. ✅ `CLAUDE_AI_PERFORMANCE_OPTIMIZATION.md` - 性能優化
4. ✅ `CLAUDE_AI_DEPLOYMENT_READY.md` - 部署準備

**建議：根據當前需求選擇合適的 prompt 發送！** 🚀
