import { useEffect, useState } from 'react'
import SalesTrendChart from '../components/charts/SalesTrendChart.jsx'
import CustomerGrowthChart from '../components/charts/CustomerGrowthChart.jsx'
import CategoriesChart from '../components/charts/CategoriesChart.jsx'
import { mockDashboardAPI } from '../mocks/mockAPI.js'

const formatCurrency = value=> new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

const statCards = stats=> [
	{
		label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: 'payments', trend: '+12.5%', positive: true,
	},
	{
		label: 'Total Customers', value: stats.totalCustomers, icon: 'person_add', trend: '+8.3%', positive: true,
	},
	{
		label: 'Total Orders', value: stats.totalOrders, icon: 'shopping_cart', trend: '+15.2%', positive: true,
	},
	{
		label: 'Avg Order Value', value: formatCurrency(stats.avgOrderValue), icon: 'show_chart', trend: '-2.1%', positive: false,
	},
]

export default function Dashboard(){
	const [stats, setStats] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(()=> {
		// eslint-disable-next-line promise/catch-or-return
		mockDashboardAPI.getStats()
			.then((response)=> {
				if (response.success){
					setStats(response.data)
				}
				return null
			})
			.catch(error=> console.error('Error loading dashboard stats:', error))
			.finally(()=> setLoading(false))
	}, [])

	if (loading){
		return (
			<div className='page-content'>
				<div className='loading'>Loading dashboard...</div>
			</div>
		)
	}

	return (
		<div className='page-content'>
			<div className='page-header'>
				<h2 className='page-title'>Dashboard</h2>
				<p className='page-subtitle'>Welcome back, here&apos;s what&apos;s happening today.</p>
			</div>
			<div className='stats-grid'>
				{statCards(stats).map(card=> (
					<div className='stat-card' key={card.label}>
						<div className='stat-card-top'>
							<div className='stat-icon'>
								<span className='material-symbols-outlined'>
									{card.icon}
								</span>
							</div>
							<span className={`stat-trend ${card.positive ? 'positive' : 'negative'}`}>
								{card.trend}
								<span className='material-symbols-outlined' style={{ fontSize: '16px' }}>
									{card.positive ? 'trending_up' : 'trending_down'}
								</span>
							</span>
						</div>
						<div className='stat-label'>
							{card.label}
						</div>
						<div className='stat-value'>
							{card.value}
						</div>
					</div>
				))}
			</div>
			<SalesTrendChart />
			<div className='charts-grid'>
				<CustomerGrowthChart />
				<CategoriesChart />
			</div>
		</div>
	)
}
