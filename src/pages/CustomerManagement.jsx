import { For, Show, createSignal, onMount } from 'solid-js'
import { formatDate } from '../lib/utils.js'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Select } from '../components/ui/Select.jsx'
import CustomerDialog from '../components/CustomerDialog.jsx'
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
								<td>{formatDate(customer.createdAt)}</td>
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

			<CustomerDialog
				open={showModal()}
				onOpenChange={setShowModal}
				editingCustomer={editingCustomer}
				formData={formData}
				setFormData={setFormData}
				handleSubmit={handleSubmit}
				closeModal={closeModal}
			/>
		</div>
	)
}
