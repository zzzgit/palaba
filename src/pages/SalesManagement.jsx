import { useEffect, useState } from 'react'
import { ButtonGroup, Flex, IconButton, Pagination, Table, Text } from '@chakra-ui/react'
import { mockSalesAPI } from '../mocks/mockAPI.js'

const PAGE_SIZE = 10

const formatCurrency = (value)=> new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

const statusBadge = {
	completed: 'badge-success',
	processing: 'badge-warning',
	pending:    'badge-info',
	cancelled:  'badge-error',
}

export default function SalesManagement(){
	const [sales, setSales] = useState([])
	const [filteredSales, setFilteredSales] = useState([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(()=> { loadSales() }, [])

	const loadSales = async()=> {
		setLoading(true)
		try {
			const response = await mockSalesAPI.getAll()
			if (response.success){ setSales(response.data); setFilteredSales(response.data) }
		} catch(error){
			console.error('Error loading sales:', error)
		} finally {
			setLoading(false)
		}
	}

	const applyFilters = (search, status, source)=> {
		let filtered = source
		if (search) filtered = filtered.filter(s=>
			s.customerName.toLowerCase().includes(search.toLowerCase()) || s.id.toString().includes(search)
		)
		if (status !== 'all') filtered = filtered.filter(s=> s.status === status)
		setFilteredSales(filtered)
		setCurrentPage(1)
	}

	const handleSearch = (value)=> { setSearchTerm(value); applyFilters(value, statusFilter, sales) }
	const handleStatusFilter = (value)=> { setStatusFilter(value); applyFilters(searchTerm, value, sales) }

	const handleUpdateStatus = async(id, newStatus)=> {
		try { await mockSalesAPI.updateStatus(id, newStatus); await loadSales() }
		catch(error){ console.error('Error updating status:', error) }
	}

	const totalRevenue = filteredSales.reduce((sum, s)=> sum + s.amount, 0)
	const avgOrder = filteredSales.length > 0 ? totalRevenue / filteredSales.length : 0

	const totalPages = Math.ceil(filteredSales.length / PAGE_SIZE)
	const pagedSales = filteredSales.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
	const startItem = (currentPage - 1) * PAGE_SIZE + 1
	const endItem = Math.min(currentPage * PAGE_SIZE, filteredSales.length)

	return (
		<div className='page-content'>
			<div className='page-header'>
				<h2 className='page-title'>Sales Management</h2>
				<p className='page-subtitle'>Track orders, revenue, and transaction statuses.</p>
			</div>

			<div className='stats-grid' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
				<div className='stat-card'>
					<div className='stat-card-top'>
						<div className='stat-icon'>
							<span className='material-symbols-outlined'>shopping_cart</span>
						</div>
					</div>
					<div className='stat-label'>Total Orders</div>
					<div className='stat-value'>{filteredSales.length}</div>
				</div>
				<div className='stat-card'>
					<div className='stat-card-top'>
						<div className='stat-icon'>
							<span className='material-symbols-outlined'>payments</span>
						</div>
					</div>
					<div className='stat-label'>Total Revenue</div>
					<div className='stat-value'>{formatCurrency(totalRevenue)}</div>
				</div>
				<div className='stat-card'>
					<div className='stat-card-top'>
						<div className='stat-icon'>
							<span className='material-symbols-outlined'>show_chart</span>
						</div>
					</div>
					<div className='stat-label'>Average Order</div>
					<div className='stat-value'>{formatCurrency(avgOrder)}</div>
				</div>
			</div>

			<div className='table-container'>
				<div className='table-header'>
					<span className='table-title'>Sales Transactions</span>
					<div className='table-actions'>
						<div className='search-wrapper'>
							<span className='material-symbols-outlined search-icon'>search</span>
							<input
								className='search-box'
								type='text'
								placeholder='Search by customer or order ID...'
								value={searchTerm}
								onChange={e=> handleSearch(e.target.value)}
							/>
						</div>
						<select
							className='filter-select'
							value={statusFilter}
							onChange={e=> handleStatusFilter(e.target.value)}
						>
							<option value='all'>All Status</option>
							<option value='completed'>Completed</option>
							<option value='processing'>Processing</option>
							<option value='pending'>Pending</option>
						</select>
					</div>
				</div>

				{loading ? (
					<div className='loading'>Loading sales...</div>
				) : (
					<Table.ScrollArea maxH='calc(100vh - 500px)'>
						<Table.Root size='sm' stickyHeader>
							<Table.Header>
								<Table.Row bg='bg.subtle'>
									<Table.ColumnHeader>Order ID</Table.ColumnHeader>
									<Table.ColumnHeader>Customer</Table.ColumnHeader>
									<Table.ColumnHeader>Date</Table.ColumnHeader>
									<Table.ColumnHeader>Items</Table.ColumnHeader>
									<Table.ColumnHeader>Amount</Table.ColumnHeader>
									<Table.ColumnHeader>Status</Table.ColumnHeader>
									<Table.ColumnHeader textAlign='end'>Actions</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{pagedSales.map(sale=> (
									<Table.Row key={sale.id}>
										<Table.Cell color='var(--ink-500)' fontWeight='500'>#{sale.id}</Table.Cell>
										<Table.Cell fontWeight='600'>{sale.customerName}</Table.Cell>
										<Table.Cell color='var(--ink-600)'>{sale.orderDate}</Table.Cell>
										<Table.Cell color='var(--ink-600)'>{sale.items}</Table.Cell>
										<Table.Cell fontWeight='600'>{formatCurrency(sale.amount)}</Table.Cell>
										<Table.Cell>
											<span className={`badge ${statusBadge[sale.status] || 'badge-neutral'}`}>
												{sale.status}
											</span>
										</Table.Cell>
										<Table.Cell>
											<div className='table-actions-cell' style={{ justifyContent: 'flex-end' }}>
												{sale.status === 'pending' && (
													<button
														className='btn btn-secondary btn-sm'
														onClick={()=> handleUpdateStatus(sale.id, 'processing')}
													>
														Process
													</button>
												)}
												{sale.status === 'processing' && (
													<button
														className='btn btn-primary btn-sm'
														onClick={()=> handleUpdateStatus(sale.id, 'completed')}
													>
														Complete
													</button>
												)}
											</div>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</Table.ScrollArea>
				)}

				{filteredSales.length === 0 && !loading && (
					<div className='empty-state'>
						<div className='empty-state-icon'>
							<span className='material-symbols-outlined' style={{ fontSize: '48px' }}>inventory_2</span>
						</div>
						<div className='empty-state-text'>No sales transactions found</div>
					</div>
				)}

				{!loading && totalPages > 1 && (
					<Flex align='center' justify='space-between' px={4} py={3} borderTop='1px solid' borderColor='gray.200'>
						<Text fontSize='sm' color='gray.500'>
							Showing {startItem}–{endItem} of {filteredSales.length}
						</Text>
						<Pagination.Root
							count={filteredSales.length}
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
		</div>
	)
}
