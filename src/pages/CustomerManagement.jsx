import { useEffect, useState } from 'react'
import { formatDate } from '../lib/utils.js'
import CustomerDialog from '../components/CustomerDialog.jsx'
import { createCustomer, deleteCustomerById, getCustomers, updateCustomer } from '../js/api.js'
import Confirm from '../components/Confirm.jsx'

const emptyForm = { name: '', gender: 'M', phone: '', extra: '' }

function getInitials(name){
	return name.split(' ').map(p=> p[0]).join('').toUpperCase().slice(0, 2)
}

export default function CustomerManagement(){
	const [customers, setCustomers] = useState([])
	const [filteredCustomers, setFilteredCustomers] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [editingCustomer, setEditingCustomer] = useState(null)
	const [formData, setFormData] = useState(emptyForm)

	useEffect(()=> { loadCustomers() }, [])

	const loadCustomers = ()=> {
		setLoading(true)
		return getCustomers()
			.then((response)=> {
				setCustomers(response.data)
				setFilteredCustomers(response.data)
			})
			.catch((error)=> console.error('Error loading customers:', error))
			.finally(()=> setLoading(false))
	}

	const handleSearch = (value)=> {
		setSearchTerm(value)
		if (!value){ setFilteredCustomers(customers); return }
		const lower = value.toLowerCase()
		setFilteredCustomers(customers.filter(c=>
			c.name.toLowerCase().includes(lower) || (c.phone && c.phone.toLowerCase().includes(lower))
		))
	}

	const openModal = (customer = null)=> {
		if (customer){
			setEditingCustomer(customer)
			setFormData({ name: customer.name, gender: customer.gender || 'M', phone: customer.phone || '', extra: customer.extra || '' })
		} else {
			setEditingCustomer(null)
			setFormData(emptyForm)
		}
		setShowModal(true)
	}

	const closeModal = ()=> {
		setShowModal(false)
		setEditingCustomer(null)
		setFormData(emptyForm)
	}

	const handleSubmit = (e)=> {
		e.preventDefault()
		const apiCall = editingCustomer
			? updateCustomer(editingCustomer.id, formData)
			: createCustomer(formData)
		apiCall.then(()=> loadCustomers()).then(()=> closeModal())
			.catch((error)=> console.error('Error saving customer:', error))
	}

	const handleDelete = (id)=> {
		Confirm.it('Are you sure you want to delete this customer?')
			.then((confirmed)=> confirmed ? deleteCustomerById(id) : null)
			.then((result)=> { if (result !== null) loadCustomers() })
			.catch((error)=> console.error('Error deleting customer:', error))
	}

	return (
		<div className='page-content'>
			<div className='page-header' style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
				<div>
					<h2 className='page-title'>Customer Management</h2>
					<p className='page-subtitle'>View, search, and manage your platform's user base.</p>
				</div>
				<button className='btn btn-primary' onClick={()=> openModal()}>
					<span className='material-symbols-outlined' style={{ fontSize: '18px' }}>add</span>
					Add Customer
				</button>
			</div>

			<div className='table-container'>
				<div className='table-header'>
					<span className='table-title'>Customers</span>
					<div className='table-actions'>
						<div className='search-wrapper'>
							<span className='material-symbols-outlined search-icon'>search</span>
							<input
								className='search-box'
								type='text'
								placeholder='Search customers...'
								value={searchTerm}
								onChange={e=> handleSearch(e.target.value)}
							/>
						</div>
					</div>
				</div>

				{loading ? (
					<div className='loading'>Loading customers...</div>
				) : (
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Gender</th>
								<th>Phone</th>
								<th>Extra Info</th>
								<th>Created</th>
								<th style={{ textAlign: 'right' }}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredCustomers.map(customer=> (
								<tr key={customer.id}>
									<td>
										<div className='customer-cell'>
											<div className='avatar-initials'>{getInitials(customer.name)}</div>
											<span style={{ fontWeight: '600' }}>{customer.name}</span>
										</div>
									</td>
									<td style={{ color: 'var(--ink-600)' }}>{customer.gender || '-'}</td>
									<td style={{ color: 'var(--ink-600)' }}>{customer.phone || '-'}</td>
									<td style={{ color: 'var(--ink-600)' }}>{customer.extra || '-'}</td>
									<td style={{ color: 'var(--ink-600)' }}>{formatDate(customer.createdAt)}</td>
									<td>
										<div className='table-actions-cell' style={{ justifyContent: 'flex-end' }}>
											<button className='btn-ghost' title='Edit' onClick={()=> openModal(customer)}>
												<span className='material-symbols-outlined' style={{ fontSize: '18px' }}>edit</span>
											</button>
											<button className='btn-ghost btn-ghost-danger' title='Delete' onClick={()=> handleDelete(customer.id)}>
												<span className='material-symbols-outlined' style={{ fontSize: '18px' }}>delete</span>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}

				{filteredCustomers.length === 0 && !loading && (
					<div className='empty-state'>
						<div className='empty-state-icon'>
							<span className='material-symbols-outlined' style={{ fontSize: '48px' }}>inbox</span>
						</div>
						<div className='empty-state-text'>No customers found</div>
					</div>
				)}
			</div>

			<CustomerDialog
				open={showModal}
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
