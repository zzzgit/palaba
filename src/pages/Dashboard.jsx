import { createSignal, onMount } from 'solid-js'
import SalesTrendChart from '../components/charts/SalesTrendChart.jsx'
import CustomerGrowthChart from '../components/charts/CustomerGrowthChart.jsx'
import CategoriesChart from '../components/charts/CategoriesChart.jsx'
import { mockDashboardAPI } from '../mocks/mockAPI.js'
import '../styles/global.css'

export default function Dashboard(){
	const [stats, setStats] = createSignal(null)
	const [loading, setLoading] = createSignal(true)

	onMount(async()=> {
		try {
			const response = await mockDashboardAPI.getStats()
			if (response.success){
				setStats(response.data)
			}
		} catch(error){
			console.error('Error loading dashboard stats:', error)
		} finally {
			setLoading(false)
		}
	})

	const formatCurrency = (value)=> {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(value)
	}

	return (
		<div class='container'>
			{loading()
? <div class='loading'>Loading dashboard...</div>
: <>
				<div class='stats-grid'>
					<div class='stat-card'>
						<div class='stat-label'>Total Revenue</div>
						<div class='stat-value'>{formatCurrency(stats().totalRevenue)}</div>
						<div class='stat-change positive'>↑ 12.5%</div>
					</div>
					<div class='stat-card'>
						<div class='stat-label'>Total Customers</div>
						<div class='stat-value'>{stats().totalCustomers}</div>
						<div class='stat-change positive'>↑ 8.3%</div>
					</div>
					<div class='stat-card'>
						<div class='stat-label'>Total Orders</div>
						<div class='stat-value'>{stats().totalOrders}</div>
						<div class='stat-change positive'>↑ 15.2%</div>
					</div>
					<div class='stat-card'>
						<div class='stat-label'>Avg Order Value</div>
						<div class='stat-value'>{formatCurrency(stats().avgOrderValue)}</div>
						<div class='stat-change negative'>↓ 2.1%</div>
					</div>
				</div>

				<SalesTrendChart />

				<div class='charts-grid'>
					<CustomerGrowthChart />
					<CategoriesChart />
				</div>
			</>
			}
		</div>
	)
}
