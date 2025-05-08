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
import { Box } from '@chakra-ui/react';

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
        backgroundColor: 'rgba(41, 128, 185, 0.8)', // Blue
        borderColor: 'rgba(41, 128, 185, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Capped Customers Revenue',
        data: data.map(bank => bank.revenueAtCap * 12), // Annual
        backgroundColor: 'rgba(243, 156, 18, 0.8)', // Yellow/Orange
        borderColor: 'rgba(243, 156, 18, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Payment Initiation Revenue',
        data: data.map(bank => bank.paymentInitiationRevenue * 12), // Annual
        backgroundColor: 'rgba(39, 174, 96, 0.8)', // Green
        borderColor: 'rgba(39, 174, 96, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 13,
            weight: 'bold'
          },
          padding: 15
        }
      },
      title: {
        display: true,
        text: 'Annual Revenue by Source (NZD)',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
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
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 12
          },
          callback: function(value) {
            return '$' + Number(value).toLocaleString('en-NZ');
          }
        }
      }
    }
  };

  return (
    <Box height="100%">
      <Bar data={chartData} options={options} />
    </Box>
  );
};