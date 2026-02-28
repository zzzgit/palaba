import { useEffect, useState } from 'react'
import { mockSalesAPI } from '../mocks/mockAPI.js'

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
	}

	const handleSearch = (value)=> { setSearchTerm(value); applyFilters(value, statusFilter, sales) }
	const handleStatusFilter = (value)=> { setStatusFilter(value); applyFilters(searchTerm, value, sales) }

	const handleUpdateStatus = async(id, newStatus)=> {
		try { await mockSalesAPI.updateStatus(id, newStatus); await loadSales() }
		catch(error){ console.error('Error updating status:', error) }
	}

	const totalRevenue = filteredSales.reduce((sum, s)=> sum + s.amount, 0)
	const avgOrder = filteredSales.length > 0 ? totalRevenue / filteredSales.length : 0

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
					<table>
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Customer</th>
								<th>Date</th>
								<th>Items</th>
								<th>Amount</th>
								<th>Status</th>
								<th style={{ textAlign: 'right' }}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredSales.map(sale=> (
								<tr key={sale.id}>
									<td style={{ color: 'var(--ink-500)', fontWeight: '500' }}>#{sale.id}</td>
									<td style={{ fontWeight: '600' }}>{sale.customerName}</td>
									<td style={{ color: 'var(--ink-600)' }}>{sale.orderDate}</td>
									<td style={{ color: 'var(--ink-600)' }}>{sale.items}</td>
									<td style={{ fontWeight: '600' }}>{formatCurrency(sale.amount)}</td>
									<td>
										<span className={`badge ${statusBadge[sale.status] || 'badge-neutral'}`}>
											{sale.status}
										</span>
									</td>
									<td>
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
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}

				{filteredSales.length === 0 && !loading && (
					<div className='empty-state'>
						<div className='empty-state-icon'>
							<span className='material-symbols-outlined' style={{ fontSize: '48px' }}>inventory_2</span>
						</div>
						<div className='empty-state-text'>No sales transactions found</div>
					</div>
				)}
			</div>
		</div>
	)
}
