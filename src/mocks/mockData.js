// Mock data for customers
export const customersData = [
	{
		id: '550e8400-e29b-41d4-a716-446655440001',
		name: 'John Smith',
		gender: 'M',
		phone: '+1-555-0101',
		extra: 'VIP Customer',
		createdAt: '2024-01-15T10:00:00Z',
		updatedAt: '2024-03-20T15:30:00Z',
		deletedAt: null,
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440002',
		name: 'Sarah Johnson',
		gender: 'F',
		phone: '+1-555-0102',
		extra: null,
		createdAt: '2024-02-20T14:20:00Z',
		updatedAt: '2024-03-19T09:15:00Z',
		deletedAt: null,
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440003',
		name: 'Michael Brown',
		gender: 'M',
		phone: null,
		extra: 'Imported from legacy system',
		createdAt: '2023-11-10T08:45:00Z',
		updatedAt: '2024-03-21T11:00:00Z',
		deletedAt: null,
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440004',
		name: 'Emily Davis',
		gender: 'F',
		phone: '+1-555-0104',
		extra: 'Bulk orders allowed',
		createdAt: '2024-03-05T12:30:00Z',
		updatedAt: '2024-03-22T16:45:00Z',
		deletedAt: null,
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440005',
		name: 'David Wilson',
		gender: 'M',
		phone: '+1-555-0105',
		extra: null,
		createdAt: '2024-01-22T09:00:00Z',
		updatedAt: '2024-03-18T13:20:00Z',
		deletedAt: null,
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440006',
		name: 'Lisa Anderson',
		gender: 'F',
		phone: '+1-555-0106',
		extra: 'First time buyer',
		createdAt: '2024-03-28T11:15:00Z',
		updatedAt: '2024-03-28T11:15:00Z',
		deletedAt: null,
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440007',
		name: 'Robert Taylor',
		gender: 'M',
		phone: '+1-555-0107',
		extra: 'Executive account',
		createdAt: '2023-12-15T10:30:00Z',
		updatedAt: '2024-03-20T08:00:00Z',
		deletedAt: null,
	},
	{
		id: '550e8400-e29b-41d4-a716-446655440008',
		name: 'Jennifer Martinez',
		gender: 'F',
		phone: '+1-555-0108',
		extra: null,
		createdAt: '2024-02-10T15:45:00Z',
		updatedAt: '2024-03-21T10:30:00Z',
		deletedAt: null,
	},
]

// Mock data for sales
export const salesData = [
	{
		id: 1001,
		customerId: 1,
		customerName: 'John Smith',
		orderDate: '2024-03-20',
		amount: 245,
		status: 'completed',
		items: 3,
	},
	{
		id: 1002,
		customerId: 2,
		customerName: 'Sarah Johnson',
		orderDate: '2024-03-21',
		amount: 389.5,
		status: 'completed',
		items: 5,
	},
	{
		id: 1003,
		customerId: 4,
		customerName: 'Emily Davis',
		orderDate: '2024-03-22',
		amount: 620,
		status: 'processing',
		items: 8,
	},
	{
		id: 1004,
		customerId: 7,
		customerName: 'Robert Taylor',
		orderDate: '2024-03-22',
		amount: 1250,
		status: 'completed',
		items: 12,
	},
	{
		id: 1005,
		customerId: 5,
		customerName: 'David Wilson',
		orderDate: '2024-03-23',
		amount: 180,
		status: 'pending',
		items: 2,
	},
	{
		id: 1006,
		customerId: 8,
		customerName: 'Jennifer Martinez',
		orderDate: '2024-03-23',
		amount: 450,
		status: 'processing',
		items: 6,
	},
	{
		id: 1007,
		customerId: 1,
		customerName: 'John Smith',
		orderDate: '2024-03-24',
		amount: 320,
		status: 'completed',
		items: 4,
	},
	{
		id: 1008,
		customerId: 4,
		customerName: 'Emily Davis',
		orderDate: '2024-03-24',
		amount: 890,
		status: 'completed',
		items: 10,
	},
]

// Mock data for dashboard statistics
export const dashboardStats = {
	totalRevenue: 15650,
	totalCustomers: 156,
	totalOrders: 324,
	avgOrderValue: 48.3,
}

// Mock data for charts
export const salesTrendData = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
	datasets: [
		{
			label: 'Revenue',
			data: [12000, 19000, 15000, 25000, 22000, 30000],
			borderColor: '#1152d4',
			backgroundColor: 'rgba(17, 82, 212, 0.08)',
			tension: 0.4,
			fill: true,
		},
	],
}

export const customerGrowthData = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
	datasets: [
		{
			label: 'New Customers',
			data: [15, 28, 22, 35, 30, 42],
			backgroundColor: '#1152d4',
			borderRadius: 4,
		},
	],
}

export const categoriesData = {
	labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Home'],
	datasets: [
		{
			label: 'Sales by Category',
			data: [35, 25, 20, 10, 10],
			backgroundColor: [
				'#1152d4',
				'#60a5fa',
				'#94a3b8',
				'#cbd5e1',
				'#e2e8f0',
			],
		},
	],
}
