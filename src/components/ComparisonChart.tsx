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

type ComparisonChartProps = {
  data: BankRevenue[];
};

export const ComparisonChart = ({ data }: ComparisonChartProps) => {
  const chartData: ChartData<'bar'> = {
    labels: data.map(bank => bank.name),
    datasets: [
      {
        label: 'API Calls Revenue (Under Cap)',
        data: data.map(bank => bank.revenueBelowCap * 12), // Annual
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Capped Customers Revenue',
        data: data.map(bank => bank.revenueAtCap * 12), // Annual
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Payment Initiation Revenue',
        data: data.map(bank => bank.paymentInitiationRevenue * 12), // Annual
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        text: 'Annual Revenue by Source (NZD)',
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
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
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