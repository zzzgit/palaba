import { Show, createSignal, onMount } from 'solid-js'
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
				labels: {
					color: '#cbd5e1',
					font: {
						family: "'Inter', sans-serif",
						size: 13,
						weight: '500',
					},
				},
			},
			title: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: 'rgba(148, 163, 184, 0.1)',
					drawBorder: false,
				},
				ticks: {
					color: '#94a3b8',
					callback: value=> '$' + value.toLocaleString(),
					font: {
						family: "'Inter', sans-serif",
						size: 12,
					},
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: '#94a3b8',
					font: {
						family: "'Inter', sans-serif",
						size: 12,
					},
				},
			},
		},
	}

	return (
		<div class='chart-container full-width'>
			<h3 class='card-title'>Sales Trend</h3>
			<Show when={loading()} fallback={<Show when={chartData()}>
				<Line data={chartData()} options={options} />
			</Show>}>
				<div class='loading'>Loading chart...</div>
			</Show>
		</div>
	)
}
