import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { mockDashboardAPI } from '../../mocks/mockAPI.js'

const options = {
	responsive: true,
	maintainAspectRatio: true,
	aspectRatio: 1.5,
	plugins: {
		legend: {
			display: true,
			position: 'right',
			labels: {
				color: '#475569',
				font: { family: "'Inter', sans-serif", size: 13, weight: '500' },
				padding: 16,
			},
		},
		title: { display: false },
	},
}

export default function CategoriesChart(){
	const [chartData, setChartData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(()=> {
		mockDashboardAPI.getCategories()
			.then((response)=> { if (response.success) setChartData(response.data) })
			.catch((error)=> console.error('Error loading categories:', error))
			.finally(()=> setLoading(false))
	}, [])

	return (
		<div className='chart-container'>
			<div className='chart-header'><h3 className='chart-title'>Sales by Category</h3></div>
			{loading
				? <div className='loading'>Loading chart...</div>
				: chartData && <Pie data={chartData} options={options} />
			}
		</div>
	)
}
