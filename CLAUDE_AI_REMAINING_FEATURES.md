# Claude AI - 完成剩餘功能 Prompt

## ✅ 已完成

階段 2 的部分功能已完成：
- ✅ 圖片上傳功能
- ✅ 通知系統

---

## 🎯 需要實現的剩餘功能

請實現以下兩個高優先級功能：

---

## 📍 功能 1：地圖整合（最高優先級）

### 需求
使用 Leaflet 顯示飯盒位置，支持地圖選點和瀏覽。

### 技術要求

#### 1. 安裝依賴
```bash
cd frontend
npm install leaflet react-leaflet @types/leaflet
```

#### 2. 創建地圖組件
**文件**：`frontend/src/components/Map.tsx`

**功能**：
- 顯示地圖（使用 OpenStreetMap）
- 支持點擊選點
- 顯示標記
- 移動端適配

**Props**：
```typescript
interface MapProps {
  center?: [number, number];  // [lat, lng]
  markers?: Array<{ lat: number; lng: number; title?: string }>;
  onLocationSelect?: (lat: number, lng: number) => void;
  height?: string;  // 默認 '300px'
  interactive?: boolean;  // 是否可點擊選點，默認 true
}
```

#### 3. 發布頁面集成
**文件**：`frontend/src/pages/CreateFoodBoxPage.tsx`

**功能**：
- 添加地圖選點功能
- 點擊地圖選擇位置
- 顯示選中的經緯度
- 自動填充 `latitude` 和 `longitude` 字段
- 可選：使用反向地理編碼獲取地址（如果時間允許）

**UI 設計**：
- 地圖高度：300px（移動端）或 400px（桌面端）
- 顯示當前選中的位置標記
- 顯示經緯度數值
- 提示："點擊地圖選擇位置"

#### 4. 列表頁地圖視圖
**文件**：`frontend/src/pages/FoodBoxListPage.tsx`

**功能**：
- 添加"列表視圖" / "地圖視圖"切換按鈕
- 地圖視圖顯示所有飯盒標記
- 點擊標記顯示飯盒信息（彈出框或側邊欄）
- 點擊標記跳轉到詳情頁

**UI 設計**：
- 切換按鈕在頁面頂部
- 地圖視圖時，地圖佔滿可用空間
- 標記使用不同顏色區分狀態
- 移動端：地圖全屏，底部顯示選中的飯盒卡片

#### 5. 詳情頁顯示位置
**文件**：`frontend/src/pages/FoodBoxDetailPage.tsx`

**功能**：
- 顯示飯盒的具體位置地圖
- 標記取餐地點
- 顯示地址和經緯度
- 可選：顯示路線（如果時間允許）

**UI 設計**：
- 地圖高度：250px（移動端）或 350px（桌面端）
- 標記清晰可見
- 顯示"取餐地點"標籤

### CSS 配置
**文件**：`frontend/src/main.tsx` 或 `frontend/src/index.css`

```typescript
import 'leaflet/dist/leaflet.css';
```

**注意**：需要修復 Leaflet 默認圖標路徑問題：
```typescript
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
```

### 實現步驟
1. 安裝依賴
2. 創建 Map 組件
3. 在發布頁面集成地圖選點
4. 在列表頁添加地圖視圖切換
5. 在詳情頁顯示位置地圖
6. 測試移動端適配

---

## 🔍 功能 2：搜索和篩選

### 需求
允許用戶按地區、距離、時間等條件篩選飯盒。

### 技術要求

#### 1. 前端篩選組件
**文件**：`frontend/src/components/FoodBoxFilters.tsx`（新建）

**功能**：
- 搜索欄（標題/描述搜索）
- 地區篩選下拉框
- 距離篩選（如果用戶允許位置權限）
- 時間篩選（今天、本週、本月、全部）
- 排序選項（最新、距離、時間）
- 清除篩選按鈕

