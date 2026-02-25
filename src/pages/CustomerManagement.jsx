import { For, Show, createSignal, onMount } from 'solid-js'
import { mockCustomerAPI } from '../mocks/mockAPI.js'
import '../styles/global.css'

export default function CustomerManagement(){
	const [customers, setCustomers] = createSignal([])
	const [filteredCustomers, setFilteredCustomers] = createSignal([])
	const [loading, setLoading] = createSignal(true)
	const [searchTerm, setSearchTerm] = createSignal('')
	const [showModal, setShowModal] = createSignal(false)
	const [editingCustomer, setEditingCustomer] = createSignal(null)

	const [formData, setFormData] = createSignal({
		name: '',
		gender: 'MALE',
		phone: '',
		extra: '',
	})

	onMount(async()=> {
		await loadCustomers()
	})

	const loadCustomers = async()=> {
		setLoading(true)
		try {
			const response = await mockCustomerAPI.getAll()
			if (response.success){
				setCustomers(response.data)
				setFilteredCustomers(response.data)
			}
		} catch(error){
			console.error('Error loading customers:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleSearch = (value)=> {
		setSearchTerm(value)
		filterCustomers(value)
	}

	const filterCustomers = (search)=> {
		let filtered = customers()

		if (search){
			filtered = filtered.filter(c=> c.name.toLowerCase().includes(search.toLowerCase()) || c.phone && c.phone.toLowerCase().includes(search.toLowerCase()))
		}

		setFilteredCustomers(filtered)
	}

	const openModal = (customer = null)=> {
		if (customer){
			setEditingCustomer(customer)
			setFormData({
				name: customer.name,
				gender: customer.gender || 'MALE',
				phone: customer.phone || '',
				extra: customer.extra || '',
			})
		} else {
			setEditingCustomer(null)
			setFormData({
				name: '', gender: 'MALE', phone: '', extra: '',
			})
		}
		setShowModal(true)
	}

	const closeModal = ()=> {
		setShowModal(false)
		setEditingCustomer(null)
		setFormData({
			name: '', gender: 'MALE', phone: '', extra: '',
		})
	}

	const handleSubmit = async(e)=> {
		e.preventDefault()
		try {
			if (editingCustomer()){
				await mockCustomerAPI.update(editingCustomer().id, formData())
			} else {
				await mockCustomerAPI.create(formData())
			}
			await loadCustomers()
			closeModal()
		} catch(error){
			console.error('Error saving customer:', error)
		}
	}

	const handleDelete = async(id)=> {
		if (confirm('Are you sure you want to delete this customer?')){
			try {
				await mockCustomerAPI.delete(id)
				await loadCustomers()
			} catch(error){
				console.error('Error deleting customer:', error)
			}
		}
	}

	const formatCurrency = (value)=> {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(value)
	}

	return (
		<div class='container'>
			<div class='table-container'>
				<div class='table-header'>
					<h3 class='card-title'>Customers</h3>
					<div class='table-actions'>
						<input
							type='text'
							class='search-box'
							placeholder='Search customers...'
							value={searchTerm()}
							onInput={e=> handleSearch(e.target.value)}
						/>
						<button class='btn btn-primary' onClick={()=> openModal()}>
							+ Add Customer
						</button>
					</div>
				</div>

				<Show when={loading()} fallback={<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Gender</th>
							<th>Phone</th>
							<th>Extra Info</th>
							<th>Created</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<For each={filteredCustomers()}>
							{customer=> <tr>
								<td>{customer.id.substring(0, 8)}...</td>
								<td>{customer.name}</td>
								<td>{customer.gender || '-'}</td>
								<td>{customer.phone || '-'}</td>
								<td>{customer.extra || '-'}</td>
								<td>{new Date(customer.createdAt).toLocaleDateString()}</td>
								<td class='table-actions-cell'>
									<button
										class='btn btn-secondary btn-small'
										onClick={()=> openModal(customer)}
									>
										Edit
									</button>
									<button
										class='btn btn-secondary btn-small'
										onClick={()=> handleDelete(customer.id)}
									>
										Delete
									</button>
								</td>
							</tr>
							}
						</For>
					</tbody>
				</table>}>
					<div class='loading'>Loading customers...</div>
				</Show>

				<Show when={filteredCustomers().length === 0 && !loading()}>
					<div class='empty-state'>
						<div class='empty-state-icon'>📭</div>
						<div class='empty-state-text'>No customers found</div>
					</div>
				</Show>
			</div>

			{/* Modal */}
			<Show when={showModal()}>
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					'background-color': 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					'align-items': 'center',
					'justify-content': 'center',
					'z-index': 1000,
				}}>
					<div style={{
						background: 'white',
						padding: '32px',
						'border-radius': '8px',
						width: '500px',
						'max-width': '90%',
					}}>
						<h2 style={{ 'margin-bottom': '24px' }}>
							<Show when={editingCustomer()} fallback='Add New Customer'>
								Edit Customer
							</Show>
						</h2>
						<form onSubmit={handleSubmit}>
							<div style={{ 'margin-bottom': '16px' }}>
								<label style={{
									display: 'block', 'margin-bottom': '8px', 'font-weight': '500',
								}}>
									Name
								</label>
								<input
									type='text'
									class='search-box'
									style={{ width: '100%' }}
									value={formData().name}
									onInput={e=> setFormData({ ...formData(), name: e.target.value })}
									required
								/>
							</div>
							<div style={{ 'margin-bottom': '16px' }}>
								<label style={{
									display: 'block', 'margin-bottom': '8px', 'font-weight': '500',
								}}>
									Gender
								</label>
								<select
									class='search-box'
									style={{ width: '100%' }}
									value={formData().gender}
									onChange={e=> setFormData({ ...formData(), gender: e.target.value })}
								>
									<option value='MALE'>Male</option>
									<option value='FEMALE'>Female</option>
									<option value='OTHER'>Other</option>
								</select>
							</div>
							<div style={{ 'margin-bottom': '16px' }}>
								<label style={{
									display: 'block', 'margin-bottom': '8px', 'font-weight': '500',
								}}>
									Phone
								</label>
								<input
									type='tel'
									class='search-box'
									style={{ width: '100%' }}
									value={formData().phone}
									onInput={e=> setFormData({ ...formData(), phone: e.target.value })}
								/>
							</div>
							<div style={{ 'margin-bottom': '24px' }}>
								<label style={{
									display: 'block', 'margin-bottom': '8px', 'font-weight': '500',
								}}>
									Extra Info
								</label>
								<textarea
									class='search-box'
									style={{ width: '100%', 'min-height': '80px' }}
									value={formData().extra}
									onInput={e=> setFormData({ ...formData(), extra: e.target.value })}
								/>
							</div>
							<div style={{
								display: 'flex', gap: '12px', 'justify-content': 'flex-end',
							}}>
								<button type='button' class='btn btn-secondary' onClick={closeModal}>
									Cancel
								</button>
								<button type='submit' class='btn btn-primary'>
									<Show when={editingCustomer()} fallback='Create'>
										Update
									</Show>
								</button>
							</div>
						</form>
					</div>
				</div>
			</Show>
		</div>
	)
}
