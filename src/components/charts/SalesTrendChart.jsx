import { createEffect, createSignal, onMount } from 'solid-js'
import { Line } from 'solid-chartjs'
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import { mockDashboardAPI } from '../../mocks/mockAPI.js'
import '../../styles/global.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function SalesTrendChart(){
	const [chartData, setChartData] = createSignal(null)
	const [loading, setLoading] = createSignal(true)

	onMount(async()=> {
		try {
			const response = await mockDashboardAPI.getSalesTrend()
			if (response.success){
				setChartData(response.data)
			}
		} catch(error){
			console.error('Error loading sales trend:', error)
		} finally {
			setLoading(false)
		}
	})

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		aspectRatio: 2,
		plugins: {
			legend: {
				display: true,
				position: 'top',
			},
			title: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: value=> '$' + value.toLocaleString(),
				},
			},
		},
	}

	return (
		<div class='chart-container full-width'>
			<h3 class='card-title'>Sales Trend</h3>
			{loading() ? <div class='loading'>Loading chart...</div> : chartData() && <Line data={chartData()} options={options} />
			}
		</div>
	)
}
