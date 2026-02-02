# 部署 HTML 到網上

## 快速部署選項

### 方法 1：使用 Netlify Drop（最簡單，無需註冊）

1. 訪問：https://app.netlify.com/drop
2. 直接拖拽 `test-page.html` 文件到頁面
3. 立即獲得一個可訪問的 URL（例如：https://random-name-123.netlify.app）
4. 可以分享給任何人訪問

### 方法 2：使用 Surge.sh（命令行）

1. 安裝 Surge：
```bash
npm install -g surge
```

2. 部署：
```bash
surge
# 輸入郵箱和密碼（首次使用）
# 輸入項目路徑：./
# 輸入域名：foodbox-donation.surge.sh（或自定義）
```

3. 訪問：https://foodbox-donation.surge.sh

### 方法 3：使用 GitHub Pages

1. 創建 GitHub 倉庫
2. 上傳 `test-page.html` 並重命名為 `index.html`
3. 在倉庫設置中啟用 GitHub Pages
4. 訪問：https://你的用戶名.github.io/倉庫名

### 方法 4：使用 Vercel

1. 訪問：https://vercel.com
2. 註冊/登錄
3. 點擊 "New Project"
4. 上傳 `test-page.html` 文件
5. 立即獲得部署 URL

## 推薦：Netlify Drop（最快速）

**步驟：**
1. 打開瀏覽器訪問：https://app.netlify.com/drop
2. 將 `test-page.html` 文件拖到頁面
3. 等待幾秒鐘
4. 獲得一個類似 `https://xxxxx-xxxxx.netlify.app` 的 URL
5. 複製 URL 分享給任何人

**優點：**
- 無需註冊
- 立即生效
- 自動 HTTPS
- 全球 CDN
- 完全免費

## 注意事項

部署後如果底部導覽還是看不到，請檢查：
1. 瀏覽器控制台是否有錯誤
2. 是否在手機上測試（桌面瀏覽器可能顯示不同）
3. 清除瀏覽器緩存後再試
