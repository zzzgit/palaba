import { createSignal, onMount } from 'solid-js';
import { Bar } from 'solid-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { mockDashboardAPI } from '../../mocks/mockAPI.js';
import '../styles/global.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CustomerGrowthChart() {
  const [chartData, setChartData] = createSignal(null);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const response = await mockDashboardAPI.getCustomerGrowth();
      if (response.success) {
        setChartData(response.data);
      }
    } catch (error) {
      console.error('Error loading customer growth:', error);
    } finally {
      setLoading(false);
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  return (
    <div class="chart-container">
      <h3 class="card-title">Customer Growth</h3>
      {loading() ? (
        <div class="loading">Loading chart...</div>
      ) : (
        chartData() && <Bar data={chartData()} options={options} />
      )}
    </div>
  );
}
