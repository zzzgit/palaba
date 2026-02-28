import { useEffect, useState } from 'react'
import { ButtonGroup, Flex, IconButton, Pagination, Table, Text } from '@chakra-ui/react'
import { formatDate } from '../lib/utils.js'
import CustomerDialog from '../components/CustomerDialog.jsx'
import { createCustomer, deleteCustomerById, searchCustomers, updateCustomer } from '../js/api.js'
import Confirm from '../components/Confirm.jsx'

const emptyForm = { name: '', gender: 'M', phone: '', extra: '' }
const PAGE_SIZE = 10

function getInitials(name){
	return name.split(' ').map(p=> p[0]).join('').toUpperCase().slice(0, 2)
}

export default function CustomerManagement(){
	const [customers, setCustomers] = useState([])
	const [pagination, setPagination] = useState({ total: 0, totalPages: 0 })
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [showModal, setShowModal] = useState(false)
	const [editingCustomer, setEditingCustomer] = useState(null)
	const [formData, setFormData] = useState(emptyForm)

	const loadCustomers = ()=> {
		setLoading(true)
		const params = searchTerm ? { search: searchTerm } : {}
		return searchCustomers(params, { currentPage, pageSize: PAGE_SIZE })
			.then((response)=> {
				setCustomers(response.data)
				setPagination(response.meta.pagination)
			})
			.catch((error)=> console.error('Error loading customers:', error))
			.finally(()=> setLoading(false))
	}

	useEffect(()=> { loadCustomers() }, [currentPage, searchTerm])

	const handleSearch = (value)=> {
		setSearchTerm(value)
		setCurrentPage(1)
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

	const startItem = (currentPage - 1) * PAGE_SIZE + 1
	const endItem = Math.min(currentPage * PAGE_SIZE, pagination.total)

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
					<Table.ScrollArea maxH='calc(100vh - 340px)'>
						<Table.Root size='sm' stickyHeader>
							<Table.Header>
								<Table.Row bg='bg.subtle'>
									<Table.ColumnHeader>Name</Table.ColumnHeader>
									<Table.ColumnHeader>Gender</Table.ColumnHeader>
									<Table.ColumnHeader>Phone</Table.ColumnHeader>
									<Table.ColumnHeader>Extra Info</Table.ColumnHeader>
									<Table.ColumnHeader>Created</Table.ColumnHeader>
									<Table.ColumnHeader textAlign='end'>Actions</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{customers.map(customer=> (
									<Table.Row key={customer.id}>
										<Table.Cell>
											<div className='customer-cell'>
												<div className='avatar-initials'>{getInitials(customer.name)}</div>
												<span style={{ fontWeight: '600' }}>{customer.name}</span>
											</div>
										</Table.Cell>
										<Table.Cell color='var(--ink-600)'>{customer.gender || '-'}</Table.Cell>
										<Table.Cell color='var(--ink-600)'>{customer.phone || '-'}</Table.Cell>
										<Table.Cell color='var(--ink-600)'>{customer.extra || '-'}</Table.Cell>
										<Table.Cell color='var(--ink-600)'>{formatDate(customer.createdAt)}</Table.Cell>
										<Table.Cell>
											<div className='table-actions-cell' style={{ justifyContent: 'flex-end' }}>
												<button className='btn-ghost' title='Edit' onClick={()=> openModal(customer)}>
													<span className='material-symbols-outlined' style={{ fontSize: '18px' }}>edit</span>
												</button>
												<button className='btn-ghost btn-ghost-danger' title='Delete' onClick={()=> handleDelete(customer.id)}>
													<span className='material-symbols-outlined' style={{ fontSize: '18px' }}>delete</span>
												</button>
											</div>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</Table.ScrollArea>
				)}

				{customers.length === 0 && !loading && (
					<div className='empty-state'>
						<div className='empty-state-icon'>
							<span className='material-symbols-outlined' style={{ fontSize: '48px' }}>inbox</span>
						</div>
						<div className='empty-state-text'>No customers found</div>
					</div>
				)}

				{!loading && pagination.totalPages > 1 && (
					<Flex align='center' justify='space-between' px={4} py={3} borderTop='1px solid' borderColor='gray.200'>
						<Text fontSize='sm' color='gray.500'>
							Showing {startItem}–{endItem} of {pagination.total}
						</Text>
						<Pagination.Root
							count={pagination.total}
							pageSize={PAGE_SIZE}
							page={currentPage}
							onPageChange={e=> setCurrentPage(e.page)}
						>
							<ButtonGroup variant='ghost' size='sm'>
								<Pagination.PrevTrigger asChild>
									<IconButton aria-label='Previous page'>
										<span className='material-symbols-outlined' style={{ fontSize: '20px' }}>chevron_left</span>
									</IconButton>
								</Pagination.PrevTrigger>
								<Pagination.Items
									render={(page)=> (
										<IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
											{page.value}
										</IconButton>
									)}
								/>
								<Pagination.NextTrigger asChild>
									<IconButton aria-label='Next page'>
										<span className='material-symbols-outlined' style={{ fontSize: '20px' }}>chevron_right</span>
									</IconButton>
								</Pagination.NextTrigger>
							</ButtonGroup>
						</Pagination.Root>
					</Flex>
				)}
			</div>

			<CustomerDialog
				open={showModal}
				editingCustomer={editingCustomer}
				formData={formData}
				setFormData={setFormData}
				handleSubmit={handleSubmit}
				closeModal={closeModal}
			/>
		</div>
	)
}
