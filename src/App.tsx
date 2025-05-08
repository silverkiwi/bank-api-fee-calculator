import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Link,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { RevenueChart } from './components/RevenueChart'
import { ComparisonChart } from './components/ComparisonChart'
import { CostAnalysis } from './components/CostAnalysis'

// Bank data with their customer numbers (approximated)
const bankData = [
  { name: 'ANZ', customerCount: 2000000, color: '#0072CE' }, // ANZ blue
  { name: 'ASB', customerCount: 1400000, color: '#FFB600' }, // ASB gold/yellow
  { name: 'BNZ', customerCount: 1200000, color: '#0075C9' }, // BNZ blue
  { name: 'Westpac', customerCount: 1300000, color: '#D5002B' }  // Westpac red
];

function App() {
  // State for user-adjustable parameters
  const [apiCallsPerCustomer, setApiCallsPerCustomer] = useState<number>(150); // Monthly API calls per customer
  const [percentageCustomersUsingAPI, setPercentageCustomersUsingAPI] = useState<number>(10); // % of bank customers using open banking
  const [percentageReachingCap, setPercentageReachingCap] = useState<number>(30); // % of API users hitting the $5 cap
  const [paymentInitiationsPerCustomer, setPaymentInitiationsPerCustomer] = useState<number>(20); // Monthly payment initiations per customer
  const [showToolTip, setShowToolTip] = useState<boolean>(false);

  // Calculate revenue for each bank
  const calculateBankRevenueData = () => {
    return bankData.map(bank => {
      // Customers using open banking APIs
      const customersUsingAPI = Math.round(bank.customerCount * (percentageCustomersUsingAPI / 100));

      // Customers under the cap
      const customersBelowCap = Math.round(customersUsingAPI * (1 - percentageReachingCap / 100));

      // Customers hitting the cap
      const customersHittingCap = customersUsingAPI - customersBelowCap;

      // Revenue from customers below cap (1 cent per API call)
      const revenueBelowCap = customersBelowCap * apiCallsPerCustomer * 0.01;

      // Revenue from customers hitting cap ($5 per customer)
      const revenueAtCap = customersHittingCap * 5;

      // Revenue from payment initiations (5 cents per transaction)
      const paymentInitiationRevenue = customersUsingAPI * paymentInitiationsPerCustomer * 0.05;

      // Total monthly revenue
      const totalMonthlyRevenue = revenueBelowCap + revenueAtCap + paymentInitiationRevenue;

      // Annual revenue
      const annualRevenue = totalMonthlyRevenue * 12;

      return {
        ...bank,
        customersUsingAPI,
        customersBelowCap,
        customersHittingCap,
        revenueBelowCap,
        revenueAtCap,
        paymentInitiationRevenue,
        totalMonthlyRevenue,
        annualRevenue
      };
    });
  };

  const bankRevenueData = calculateBankRevenueData();
  const totalAnnualRevenue = bankRevenueData.reduce((sum, bank) => sum + bank.annualRevenue, 0);

  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>NZ Banks API Fee Revenue Calculator</Heading>
          <Text fontSize="lg" color="gray.500" mb={2}>
            Estimate how much revenue the Big 4 banks could generate from open banking API fees
          </Text>
          <Flex justifyContent="center" alignItems="center">
            <Link href="https://github.com/silverkiwi/bank-api-fee-calculator" isExternal color="blue.500" display="flex" alignItems="center">
              <Icon as={FaGithub} mr={2} />
              View on GitHub
            </Link>
          </Flex>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <GridItem>
            <Card>
              <CardBody>
                <Heading size="md" mb={4}>Adjust Parameters</Heading>
                <VStack spacing={5} align="stretch">
                  <FormControl>
                    <FormLabel>API Calls Per Customer Per Month</FormLabel>
                    <Slider
                      min={10}
                      max={500}
                      step={10}
                      value={apiCallsPerCustomer}
                      onChange={setApiCallsPerCustomer}
                      onMouseEnter={() => setShowToolTip(true)}
                      onMouseLeave={() => setShowToolTip(false)}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        bg='blue.500'
                        color='white'
                        placement='top'
                        isOpen={showToolTip}
                        label={apiCallsPerCustomer}
                      >
                        <SliderThumb />
                      </Tooltip>
                    </Slider>
                    <HStack>
                      <Text>Current: {apiCallsPerCustomer}</Text>
                      <Text fontWeight="bold" ml="auto">
                        Cost per customer: ${(apiCallsPerCustomer * 0.01).toFixed(2)}
                        {apiCallsPerCustomer * 0.01 > 5 && " (capped at $5)"}
                      </Text>
                    </HStack>
                  </FormControl>

                  <FormControl>
                    <FormLabel>% of Bank Customers Using Open Banking Apps</FormLabel>
                    <NumberInput
                      min={1}
                      max={100}
                      value={percentageCustomersUsingAPI}
                      onChange={(_, value) => setPercentageCustomersUsingAPI(value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel>% of API Users Hitting $5 Monthly Cap</FormLabel>
                    <NumberInput
                      min={0}
                      max={100}
                      value={percentageReachingCap}
                      onChange={(_, value) => setPercentageReachingCap(value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Payment Initiations Per Customer (5¢ each)</FormLabel>
                    <NumberInput
                      min={0}
                      max={100}
                      value={paymentInitiationsPerCustomer}
                      onChange={(_, value) => setPaymentInitiationsPerCustomer(value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem>
            <Card height="100%">
              <CardBody>
                <Heading size="md" mb={4}>Total Revenue Impact</Heading>
                <VStack spacing={4} align="stretch">
                  <Stat>
                    <StatLabel>Combined Annual Revenue</StatLabel>
                    <StatNumber>${totalAnnualRevenue.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}</StatNumber>
                    <StatHelpText>From API fees across all Big 4 banks</StatHelpText>
                  </Stat>

                  <Box height="350px">
                    <RevenueChart data={bankRevenueData} />
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <Tabs colorScheme="blue" isLazy>
          <TabList>
            <Tab>Revenue Breakdown</Tab>
            <Tab>Revenue Comparison</Tab>
            <Tab>Cost Analysis</Tab>
            <Tab>About API Fees</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
                {bankRevenueData.map((bank) => (
                  <GridItem key={bank.name}>
                    <Card borderTop="4px solid" borderColor={bank.color}>
                      <CardBody>
                        <Heading size="md" mb={3}>{bank.name}</Heading>
                        <VStack align="stretch" spacing={3}>
                          <Stat>
                            <StatLabel>Annual Revenue</StatLabel>
                            <StatNumber>${bank.annualRevenue.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}</StatNumber>
                          </Stat>

                          <Box>
                            <Text fontWeight="bold">Monthly Breakdown:</Text>
                            <Text>Data API Revenue: ${(bank.revenueBelowCap + bank.revenueAtCap).toLocaleString('en-NZ', { maximumFractionDigits: 0 })}</Text>
                            <Text>Payment API Revenue: ${bank.paymentInitiationRevenue.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}</Text>
                          </Box>

                          <Box>
                            <Text fontWeight="bold">Customer Stats:</Text>
                            <Text>API Users: {bank.customersUsingAPI.toLocaleString('en-NZ')}</Text>
                            <Text>Customers at Cap: {bank.customersHittingCap.toLocaleString('en-NZ')}</Text>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel>
              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>Revenue Streams Comparison</Heading>
                  <Box height="450px">
                    <ComparisonChart data={bankRevenueData} />
                  </Box>
                </CardBody>
              </Card>
            </TabPanel>

            <TabPanel>
              <CostAnalysis bankRevenueData={bankRevenueData} />
            </TabPanel>

            <TabPanel>
              <Card>
                <CardBody>
                  <Heading size="md" mb={4}>About NZ Open Banking API Fees</Heading>
                  <VStack spacing={4} align="stretch">
                    <Box>
                      <Heading size="sm">Fee Structure</Heading>
                      <Text>Under the Customer and Product Data Act 2025, banks can charge:</Text>
                      <Text>• Up to 1 cent per successful API call for data access</Text>
                      <Text>• Maximum of $5 per customer per month for transaction data</Text>
                      <Text>• 5 cents per transaction for payment initiation</Text>
                    </Box>

                    <Box>
                      <Heading size="sm">International Comparison</Heading>
                      <Text>Unlike the UK, Australia, and Canada—which mandate free API access—New Zealand's approach allows banks to charge fees, which critics argue may stifle innovation and competition.</Text>
                    </Box>

                    <Box>
                      <Heading size="sm">Timeline</Heading>
                      <Text>Major banks (ANZ, ASB, BNZ, Westpac) must comply with API standards by December 2025. Kiwibank follows in 2026.</Text>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}

export default App