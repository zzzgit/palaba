import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { mockDashboardAPI } from '../../mocks/mockAPI.js'

const options = {
	responsive: true,
	maintainAspectRatio: true,
	aspectRatio: 2,
	plugins: {
		legend: {
			display: true,
			position: 'top',
			labels: {
				color: '#475569',
				font: { family: "'Inter', sans-serif", size: 13, weight: '500' },
			},
		},
		title: { display: false },
	},
	scales: {
		y: {
			beginAtZero: true,
			grid: { color: 'rgba(148, 163, 184, 0.15)', drawBorder: false },
			ticks: {
				color: '#94a3b8',
				callback: value=> '$' + value.toLocaleString(),
				font: { family: "'Inter', sans-serif", size: 12 },
			},
		},
		x: {
			grid: { display: false },
			ticks: { color: '#94a3b8', font: { family: "'Inter', sans-serif", size: 12 } },
		},
	},
}

export default function SalesTrendChart(){
	const [chartData, setChartData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(()=> {
		mockDashboardAPI.getSalesTrend()
			.then((response)=> { if (response.success) setChartData(response.data) })
			.catch((error)=> console.error('Error loading sales trend:', error))
			.finally(()=> setLoading(false))
	}, [])

	return (
		<div className='chart-container full-width'>
			<div className='chart-header'><h3 className='chart-title'>Sales Trend</h3></div>
			{loading
				? <div className='loading'>Loading chart...</div>
				: chartData && <Line data={chartData} options={options} />
			}
		</div>
	)
}
