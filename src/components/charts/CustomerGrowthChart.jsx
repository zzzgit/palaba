import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { mockDashboardAPI } from '../../mocks/mockAPI.js'

const options = {
	responsive: true,
	maintainAspectRatio: true,
	aspectRatio: 1.5,
	plugins: {
		legend: {
			display: true,
			position: 'top',
			labels: {
				color: '#475569',
				font: {
					family: '\'Inter\', sans-serif', size: 13, weight: '500',
				},
			},
		},
		title: { display: false },
	},
	scales: {
		y: {
			beginAtZero: true,
			grid: { color: 'rgba(148, 163, 184, 0.15)', drawBorder: false },
			ticks: {
				stepSize: 10,
				color: '#94a3b8',
				font: { family: '\'Inter\', sans-serif', size: 12 },
			},
		},
		x: {
			grid: { display: false },
			ticks: { color: '#94a3b8', font: { family: '\'Inter\', sans-serif', size: 12 } },
		},
	},
}

export default function CustomerGrowthChart(){
	const [chartData, setChartData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(()=> {
		// eslint-disable-next-line promise/catch-or-return
		mockDashboardAPI.getCustomerGrowth()
			.then((response)=> {
				if (response.success){
					setChartData(response.data)
				}
				return null
			})
			.catch(error=> console.error('Error loading customer growth:', error))
			.finally(()=> setLoading(false))
	}, [])

	return (
		<div className='chart-container'>
			<div className='chart-header'>
				<h3 className='chart-title'>Customer Growth</h3>
			</div>
			{loading ? <div className='loading'>Loading chart...</div> : chartData && <Bar data={chartData} options={options} />}
		</div>
	)
}
