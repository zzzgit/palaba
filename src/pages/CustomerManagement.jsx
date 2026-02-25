import { For, Show, createSignal, onMount } from 'solid-js'
import { Button } from '../components/ui/button.jsx'
import { Input } from '../components/ui/input.jsx'
import { Select } from '../components/ui/select.jsx'
import {
	Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from '../components/ui/dialog.jsx'
import { createCustomer, deleteCustomerById, getCustomers, updateCustomer } from '../js/api.js'
import Confirm from '../components/Confirm.jsx'
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
		gender: 'M',
		phone: '',
		extra: '',
	})

	onMount(()=> {
		loadCustomers()
	})

	const loadCustomers = ()=> {
		setLoading(true)
		return getCustomers()
			.then((response)=> {
				setCustomers(response.data)
				setFilteredCustomers(response.data)
				return response
			})
			.catch((error)=> {
				console.error('Error loading customers:', error)
				throw error
			})
			.finally(()=> {
				setLoading(false)
			})
	}

	const handleSearch = (value)=> {
		setSearchTerm(value)
		filterCustomers(value)
	}

	const filterCustomers = (search)=> {
		let filtered = customers()

		if (search){
			const searchLower = search.toLowerCase()
			filtered = filtered.filter((c)=> {
				const nameMatch = c.name.toLowerCase().includes(searchLower)
				const phoneMatch = c.phone && c.phone.toLowerCase().includes(searchLower)
				return nameMatch || phoneMatch
			})
		}

		setFilteredCustomers(filtered)
	}

	const openModal = (customer = null)=> {
		if (customer){
			setEditingCustomer(customer)
			setFormData({
				name: customer.name,
				gender: customer.gender || 'M',
				phone: customer.phone || '',
				extra: customer.extra || '',
			})
		} else {
			setEditingCustomer(null)
			setFormData({
				name: '', gender: 'M', phone: '', extra: '',
			})
		}
		setShowModal(true)
	}

	const closeModal = ()=> {
		setShowModal(false)
		setEditingCustomer(null)
		setFormData({
			name: '', gender: 'M', phone: '', extra: '',
		})
	}

	const handleSubmit = (e)=> {
		e.preventDefault()
		const apiCall = editingCustomer() ? updateCustomer(editingCustomer().id, formData()) : createCustomer(formData())

		apiCall
			.then(()=> loadCustomers())
			.then(()=> {
				closeModal()
				return undefined
			})
			.catch((error)=> {
				console.error('Error saving customer:', error)
			})
	}

	const handleDelete = (id)=> {
		Confirm.it('Are you sure you want to delete this customer?')
			.then((confirmed)=> {
				if (confirmed){
					return deleteCustomerById(id)
				}
				return Promise.resolve()
			})
			.then((result)=> {
				if (result !== undefined){
					return loadCustomers()
				}
				return Promise.resolve()
			})
			.catch((error)=> {
				console.error('Error deleting customer:', error)
			})
	}

	return (
		<div class='container'>
			<div class='table-container'>
				<div class='table-header'>
					<h3 class='card-title'>Customers</h3>
					<div class='table-actions'>
						<Input
							type='text'
							placeholder='Search customers...'
							value={searchTerm()}
							onInput={e=> handleSearch(e.target.value)}
						/>
						<Button onClick={()=> openModal()}>
							+ Add Customer
						</Button>
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
									<Button
										variant='secondary'
										size='sm'
										onClick={()=> openModal(customer)}
									>
										Edit
									</Button>
									<Button
										variant='secondary'
										size='sm'
										onClick={()=> handleDelete(customer.id)}
									>
										Delete
									</Button>
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
			<Dialog open={showModal()} onOpenChange={setShowModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							<Show when={editingCustomer()} fallback='Add New Customer'>
								Edit Customer
							</Show>
						</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<div style={{ 'margin-bottom': '16px' }}>
							<label style={{
								display: 'block', 'margin-bottom': '8px', 'font-weight': '500',
							}}>
								Name
							</label>
							<Input
								type='text'
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
							<Select
								value={formData().gender}
								onChange={e=> setFormData({ ...formData(), gender: e.target.value })}
							>
								<option value='M'>Male</option>
								<option value='F'>Female</option>
								<option value='OTHER'>Other</option>
							</Select>
						</div>
						<div style={{ 'margin-bottom': '16px' }}>
							<label style={{
								display: 'block', 'margin-bottom': '8px', 'font-weight': '500',
							}}>
								Phone
							</label>
							<Input
								type='tel'
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
								class='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
								style={{ 'min-height': '80px' }}
								value={formData().extra}
								onInput={e=> setFormData({ ...formData(), extra: e.target.value })}
							/>
						</div>
						<DialogFooter>
							<Button variant='outline' onClick={closeModal}>
								Cancel
							</Button>
							<Button type='submit'>
								<Show when={editingCustomer()} fallback='Create'>
									Update
								</Show>
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	)
}
