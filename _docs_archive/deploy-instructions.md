# 快速部署 HTML 到網上 - 3 種方法

## 🚀 方法 1：Netlify Drop（最簡單，30秒完成）

**無需註冊，直接部署！**

1. 打開瀏覽器訪問：**https://app.netlify.com/drop**
2. 將 `test-page.html` 文件**拖拽**到頁面中央
3. 等待幾秒鐘，會自動生成一個 URL
4. 複製 URL，例如：`https://amazing-cupcake-123456.netlify.app`
5. 分享給任何人，立即可以訪問！

**優點：**
- ✅ 無需註冊
- ✅ 立即生效
- ✅ 自動 HTTPS
- ✅ 全球 CDN
- ✅ 完全免費

---

## 🌐 方法 2：使用 Surge.sh（命令行）

1. **安裝 Surge**（如果還沒安裝）：
```bash
npm install -g surge
```

2. **部署**：
```bash
cd "c:\Users\Galaxy\OneDrive\桌面\捐飯盒公司"
surge
```

3. **按提示操作**：
   - 首次使用：輸入郵箱和密碼
   - 項目路徑：輸入 `./` 或直接按 Enter
   - 域名：輸入 `foodbox-donation.surge.sh`（或自定義）

4. **訪問**：https://foodbox-donation.surge.sh

---

## 📦 方法 3：使用 GitHub Pages

1. 在 GitHub 創建新倉庫（例如：`foodbox-platform`）
2. 上傳 `test-page.html` 並重命名為 `index.html`
3. 在倉庫 Settings → Pages → Source 選擇 `main` 分支
4. 訪問：`https://你的用戶名.github.io/foodbox-platform`

---

## 🔧 已修復的問題

✅ **底部導覽現在會立即顯示**
- 添加了 `!important` 確保樣式優先級
- 設置了 `z-index: 9999` 確保在最上層
- 確保 `visibility: visible` 和 `opacity: 1`

✅ **頁面布局優化**
- body 使用 flexbox 布局
- container 設置了正確的 padding-bottom
- 確保內容不會被底部導覽遮擋

---

## 📱 測試建議

部署後請在**真實手機**上測試：
1. 打開手機瀏覽器
2. 訪問部署的 URL
3. 檢查底部導覽是否立即可見
4. 測試各個導覽按鈕
5. 檢查滾動時底部導覽是否始終固定

---

## ⚠️ 如果底部導覽還是看不到

請檢查：
1. 清除瀏覽器緩存（Ctrl+F5 或 Cmd+Shift+R）
2. 在手機瀏覽器測試（桌面瀏覽器可能顯示不同）
3. 檢查瀏覽器控制台是否有錯誤（F12）
4. 確認使用的是最新版本的 `test-page.html`
