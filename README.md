# Admin Dashboard

A professional Admin Dashboard built with Solid.js, featuring real-time data visualization, customer management, and sales tracking.

## 🚀 Features

### Core Functionality
- **Multi-Page Application**: Dashboard, Customer Management, and Sales Management
- **Mock API Layer**: RESTful API simulation with mock data
- **Responsive Charts**: Interactive data visualizations using Chart.js
- **CRUD Operations**: Full create, read, update, delete functionality for customers
- **Advanced Filtering**: Search and filter capabilities across all data tables
- **Professional UI**: Clean, modern admin interface with solid-ui components

### Pages

#### 1. Dashboard
- Real-time statistics cards (Revenue, Customers, Orders, Avg Order Value)
- Sales trend line chart with 6-month historical data
- Customer growth bar chart
- Sales by category pie chart
- Percentage change indicators

#### 2. Customer Management
- Complete customer database table
- Search by name or email
- Filter by status (Active, Inactive, Pending)
- Add new customers with modal form
- Edit existing customer information
- Delete customers with confirmation
- Display total orders and spending per customer

#### 3. Sales Management
- Transaction history table
- Order status tracking (Pending, Processing, Completed)
- Search by customer name or order ID
- Filter by order status
- Update order status workflow
- Summary statistics (Total Orders, Revenue, Average Order)

## 🛠️ Tech Stack

- **Framework**: Solid.js (Signals-based reactivity)
- **Language**: Modern JavaScript (ES6+)
- **Build Tool**: Vite
- **UI Library**: @suid/material (Solid-UI)
- **Data Visualization**: Chart.js with solid-chartjs
- **Styling**: Standard CSS (No preprocessors)
- **API**: Native fetch API with Promise-based mock layer

## 📁 Project Structure

```
d:\projects\palaba\
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── SalesTrendChart.jsx     # Line chart for sales trends
│   │   │   ├── CustomerGrowthChart.jsx # Bar chart for customer growth
│   │   │   └── CategoriesChart.jsx     # Pie chart for category distribution
│   │   ├── Header.jsx                  # Top navigation with breadcrumbs
│   │   ├── Sidebar.jsx                 # Collapsible navigation sidebar
│   │   └── MainLayout.jsx              # Main layout wrapper
│   ├── pages/
│   │   ├── Dashboard.jsx               # Dashboard page with statistics
│   │   ├── CustomerManagement.jsx      # Customer CRUD operations
│   │   └── SalesManagement.jsx         # Sales tracking and management
│   ├── mocks/
│   │   ├── mockData.js                 # Mock data definitions
│   │   └── mockAPI.js                  # RESTful API simulation
│   ├── styles/
│   │   ├── global.css                  # Global styles and utilities
│   │   └── layout.css                  # Layout-specific styles
│   └── App.jsx                         # Root application component
├── index.html                          # HTML entry point
├── vite.config.js                      # Vite configuration
├── package.json                        # Dependencies and scripts
└── README.md                           # This file
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design Philosophy

- **PC-First**: Optimized for desktop/laptop screens (no mobile responsiveness)
- **Professional Aesthetic**: Clean, modern admin dashboard design
- **Data-Driven**: Focus on clear data presentation and insights
- **User-Friendly**: Intuitive navigation and interaction patterns
- **Performance**: Fast reactivity with Solid.js signals

## 📊 Mock API Documentation

The application uses a custom mock API layer that simulates RESTful endpoints:

### Customer API
- `getAll()` - Retrieve all customers
- `getById(id)` - Get specific customer
- `create(data)` - Add new customer
- `update(id, data)` - Update customer information
- `delete(id)` - Remove customer

### Sales API
- `getAll()` - Retrieve all sales
- `getById(id)` - Get specific sale
- `getByCustomerId(id)` - Get customer's sales history
- `create(data)` - Create new sale
- `updateStatus(id, status)` - Update order status

### Dashboard API
- `getStats()` - Get dashboard statistics
- `getSalesTrend()` - Get sales trend data
- `getCustomerGrowth()` - Get customer growth data
- `getCategories()` - Get category distribution data

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add navigation item in `src/components/Sidebar.jsx`
3. Add route handling in `src/App.jsx`

### Modifying Charts
Chart.js options can be customized in each chart component:
- `src/components/charts/SalesTrendChart.jsx`
- `src/components/charts/CustomerGrowthChart.jsx`
- `src/components/charts/CategoriesChart.jsx`

### Updating Mock Data
Edit the data in `src/mocks/mockData.js` to change:
- Customer records
- Sales transactions
- Dashboard statistics
- Chart datasets

## 📝 Development Notes

- **No TypeScript**: Project uses pure JavaScript (ES6+)
- **No Axios**: Uses native fetch API for data requests
- **No Preprocessors**: Standard CSS only (no PostCSS, Sass, or SCSS)
- **Client-Side Only**: No server-side rendering
- **Modular Components**: Descriptive file names, no index.js files

## 🎯 Key Features Implemented

✅ Three distinct functional pages
✅ Mock data layer with RESTful API pattern
✅ Collapsible sidebar navigation
✅ Breadcrumb navigation
✅ Three different Chart.js visualizations
✅ Customer CRUD operations
✅ Search and filter functionality
✅ Order status management
✅ Professional admin dashboard styling
✅ Real-time statistics
✅ Modal forms for data entry

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your needs.
