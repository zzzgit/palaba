import { doDelete, doGet, doPost, doPut } from './http.js'

export const getCustomers = (params, pager)=> {
	const query = {}
	if (params){
		for (const key in params){
			query[key] = params[key]
		}
	}
	if (pager){
		query.page = pager.currentPage
		query.pageSize = pager.pageSize
	}
	return doGet('customers', query)
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
