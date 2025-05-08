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
import { Box, Image, HStack, VStack, Text } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Bank logos mapping with direct URLs to Wikimedia Commons SVG files
const bankLogos = {
  ANZ: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/ANZ-Logo-2009.svg',
  ASB: 'https://upload.wikimedia.org/wikipedia/en/5/59/ASB_Bank_logo.svg',
  BNZ: 'https://upload.wikimedia.org/wikipedia/en/8/80/Bank_of_New_Zealand_logo.svg',
  Westpac: 'https://upload.wikimedia.org/wikipedia/en/a/ac/Westpac_logo.svg'
};

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
        borderRadius: 6,
        maxBarThickness: 60,
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
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Projected Annual API Fee Revenue by Bank',
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
      y: {
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
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      }
    }
  };

  // Render bank logos below the chart
  const renderBankLogos = () => {
    return (
      <HStack justify="space-around" mt={4} px={4}>
        {data.map(bank => (
          <VStack key={bank.name} spacing={2}>
            <Box
              width="70px"
              height="40px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="white"
              borderRadius="md"
              p={1}
            >
              <Image
                src={bankLogos[bank.name as keyof typeof bankLogos]}
                alt={`${bank.name} logo`}
                maxHeight="30px"
                maxWidth="60px"
                objectFit="contain"
                fallback={<Text fontWeight="bold">{bank.name}</Text>}
              />
            </Box>
            <Text fontWeight="bold" fontSize="sm">${bank.annualRevenue.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}</Text>
          </VStack>
        ))}
      </HStack>
    );
  };

  return (
    <Box>
      <Box height="250px">
        <Bar data={chartData} options={options} />
      </Box>
      {renderBankLogos()}
    </Box>
  );
};