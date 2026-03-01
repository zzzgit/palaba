import { useEffect, useState } from 'react'
import {
	Avatar, ButtonGroup, Flex, IconButton, Pagination, Table, Text,
} from '@chakra-ui/react'
import { formatDate } from '../lib/utils.js'
import CustomerDialog from '../components/CustomerDialog.jsx'
import { createCustomer, deleteCustomerById, getCustomers, updateCustomer } from '../js/api.js'
import Confirm from '../components/Confirm.jsx'

const emptyForm = {
	name: '', gender: 'M', phone: '', extra: '',
}
const PAGE_SIZE = 10

export default function CustomerManagement(){
	const [customers, setCustomers] = useState([])
	const [pagination, setPagination] = useState({ total: 0, totalPages: 0 })
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [inputValue, setInputValue] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [showModal, setShowModal] = useState(false)
	const [editingCustomer, setEditingCustomer] = useState(null)
	const [formData, setFormData] = useState(emptyForm)

	const loadCustomers = ()=> {
		setLoading(true)
		const params = searchTerm ? { 'name[like]': searchTerm } : {}
		return getCustomers(params, { currentPage, pageSize: PAGE_SIZE })
			.then((response)=> {
				setCustomers(response.data)
				setPagination(response.meta.pagination)
				return response
			})
			.catch((error)=> {
				console.error('Error loading customers:', error)
				throw error
			})
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
			setFormData({
				name: customer.name, gender: customer.gender || 'M', phone: customer.phone || '', extra: customer.extra || '',
			})
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
		const apiCall = editingCustomer ? updateCustomer(editingCustomer.id, formData) : createCustomer(formData)
		apiCall.then(()=> loadCustomers()).then(()=> closeModal())
			.catch(error=> console.error('Error saving customer:', error))
	}

	const handleDelete = (id)=> {
		Confirm.it('Are you sure you want to delete this customer?')
			.then((confirmed)=> {
				return confirmed ? deleteCustomerById(id) : null
			})
			.then((result)=> {
				if (result !== null){
					loadCustomers()
				}
				return result
			})
			.catch(error=> console.error('Error deleting customer:', error))
	}

	const startItem = (currentPage - 1) * PAGE_SIZE + 1
	const endItem = Math.min(currentPage * PAGE_SIZE, pagination.total)

	return (
		<div className='page-content'>
			<div
				className='page-header' style={{
					display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
				}}
			>
				<div>
					<h2 className='page-title'>Customer Management</h2>
					<p className='page-subtitle'>View, search, and manage your platform&apos;s user base.</p>
				</div>
				<button className='btn btn-primary' onClick={()=> openModal()} type='button'>
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
								onChange={(e)=> {
									const value = e.target.value
									setInputValue(value)
									if (value === ''){ handleSearch('') }
								}}
								onKeyDown={e=> e.key === 'Enter' && handleSearch(inputValue)}
								placeholder='Search customers...'
								type='text'
								value={inputValue}
							/>
						</div>
					</div>
				</div>
				{loading && <div className='loading'>Loading customers...</div>}
				{!loading && (
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
												<Avatar.Root size='sm'>
													<Avatar.Fallback name={customer.name} />
												</Avatar.Root>
												<span style={{ fontWeight: '600' }}>
													{customer.name}
												</span>
											</div>
										</Table.Cell>
										<Table.Cell color='var(--ink-600)'>
											{customer.gender || '-'}
										</Table.Cell>
										<Table.Cell color='var(--ink-600)'>
											{customer.phone || '-'}
										</Table.Cell>
										<Table.Cell color='var(--ink-600)'>
											{customer.extra || '-'}
										</Table.Cell>
										<Table.Cell color='var(--ink-600)'>
											{formatDate(customer.createdAt)}
										</Table.Cell>
										<Table.Cell>
											<div className='table-actions-cell' style={{ justifyContent: 'flex-end' }}>
												<button className='btn-ghost' onClick={()=> openModal(customer)} title='Edit' type='button'>
													<span className='material-symbols-outlined' style={{ fontSize: '18px' }}>edit</span>
												</button>
												<button className='btn-ghost btn-ghost-danger' onClick={()=> handleDelete(customer.id)} title='Delete' type='button'>
													<span className='material-symbols-outlined' style={{ fontSize: '18px' }}>delete</span>
												</button>
											</div>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</Table.ScrollArea>
				) }
				{customers.length === 0 && !loading && (
					<div className='empty-state'>
						<div className='empty-state-icon'>
							<span className='material-symbols-outlined' style={{ fontSize: '48px' }}>inbox</span>
						</div>
						<div className='empty-state-text'>No customers found</div>
					</div>
				)}
				{!loading && pagination.totalPages > 1 && (
					<Flex
						align='center' borderColor='gray.200' borderTop='1px solid' justify='space-between'
						px={4} py={3}
					>
						<Text color='gray.500' fontSize='sm'>
							Showing
							{' '}
							{startItem}
							–
							{endItem}
							{' '}
							of
							{' '}
							{pagination.total}
						</Text>
						<Pagination.Root
							count={pagination.total}
							onPageChange={e=> setCurrentPage(e.page)}
							page={currentPage}
							pageSize={PAGE_SIZE}
						>
							<ButtonGroup size='sm' variant='ghost'>
								<Pagination.PrevTrigger asChild>
									<IconButton aria-label='Previous page'>
										<span className='material-symbols-outlined' style={{ fontSize: '20px' }}>chevron_left</span>
									</IconButton>
								</Pagination.PrevTrigger>
								<Pagination.Items
									render={page=> (
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
				closeModal={closeModal}
				editingCustomer={editingCustomer}
				formData={formData}
				handleSubmit={handleSubmit}
				open={showModal}
				setFormData={setFormData}
			/>
		</div>
	)
}
