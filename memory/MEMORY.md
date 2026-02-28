# Palaba Admin Dashboard - Project Memory

## Stack
- **Frontend**: React 18 + Chakra UI v3 (3.33.0) + react-router-dom v6
- **Charts**: react-chartjs-2 + chart.js
- **Build**: Vite 5 with @vitejs/plugin-react
- **Former stack**: Solid.js (fully removed)

## Key Files
- `src/main.jsx` — React entry point, ChakraProvider v3 with createSystem + defaultConfig
- `src/App.jsx` — BrowserRouter + Routes (dashboard, customers, sales)
- `src/components/MainLayout.jsx` — Holy grail layout with Sidebar + Outlet
- `src/components/Confirm.jsx` — Global confirm dialog with static `Confirm.it(msg)` API
- `src/mocks/mockAPI.js` — Mock API (Dashboard, Sales use this; Customers uses real HTTP)
- `src/js/api.js` + `src/js/http.js` — Real HTTP API (localhost:3000)

## Design / CSS
- **Light theme** matching Stitch design: bg-canvas `#f6f6f8`, surface `white`, primary `#1152d4`
- Icons: **Material Symbols Outlined** (loaded via Google Fonts in index.html)
- `src/styles/global.css` — Design tokens + component styles (stat-card, table, badge, btn)
- `src/styles/layout.css` — App layout: sidebar (left, full height) + main-area (header + content)
- Layout: `.app-layout` (flex row) → `.sidebar` | `.main-area` → `.app-header` + `.content-wrapper`
- Tailwind removed; Chakra UI handles component-level styling

## npm permission issue
- npm cache folder has root-owned files
- Use: `npm install --cache /tmp/npm-cache-palaba` to bypass EACCES error
