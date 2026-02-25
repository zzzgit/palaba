import {
	categoriesData,
	customerGrowthData,
	customersData,
	dashboardStats,
	salesData,
	salesTrendData,
} from './mockData.js'

// Simulate network delay
const delay = (ms = 300)=> new Promise(resolve=> setTimeout(resolve, ms))

// Mock API for customers
export const mockCustomerAPI = {
	async getAll(){
		await delay()
		// Filter out soft-deleted customers
		return { success: true, data: [...customersData.filter(c=> !c.deletedAt)] }
	},

	async getById(id){
		await delay()
		const customer = customersData.find(c=> c.id === id && !c.deletedAt)
		return customer ? { success: true, data: customer } : { success: false, error: 'Customer not found' }
	},

	async create(customerData){
		await delay()
		const generateUUID = ()=> {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c=> {
				const r = (Math.random() * 16) | 0
				const v = c === 'x' ? r : (r & 0x3) | 0x8
				return v.toString(16)
			})
		}
		const now = new Date().toISOString()
		const newCustomer = {
			id: generateUUID(),
			...customerData,
			gender: customerData.gender || null,
			phone: customerData.phone || null,
			extra: customerData.extra || null,
			createdAt: now,
			updatedAt: now,
			deletedAt: null,
		}
		customersData.push(newCustomer)
		return { success: true, data: newCustomer }
	},

	async update(id, customerData){
		await delay()
		const index = customersData.findIndex(c=> c.id === id)
		if (index === -1 || customersData[index].deletedAt){
			return { success: false, error: 'Customer not found' }
		}
		customersData[index] = { ...customersData[index], ...customerData, updatedAt: new Date().toISOString() }
		return { success: true, data: customersData[index] }
	},

	async delete(id){
		await delay()
		const index = customersData.findIndex(c=> c.id === id)
		if (index === -1){
			return { success: false, error: 'Customer not found' }
		}
		// Soft delete
		customersData[index].deletedAt = new Date().toISOString()
		return { success: true, message: 'Customer deleted successfully' }
	},
}

// Mock API for sales
export const mockSalesAPI = {
	async getAll(){
		await delay()
		return { success: true, data: [...salesData] }
	},

	async getById(id){
		await delay()
		const sale = salesData.find(s=> s.id === parseInt(id))
		return sale ? { success: true, data: sale } : { success: false, error: 'Sale not found' }
	},

	async getByCustomerId(customerId){
		await delay()
		const sales = salesData.filter(s=> s.customerId === parseInt(customerId))
		return { success: true, data: sales }
	},

	async create(saleData){
		await delay()
		const newSale = {
			id: Math.max(...salesData.map(s=> s.id)) + 1,
			...saleData,
			orderDate: new Date().toISOString().split('T')[0],
		}
		salesData.push(newSale)
		return { success: true, data: newSale }
	},

	async updateStatus(id, status){
		await delay()
		const index = salesData.findIndex(s=> s.id === parseInt(id))
		if (index === -1){
			return { success: false, error: 'Sale not found' }
		}
		salesData[index].status = status
		return { success: true, data: salesData[index] }
	},
}

// Mock API for dashboard
export const mockDashboardAPI = {
	async getStats(){
		await delay()
		return { success: true, data: dashboardStats }
	},

	async getSalesTrend(){
		await delay()
		return { success: true, data: salesTrendData }
	},

	async getCustomerGrowth(){
		await delay()
		return { success: true, data: customerGrowthData }
	},

	async getCategories(){
		await delay()
		return { success: true, data: categoriesData }
	},
}
