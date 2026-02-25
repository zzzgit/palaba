import { Show, createSignal, onMount } from 'solid-js'
import { Bar } from 'solid-chartjs'
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js'
import { mockDashboardAPI } from '../../mocks/mockAPI.js'
import '../../styles/global.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function CustomerGrowthChart(){
	const [chartData, setChartData] = createSignal(null)
	const [loading, setLoading] = createSignal(true)

	onMount(async()=> {
		try {
			const response = await mockDashboardAPI.getCustomerGrowth()
			if (response.success){
				setChartData(response.data)
			}
		} catch(error){
			console.error('Error loading customer growth:', error)
		} finally {
			setLoading(false)
		}
	})

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		aspectRatio: 1.5,
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
					stepSize: 10,
					color: '#94a3b8',
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
		<div class='chart-container'>
			<h3 class='card-title'>Customer Growth</h3>
			<Show when={loading()} fallback={<Show when={chartData()}>
				<Bar data={chartData()} options={options} />
			</Show>}>
				<div class='loading'>Loading chart...</div>
			</Show>
		</div>
	)
}
