// Mock data for customers
export const customersData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
    joinDate: "2024-01-15",
    totalOrders: 12,
    totalSpent: 2450.00
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "active",
    joinDate: "2024-02-20",
    totalOrders: 8,
    totalSpent: 1820.00
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    status: "inactive",
    joinDate: "2023-11-10",
    totalOrders: 3,
    totalSpent: 450.00
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "active",
    joinDate: "2024-03-05",
    totalOrders: 15,
    totalSpent: 3200.00
  },
  {
    id: 5,
    name: "David Wilson",
    email: "d.wilson@example.com",
    status: "active",
    joinDate: "2024-01-22",
    totalOrders: 6,
    totalSpent: 980.00
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    status: "pending",
    joinDate: "2024-03-28",
    totalOrders: 1,
    totalSpent: 150.00
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.t@example.com",
    status: "active",
    joinDate: "2023-12-15",
    totalOrders: 20,
    totalSpent: 4500.00
  },
  {
    id: 8,
    name: "Jennifer Martinez",
    email: "j.martinez@example.com",
    status: "active",
    joinDate: "2024-02-10",
    totalOrders: 9,
    totalSpent: 1650.00
  }
];

// Mock data for sales
export const salesData = [
  {
    id: 1001,
    customerId: 1,
    customerName: "John Smith",
    orderDate: "2024-03-20",
    amount: 245.00,
    status: "completed",
    items: 3
  },
  {
    id: 1002,
    customerId: 2,
    customerName: "Sarah Johnson",
    orderDate: "2024-03-21",
    amount: 389.50,
    status: "completed",
    items: 5
  },
  {
    id: 1003,
    customerId: 4,
    customerName: "Emily Davis",
    orderDate: "2024-03-22",
    amount: 620.00,
    status: "processing",
    items: 8
  },
  {
    id: 1004,
    customerId: 7,
    customerName: "Robert Taylor",
    orderDate: "2024-03-22",
    amount: 1250.00,
    status: "completed",
    items: 12
  },
  {
    id: 1005,
    customerId: 5,
    customerName: "David Wilson",
    orderDate: "2024-03-23",
    amount: 180.00,
    status: "pending",
    items: 2
  },
  {
    id: 1006,
    customerId: 8,
    customerName: "Jennifer Martinez",
    orderDate: "2024-03-23",
    amount: 450.00,
    status: "processing",
    items: 6
  },
  {
    id: 1007,
    customerId: 1,
    customerName: "John Smith",
    orderDate: "2024-03-24",
    amount: 320.00,
    status: "completed",
    items: 4
  },
  {
    id: 1008,
    customerId: 4,
    customerName: "Emily Davis",
    orderDate: "2024-03-24",
    amount: 890.00,
    status: "completed",
    items: 10
  }
];

// Mock data for dashboard statistics
export const dashboardStats = {
  totalRevenue: 15650.00,
  totalCustomers: 156,
  totalOrders: 324,
  avgOrderValue: 48.30
};

// Mock data for charts
export const salesTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: "#1976d2",
      backgroundColor: "rgba(25, 118, 210, 0.1)",
      tension: 0.4
    }
  ]
};

export const customerGrowthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "New Customers",
      data: [15, 28, 22, 35, 30, 42],
      backgroundColor: "#4caf50"
    }
  ]
};

export const categoriesData = {
  labels: ["Electronics", "Clothing", "Food", "Books", "Home"],
  datasets: [
    {
      label: "Sales by Category",
      data: [35, 25, 20, 10, 10],
      backgroundColor: [
        "#1976d2",
        "#4caf50",
        "#ff9800",
        "#f44336",
        "#9c27b0"
      ]
    }
  ]
};
