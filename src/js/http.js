const baseUrl = 'http://localhost:3000/api/v1/'

const doGet = (endpoint, params = {})=> {
	const url = new URL(endpoint, baseUrl)
	Object.keys(params).forEach((key)=> {
		if (params[key] != null){
			url.searchParams.append(key, params[key])
		}
	})
	return fetch(url.href).then((response)=> {
		return response.json()
	})
}

const doPost = (endpoint, data)=> {
	return fetch(new URL(endpoint, baseUrl).href, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((response)=> {
		return response.json().then((json)=> {
			if (!response.ok){
				const errorMsg = json.message || json.error || `HTTP error! status: ${response.status}`
				throw new Error(errorMsg)
			}
			return json
		})
	}).catch((error)=> {
		console.error('Error in POST request:', error)
		throw error
	})
}

const doDelete = (endpoint, ids)=> {
	const url = new URL(endpoint, baseUrl).href
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	}
	if (ids){
		options.body = JSON.stringify({ ids })
	}
	return fetch(url, options).then((response)=> {
		return response.json().then((json)=> {
			if (!response.ok){
				const errorMsg = json.message || json.error || `HTTP error! status: ${response.status}`
				throw new Error(errorMsg)
			}
			return json
		})
	}).catch((error)=> {
		console.error('Error in DELETE request:', error)
		throw error
	})
}

const doPut = (endpoint, data)=> {
	return fetch(new URL(endpoint, baseUrl).href, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((response)=> {
		return response.json().then((json)=> {
			if (!response.ok){
				const errorMsg = json.message || json.error || `HTTP error! status: ${response.status}`
				throw new Error(errorMsg)
			}
			return json
		})
	}).catch((error)=> {
		console.error('Error in PUT request:', error)
		throw error
	})
}

export {
	doGet, doPost, doDelete, doPut,
}
