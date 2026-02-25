import { Show, createSignal, onMount } from 'solid-js'
import { Pie } from 'solid-chartjs'
import {
	ArcElement,
	Chart as ChartJS,
	Legend,
	Title,
	Tooltip,
} from 'chart.js'
import { mockDashboardAPI } from '../../mocks/mockAPI.js'
import '../../styles/global.css'

ChartJS.register(ArcElement, Title, Tooltip, Legend)

export default function CategoriesChart(){
	const [chartData, setChartData] = createSignal(null)
	const [loading, setLoading] = createSignal(true)

	onMount(async()=> {
		try {
			const response = await mockDashboardAPI.getCategories()
			if (response.success){
				setChartData(response.data)
			}
		} catch(error){
			console.error('Error loading categories:', error)
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
				position: 'right',
				labels: {
					color: '#cbd5e1',
					font: {
						family: "'Inter', sans-serif",
						size: 13,
						weight: '500',
					},
					padding: 16,
				},
			},
			title: {
				display: false,
			},
		},
	}

	return (
		<div class='chart-container'>
			<h3 class='card-title'>Sales by Category</h3>
			<Show when={loading()} fallback={<Show when={chartData()}>
				<Pie data={chartData()} options={options} />
			</Show>}>
				<div class='loading'>Loading chart...</div>
			</Show>
		</div>
	)
}
