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
import { Box, HStack, VStack, Text, Image } from '@chakra-ui/react';

// Import bank logos directly
import anzLogo from '../assets/anz-logo.svg';
import asbLogo from '../assets/asb-logo.svg';
import bnzLogo from '../assets/bnz-logo.svg';
import westpacLogo from '../assets/westpac-logo.svg';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Bank logos mapping
const bankLogos = {
  ANZ: anzLogo,
  ASB: asbLogo,
  BNZ: bnzLogo,
  Westpac: westpacLogo
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
            weight: 'bold',
            family: "'Inter', sans-serif"
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Projected Annual API Fee Revenue by Bank',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        color: '#2C5282', // blue.700
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        padding: 12,
        cornerRadius: 6,
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
          color: 'rgba(0, 0, 0, 0.04)',
          lineWidth: 1
        },
        border: {
          dash: [4, 4]
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          padding: 8,
          color: '#4A5568', // gray.600
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
            weight: 'bold',
            family: "'Inter', sans-serif"
          },
          color: '#2D3748' // gray.700
        }
      }
    }
  };

  // Render bank logos below the chart
  const renderBankLogos = () => {
    return (
      <HStack justify="space-around" mt={6} px={4}>
        {data.map(bank => (
          <VStack key={bank.name} spacing={3}>
            <Box
              width="80px"
              height="45px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="white"
              borderRadius="lg"
              p={2}
              boxShadow="md"
              border="1px solid"
              borderColor="gray.100"
              transition="all 0.2s"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                borderColor: "gray.200"
              }}
            >
              <Image
                src={bankLogos[bank.name as keyof typeof bankLogos]}
                alt={`${bank.name} logo`}
                maxHeight="35px"
                maxWidth="70px"
                objectFit="contain"
                fallback={<Text fontWeight="bold">{bank.name}</Text>}
              />
            </Box>
            <Text
              fontWeight="bold"
              fontSize="sm"
              color={bank.color}
              bg={`${bank.color}10`}
              px={3}
              py={1}
              borderRadius="full"
            >
              ${bank.annualRevenue.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}
            </Text>
          </VStack>
        ))}
      </HStack>
    );
  };

  return (
    <Box>
      <Box height="250px" mb={2}>
        <Bar data={chartData} options={options} />
      </Box>
      {renderBankLogos()}
    </Box>
  );
};