**UI 設計**：
- 移動端：可收起的篩選面板
- 桌面端：固定在頂部的篩選欄
- 顯示當前篩選條件
- 顯示結果數量

#### 2. 列表頁集成
**文件**：`frontend/src/pages/FoodBoxListPage.tsx`

**功能**：
- 集成 FoodBoxFilters 組件
- 使用 React Query 的查詢參數
- 搜索防抖（debounce，300ms）
- 實時更新結果

**實現**：
```typescript
const [search, setSearch] = useState('');
const [district, setDistrict] = useState('');
const [timeRange, setTimeRange] = useState('');
const [sortBy, setSortBy] = useState('latest');

// 使用防抖的搜索
const debouncedSearch = useDebounce(search, 300);

const { data } = useQuery({
  queryKey: ['foodBoxes', debouncedSearch, district, timeRange, sortBy],
  queryFn: () => api.get('/food-boxes', {
    params: { search: debouncedSearch, district, time_range: timeRange, sort: sortBy }
  })
});
```

#### 3. 後端 API 擴展
**文件**：`backend/src/routes/foodBoxes.ts`

**功能**：
- 擴展現有的 GET `/api/food-boxes` 端點
- 支持 `search` 參數（標題/描述搜索）
- 支持 `time_range` 參數（today, week, month）
- 支持 `sort` 參數（latest, distance, time）

**實現**：
```typescript
// 搜索
if (search) {
  query = query.where(function() {
    this.where('food_boxes.title', 'ILIKE', `%${search}%`)
      .orWhere('food_boxes.description', 'ILIKE', `%${search}%`);
  });
}

// 時間範圍
if (timeRange === 'today') {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  query = query.where('food_boxes.pickup_time_start', '>=', today);
} else if (timeRange === 'week') {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  query = query.where('food_boxes.pickup_time_start', '>=', weekAgo);
} else if (timeRange === 'month') {
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  query = query.where('food_boxes.pickup_time_start', '>=', monthAgo);
}

// 排序
if (sort === 'time') {
  query = query.orderBy('food_boxes.pickup_time_start', 'asc');
} else if (sort === 'distance' && lat && lng) {
  // 使用 Haversine 公式排序
  query = query.orderByRaw('distance ASC');
} else {
  query = query.orderBy('food_boxes.created_at', 'desc');
}
```

#### 4. 工具函數
**文件**：`frontend/src/lib/utils.ts`（新建或擴展）

**功能**：
- `useDebounce` Hook（搜索防抖）
- 時間範圍常量
- 排序選項常量

### 實現步驟
1. 創建篩選組件
2. 實現搜索防抖
3. 擴展後端 API
4. 集成到列表頁
5. 測試各種篩選組合

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
- 平滑的過渡動畫

---

## 🔧 技術注意事項

### 地圖性能優化
- 如果標記很多（> 50），考慮使用標記聚合（marker clustering）
- 延遲加載地圖（只在需要時加載）
- 移動端使用較低的縮放級別

### 搜索性能優化
- 搜索防抖（300ms）
- 限制搜索結果數量
- 考慮添加搜索歷史（可選）

### 錯誤處理
- 地圖加載失敗時顯示友好提示
- 位置權限被拒絕時的處理
- API 錯誤處理

---

## ✅ 完成標準

每個功能完成後，請確認：

- [ ] 功能正常工作
- [ ] 移動端適配良好
- [ ] 錯誤處理完善
- [ ] 代碼符合規範
- [ ] 沒有引入新的 bug
- [ ] 性能良好
- [ ] 已更新相關文檔

---

## 🚀 開始實現

請按照優先級順序實現：
1. **地圖整合**（最高優先級）
2. **搜索和篩選**

每個功能完成後，請提供：
1. 功能說明
2. 修改的文件列表
3. 新增的文件列表
4. 使用說明
5. 測試建議

**請開始實現第一個功能：地圖整合。**
