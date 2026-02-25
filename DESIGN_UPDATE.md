# 現代化 Admin Dashboard 設計更新

## 📊 設計概述

整個 Palaba Admin Dashboard 已升級為現代化深色主題設計，採用現代企業級的配色方案和UI風格。

---

## 🎨 配色方案更新

### 新的調色板
- **主背景**：`#0f172a` (深靛藍)
- **表面色**：`#1e293b` (深藍灰)
- **邊框色**：`#334155` (藍灰)
- **文字色**：`#f1f5f9` (淺灰白)
- **主強調色**：`#3b82f6` (現代藍)
- **副強調色**：`#8b5cf6` (現代紫)
- **成功色**：`#10b981` (翠綠)
- **警告色**：`#f59e0b` (琥珀黃)
- **錯誤色**：`#ef4444` (亮紅)
- **信息色**：`#06b6d4` (青藍)

### 舊配色方案
- ❌ 米色背景 (`#f2ede4`)
- ❌ 褐色金色 (`#c97a2b`)
- ❌ 淡綠色 (`#0f7f7a`)
- ❌ 過時的色彩組合

---

## 🔄 更新的文件清單

### 1. **樣式文件** (CSS)
- ✅ `src/styles/global.css` - 全局CSS變數和組件樣式
- ✅ `src/styles/layout.css` - Banner、Sidebar、Header樣式
- 更新內容：
  - 深色主題CSS變數定義
  - 現代化的陰影效果
  - 更新border width和border-radius
  - 新增過渡動畫效果

### 2. **圖表組件** (Chart.js)
- ✅ `src/components/charts/SalesTrendChart.jsx`
- ✅ `src/components/charts/CustomerGrowthChart.jsx`
- ✅ `src/components/charts/CategoriesChart.jsx`
- 更新內容：
  - 圖表軸線顏色適配深色主題
  - 圖例文字顏色更新
  - 網格線顏色優化
  - 使用現代字體 `Inter`

### 3. **UI 組件**
- ✅ `src/components/ui/button.jsx` - 按鈕組件
- ✅ `src/components/ui/input.jsx` - 輸入框
- ✅ `src/components/ui/select.jsx` - 下拉選擇
- ✅ `src/components/ui/dialog.jsx` - 對話框
- ✅ `src/components/ui/card.jsx` - 卡片組件
- 更新內容：
  - 深色背景色
  - 深色邊框
  - 深色文字顏色
  - 現代化的聚焦狀態

### 4. **數據文件**
- ✅ `src/mocks/mockData.js` - 圖表數據顏色
- 更新內容：
  - 銷售趨勢圖：現代藍 (`#3b82f6`)
  - 客戶增長圖：翠綠 (`#10b981`)
  - 分類銷售圖：多色現代調色板

---

## 🎯 設計特點

### 1. **深色主題**
- 保護眼睛，減少夜間使用疲勞
- 高級、專業的視覺感受
- 更好的對比度和可讀性

### 2. **現代配色**
- 藍色 + 紫色組合，展現科技感
- 去掉褐色金色，採用純淨的現代色系
- 符合2024年UI設計趨勢

### 3. **增強的交互**
- 添加 `hover` 狀態的視覺反饋
- 使用漸變色作為強調
- 平滑的過渡動畫效果

### 4. **更新的字體**
- 從 `Space Grotesk` 改為 `Inter`
- 提升可讀性
- 更現代的字體選擇

### 5. **改進的陰影系統**
- 多層次的陰影效果
- 深色主題下的陰影更自然
- 增加視覺層次感

---

## 📐 具體改變

### Banner（頂部導航欄）
```css
/* 舊版本 */
background: linear-gradient(130deg, #0f7f7a 0%, #0b6b66 45%, #c97a2b 100%);

/* 新版本 */
background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
border-bottom: 1px solid var(--border-200);
```

### Sidebar（側邊欄）
```css
/* 舊版本 */
background-color: #0f2730;

/* 新版本 */
background-color: #0f172a;
border-right: 1px solid var(--border-200);
```

### 按鈕
```css
/* 舊版本 */
.btn-primary { background-color: #0f7f7a; }

/* 新版本 */
.btn-primary { 
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
}
```

### Card 組件
```css
/* 舊版本 */
background: #ffffff;
box-shadow: 0 10px 24px rgba(15, 25, 30, 0.08);

/* 新版本 */
background: #1e293b;
border: 1px solid #334155;
box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
```

---

## 🚀 效果預覽

開發環境運行：
```bash
npm run dev
```

訪問 `http://localhost:4000/` 查看更新後的設計

---

## ✨ 主要優勢

1. **現代感** - 符合當前設計趨勢
2. **專業度** - 企業級深色主題設計
3. **易用性** - 改進的視覺層次和對比度
4. **一致性** - 統一的配色和風格
5. **性能** - CSS變數使得色彩管理更高效

---

## 📝 設計指南

### 使用 CSS 變數
所有顏色都應通過 CSS 變數引用，確保設計一致性：

```css
/* 例子 */
.component {
  background-color: var(--surface-0);
  color: var(--ink-900);
  border-color: var(--border-200);
  box-shadow: var(--shadow-1);
}
```

### 添加新組件
新組件應遵循現有的深色主題設計系統，使用定義的 CSS 變數。

---

## 📞 更新完成日期
- **日期**：2026-02-25
- **版本**：v1.0.1
- **主題**：Modern Dark Theme Update
