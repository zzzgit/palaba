import { doDelete, doGet, doPost, doPut } from './http.js'

// 禁止使用
export const getCustomers = ()=> {
	return doGet('customers')
}

export const getCustomerById = (id)=> {
	return doGet(`customers/${id}`)
}

export const createCustomer = (customerObject)=> {
	return doPost('customers', customerObject)
}

export const updateCustomer = (id, customerObject)=> {
	return doPut(`customers/${id}`, customerObject)
}

export const deleteCustomerById = (id)=> {
	return doDelete(`customers/${id}`, null)
}

export const deleteCustomers = (ids)=> {
	return doDelete('customers', ids)
}

export const searchCustomers = (params, pager)=> {
	if (pager){
		params = {
			...params, page: pager.currentPage, pageSize: pager.pageSize,
		}
	}
	return doGet('customers', params)
}
