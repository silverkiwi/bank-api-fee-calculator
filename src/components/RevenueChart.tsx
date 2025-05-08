import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BankRevenue = {
  name: string;
  color: string;
  annualRevenue: number;
  totalMonthlyRevenue: number;
  revenueBelowCap: number;
  revenueAtCap: number;
  paymentInitiationRevenue: number;
};

type RevenueChartProps = {
  data: BankRevenue[];
};

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const chartData: ChartData<'bar'> = {
    labels: data.map(bank => bank.name),
    datasets: [
      {
        label: 'Annual Revenue (NZD)',
        data: data.map(bank => bank.annualRevenue),
        backgroundColor: data.map(bank => bank.color),
        borderColor: data.map(bank => bank.color),
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Projected Annual API Fee Revenue by Bank',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw as number;
            return `$${value.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + Number(value).toLocaleString('en-NZ');
          }
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};