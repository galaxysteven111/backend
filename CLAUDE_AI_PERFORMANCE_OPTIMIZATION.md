# Claude AI - 性能優化專項 Prompt

## 🎯 目標

對整個應用進行全面的性能優化，提升加載速度、響應速度和用戶體驗。

---

## 📊 性能指標目標

- **首屏加載時間**：< 2 秒
- **交互響應時間**：< 100ms
- **圖片加載時間**：< 1 秒（單張）
- **API 響應時間**：< 500ms
- **Lighthouse 分數**：> 90（Performance）

---

## 🔍 優化任務

### 1. 前端性能優化

#### 1.1 代碼分割（Code Splitting）
**目標**：減少初始包大小

**需要實現**：
- 路由級別代碼分割
- 組件懶加載
- 動態導入（dynamic imports）

**需要修改**：
- `frontend/src/App.tsx` - 使用 `React.lazy` 和 `Suspense`
- `frontend/vite.config.ts` - 優化構建配置

**示例**：
```typescript
const FoodBoxListPage = React.lazy(() => import('./pages/FoodBoxListPage'));
```

#### 1.2 圖片優化
**目標**：減少圖片加載時間

**需要實現**：
- 圖片懶加載（Lazy loading）
- 圖片壓縮（上傳時）
- 響應式圖片（srcset）
- WebP 格式支持
- 圖片佔位符（Blur placeholder）

**需要修改**：
- `frontend/src/components/ImageUpload.tsx` - 壓縮上傳
- `frontend/src/pages/FoodBoxListPage.tsx` - 懶加載
- `frontend/src/pages/FoodBoxDetailPage.tsx` - 響應式圖片

#### 1.3 React 渲染優化
**目標**：減少不必要的重新渲染

**需要實現**：
- 使用 `React.memo` 包裝組件
- 使用 `useMemo` 緩存計算
- 使用 `useCallback` 緩存函數
- 優化列表渲染（虛擬化）

**重點文件**：
- `FoodBoxListPage.tsx` - 列表優化
- `FoodBoxMap.tsx` - 地圖標記優化
- `NotificationBell.tsx` - 輪詢優化

#### 1.4 資源預加載
**目標**：提前加載關鍵資源

**需要實現**：
- 關鍵 CSS 內聯
- 字體預加載
- 關鍵圖片預加載
- DNS 預解析

**需要修改**：
- `frontend/index.html` - 添加 preload/prefetch
- `frontend/src/index.css` - 優化 CSS

---

### 2. 後端性能優化

#### 2.1 數據庫查詢優化
**目標**：減少數據庫查詢時間

**需要實現**：
- 添加數據庫索引
- 優化 JOIN 查詢
- 使用選擇性字段（避免 SELECT *）
- 實現查詢緩存（可選）

**需要檢查**：
- `backend/src/routes/foodBoxes.ts` - 查詢優化
- `backend/src/routes/applications.ts` - 查詢優化
- `backend/migrations/` - 添加索引

#### 2.2 API 響應優化
**目標**：減少 API 響應時間

**需要實現**：
- 響應壓縮（Gzip）
- 分頁優化
- 字段選擇（只返回需要的字段）
- 批量查詢優化

**需要修改**：
- `backend/src/index.ts` - 添加壓縮中間件
- 所有路由文件 - 優化響應

#### 2.3 緩存策略
**目標**：減少重複計算和查詢

**需要實現**：
- Redis 緩存（可選）
- 內存緩存（簡單數據）
- HTTP 緩存頭設置
- React Query 緩存優化

---

### 3. 網絡優化

#### 3.1 HTTP/2 和 HTTPS
**目標**：提升網絡傳輸效率

**需要實現**：
- 啟用 HTTP/2（生產環境）
- 使用 HTTPS（生產環境）
- 資源合併（CSS/JS）

#### 3.2 CDN 配置
**目標**：加速靜態資源加載

**需要實現**：
- 靜態資源使用 CDN
- 圖片使用 CDN
- 字體使用 CDN

---

### 4. 移動端優化

#### 4.1 觸控優化
**目標**：提升移動端體驗

**需要實現**：
- 觸控延遲優化（touch-action）
- 滾動性能優化
- 避免 300ms 點擊延遲

#### 4.2 移動端資源優化
**目標**：減少移動端數據使用

**需要實現**：
- 移動端圖片尺寸優化
- 移動端字體優化
- 條件加載（移動端不載入某些資源）

---

### 5. 監控和分析

#### 5.1 性能監控
**目標**：追蹤性能指標

**需要實現**：
- Web Vitals 追蹤
- API 響應時間監控
- 錯誤追蹤
- 用戶行為分析（可選）

**工具**：
- Google Analytics
- Sentry（錯誤追蹤）
- 自定義性能日誌

---

## 🔧 具體優化建議

### 高優先級優化

1. **圖片懶加載**
   ```typescript
   <img loading="lazy" src={imageUrl} alt={title} />
   ```

2. **React.memo 優化**
   ```typescript
   export default React.memo(FoodBoxCard);
   ```

3. **useMemo 緩存計算**
   ```typescript
   const filteredBoxes = useMemo(() => {
     return foodBoxes.filter(...);
   }, [foodBoxes, filters]);
   ```

4. **數據庫索引**
   ```typescript
   // 在遷移中添加索引
   table.index(['status', 'created_at']);
   ```

5. **API 響應壓縮**
   ```typescript
   import compression from 'compression';
   app.use(compression());
   ```

### 中優先級優化

1. **代碼分割**
2. **圖片壓縮**
3. **查詢優化**
4. **緩存策略**

### 低優先級優化

1. **CDN 配置**
2. **HTTP/2**
3. **性能監控**

---

## 📝 優化檢查清單

### 前端檢查
- [ ] 代碼分割實現
- [ ] 圖片懶加載
- [ ] React.memo 使用
- [ ] useMemo/useCallback 使用
- [ ] 資源預加載
- [ ] CSS 優化
- [ ] 字體優化

### 後端檢查
- [ ] 數據庫索引添加
- [ ] 查詢優化
- [ ] 響應壓縮
- [ ] 緩存實現
- [ ] API 響應優化

### 網絡檢查
- [ ] HTTP 緩存頭
- [ ] 資源壓縮
- [ ] CDN 配置（如果適用）

### 移動端檢查
- [ ] 觸控優化
- [ ] 移動端資源優化
- [ ] 響應式圖片

---

## 🎯 性能測試

### 測試工具
- Lighthouse（Chrome DevTools）
- WebPageTest
- React DevTools Profiler

### 測試指標
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

### 測試步驟
1. 運行 Lighthouse 測試
2. 記錄優化前分數
3. 實施優化
4. 再次測試
5. 對比結果

---

## ✅ 完成標準

優化完成後，請確認：

- [ ] Lighthouse Performance 分數 > 90
- [ ] 首屏加載時間 < 2 秒
- [ ] 圖片加載優化
- [ ] API 響應時間 < 500ms
- [ ] 移動端性能良好
- [ ] 沒有引入新的 bug

---

## 🚀 開始優化

請按照優先級順序進行優化。每個優化完成後，請提供：

1. **優化說明**：做了什麼優化
2. **性能指標**：優化前後的對比
3. **修改的文件**：列出所有修改的文件
4. **測試結果**：Lighthouse 分數對比

**建議先從圖片優化和 React 渲染優化開始！**
