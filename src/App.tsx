import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
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
  SimpleGrid,
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { RevenueChart } from './components/RevenueChart'
import { ComparisonChart } from './components/ComparisonChart'
import { CostAnalysis } from './components/CostAnalysis'
import PercentageDial from './components/PercentageDial'
import EnhancedSlider from './components/EnhancedSlider'
import EnhancedNumberInput from './components/EnhancedNumberInput'
import { gradients } from './theme'

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
  const [appsPerCustomer, setAppsPerCustomer] = useState<number>(2.00); // Average number of open banking apps per customer
  const [percentageCustomersUsingAPI, setPercentageCustomersUsingAPI] = useState<number>(10); // % of bank customers using open banking
  const [percentageReachingCap, setPercentageReachingCap] = useState<number>(30); // % of API users hitting the $5 cap
  const [paymentInitiationsPerCustomer, setPaymentInitiationsPerCustomer] = useState<number>(20); // Monthly payment initiations per customer

  // Calculate revenue for each bank
  const calculateBankRevenueData = () => {
    return bankData.map(bank => {
      // Customers using open banking APIs
      const customersUsingAPI = Math.round(bank.customerCount * (percentageCustomersUsingAPI / 100));

      // Customers under the cap
      const customersBelowCap = Math.round(customersUsingAPI * (1 - percentageReachingCap / 100));

      // Customers hitting the cap
      const customersHittingCap = customersUsingAPI - customersBelowCap;

      // Revenue from customers below cap (1 cent per API call per app)
      const revenueBelowCap = customersBelowCap * apiCallsPerCustomer * appsPerCustomer * 0.01;

      // Revenue from customers hitting cap ($5 per customer per app)
      const revenueAtCap = customersHittingCap * 5 * appsPerCustomer;

      // Revenue from payment initiations (5 cents per transaction per app)
      const paymentInitiationRevenue = customersUsingAPI * paymentInitiationsPerCustomer * appsPerCustomer * 0.05;

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
    <Container maxW="container.xl" py={{ base: 4, md: 8 }} px={{ base: 3, md: 6 }}>
      <VStack spacing={{ base: 6, md: 10 }} align="stretch">
        <Box textAlign="center" pb={2}>
          <Heading as="h1" size={{ base: "lg", md: "xl" }} mb={3} color="blue.700">NZ Banks API Fee Revenue Calculator</Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mb={3}>
            Estimate how much revenue the Big 4 banks could generate from open banking API fees
          </Text>
          <Flex justifyContent="center" alignItems="center">
            <Link
              href="https://github.com/silverkiwi/bank-api-fee-calculator"
              isExternal
              color="blue.600"
              display="flex"
              alignItems="center"
              px={4}
              py={2}
              borderRadius="md"
              bgGradient={gradients.gray.light}
              _hover={{
                bgGradient: gradients.blue.light,
                textDecoration: "none",
                transform: "translateY(-2px)",
                boxShadow: "md"
              }}
              transition="all 0.2s"
            >
              <Icon as={FaGithub} mr={2} />
              View on GitHub
            </Link>
          </Flex>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 5, md: 8 }}>
          <GridItem>
            <Card borderRadius="lg" boxShadow="md" height="100%">
              <CardBody p={{ base: 4, md: 6 }}>
                <Heading size={{ base: "sm", md: "md" }} mb={{ base: 3, md: 5 }} color="blue.600">Adjust Parameters</Heading>

                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 4, md: 8 }}>
                  {/* API Calls Per Customer */}
                  <Box
                    p={{ base: 3, md: 4 }}
                    borderRadius="md"
                    bgGradient={gradients.blue.light}
                    boxShadow="sm"
                    transition="all 0.2s"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "md", bgGradient: gradients.blue.medium }}
                  >
                    <EnhancedSlider
                      value={apiCallsPerCustomer}
                      onChange={setApiCallsPerCustomer}
                      min={10}
                      max={500}
                      step={10}
                      label="API Calls Per Customer Per Month"
                      description={`Cost per customer: $${(apiCallsPerCustomer * 0.01).toFixed(2)}${apiCallsPerCustomer * 0.01 > 5 ? " (capped at $5)" : ""}`}
                      showTooltip={true}
                    />
                  </Box>

                  {/* Apps Per Customer */}
                  <Box
                    p={{ base: 3, md: 4 }}
                    borderRadius="md"
                    bgGradient={gradients.blue.light}
                    boxShadow="sm"
                    transition="all 0.2s"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "md", bgGradient: gradients.blue.medium }}
                  >
                    <EnhancedNumberInput
                      value={appsPerCustomer}
                      onChange={setAppsPerCustomer}
                      min={1}
                      max={10}
                      step={0.01}
                      precision={2}
                      label="Apps Per Customer"
                      description="Average number of open banking apps used by each customer"
                    />
                  </Box>

                  {/* % of Bank Customers Using Open Banking Apps */}
                  <Box
                    p={{ base: 3, md: 4 }}
                    borderRadius="md"
                    bgGradient={gradients.blue.light}
                    boxShadow="sm"
                    transition="all 0.2s"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "md", bgGradient: gradients.blue.medium }}
                  >
                    <PercentageDial
                      value={percentageCustomersUsingAPI}
                      onChange={setPercentageCustomersUsingAPI}
                      label="Cust % using Open Banking"
                      min={1}
                      max={100}
                    />
                  </Box>

                  {/* % of API Users Hitting $5 Monthly Cap */}
                  <Box
                    p={{ base: 3, md: 4 }}
                    borderRadius="md"
                    bgGradient={gradients.blue.light}
                    boxShadow="sm"
                    transition="all 0.2s"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "md", bgGradient: gradients.blue.medium }}
                  >
                    <PercentageDial
                      value={percentageReachingCap}
                      onChange={setPercentageReachingCap}
                      label="User % hitting $5 cap"
                      min={0}
                      max={100}
                    />
                  </Box>

                  {/* Payment Initiations Per Customer */}
                  <Box
                    p={{ base: 3, md: 4 }}
                    borderRadius="md"
                    bgGradient={gradients.blue.light}
                    boxShadow="sm"
                    transition="all 0.2s"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "md", bgGradient: gradients.blue.medium }}
                  >
                    <EnhancedSlider
                      value={paymentInitiationsPerCustomer}
                      onChange={setPaymentInitiationsPerCustomer}
                      min={0}
                      max={100}
                      step={1}
                      label="Payment Initiations Per Customer"
                      description="Each payment initiation costs 5¢"
                      valueSuffix=" per month"
                    />
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem>
            <Card borderRadius="lg" boxShadow="md" height="100%" variant="gradient">
              <CardBody p={{ base: 4, md: 6 }}>
                <Heading size={{ base: "sm", md: "md" }} mb={{ base: 3, md: 5 }} color="blue.600">Total Revenue Impact</Heading>
                <VStack spacing={{ base: 3, md: 5 }} align="stretch">
                  <Box p={{ base: 3, md: 4 }} borderRadius="md" bgGradient={gradients.blue.medium}>
                    <Stat>
                      <StatLabel>Combined Annual Revenue</StatLabel>
                      <StatNumber color="blue.700">${totalAnnualRevenue.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}</StatNumber>
                      <StatHelpText>From API fees across all Big 4 banks</StatHelpText>
                    </Stat>
                  </Box>

                  <Box
                    height={{ base: "300px", md: "350px" }}
                    mt={2}
                    p={3}
                    borderRadius="md"
                    bgGradient={gradients.gray.light}
                  >
                    <RevenueChart data={bankRevenueData} />
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <Tabs
          colorScheme="blue"
          isLazy
          variant="enclosed"
          borderRadius="lg"
          boxShadow="sm"
          bgGradient={gradients.gray.light}
          overflow="hidden"
        >
          <TabList px={4} pt={2} overflowX={{ base: "auto", md: "visible" }} flexWrap={{ base: "nowrap", md: "wrap" }}>
            <Tab
              fontWeight="medium"
              minW={{ base: "150px", md: "auto" }}
              _selected={{
                color: "blue.600",
                borderColor: "blue.500",
                borderBottomColor: "white",
                bgGradient: gradients.blue.light
              }}
            >
              Revenue Breakdown
            </Tab>
            <Tab
              fontWeight="medium"
              minW={{ base: "150px", md: "auto" }}
              _selected={{
                color: "blue.600",
                borderColor: "blue.500",
                borderBottomColor: "white",
                bgGradient: gradients.blue.light
              }}
            >
              Revenue Comparison
            </Tab>
            <Tab
              fontWeight="medium"
              minW={{ base: "150px", md: "auto" }}
              _selected={{
                color: "blue.600",
                borderColor: "blue.500",
                borderBottomColor: "white",
                bgGradient: gradients.blue.light
              }}
            >
              Cost Analysis
            </Tab>
            <Tab
              fontWeight="medium"
              minW={{ base: "150px", md: "auto" }}
              _selected={{
                color: "blue.600",
                borderColor: "blue.500",
                borderBottomColor: "white",
                bgGradient: gradients.blue.light
              }}
            >
              About API Fees
            </Tab>
          </TabList>

          <TabPanels p={0}>
            <TabPanel p={{ base: 3, md: 6 }}>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={{ base: 4, md: 6 }}>
                {bankRevenueData.map((bank) => {
                  // Determine which gradient to use based on bank name
                  const bankGradient = bank.name === 'ANZ' ? gradients.anz :
                                      bank.name === 'ASB' ? gradients.asb :
                                      bank.name === 'BNZ' ? gradients.bnz :
                                      bank.name === 'Westpac' ? gradients.westpac :
                                      gradients.blue;

                  return (
                    <GridItem key={bank.name}>
                      <Card
                        borderTop="4px solid"
                        borderColor={bank.color}
                        boxShadow="md"
                        transition="all 0.2s ease-in-out"
                        _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                      >
                        <CardBody p={{ base: 3, md: 5 }}>
                          <Heading size={{ base: "sm", md: "md" }} mb={{ base: 2, md: 4 }} color={bank.color}>{bank.name}</Heading>
                          <VStack align="stretch" spacing={{ base: 2, md: 4 }}>
                            <Box p={{ base: 2, md: 3 }} borderRadius="md" bgGradient={bankGradient.medium}>
                              <Stat>
                                <StatLabel>Annual Revenue</StatLabel>
                                <StatNumber color={bank.color}>${bank.annualRevenue.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}</StatNumber>
                              </Stat>
                            </Box>

                            <Box bgGradient={gradients.gray.light} p={{ base: 2, md: 3 }} borderRadius="md">
                              <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} mb={1} color="gray.700">Monthly Breakdown:</Text>
                              <Text fontSize={{ base: "xs", md: "sm" }}>Data API Revenue: <Text as="span" fontWeight="semibold">${(bank.revenueBelowCap + bank.revenueAtCap).toLocaleString('en-NZ', { maximumFractionDigits: 0 })}</Text></Text>
                              <Text fontSize={{ base: "xs", md: "sm" }}>Payment API Revenue: <Text as="span" fontWeight="semibold">${bank.paymentInitiationRevenue.toLocaleString('en-NZ', { maximumFractionDigits: 0 })}</Text></Text>
                            </Box>

                            <Box bgGradient={gradients.gray.light} p={{ base: 2, md: 3 }} borderRadius="md">
                              <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} mb={1} color="gray.700">Customer Stats:</Text>
                              <Text fontSize={{ base: "xs", md: "sm" }}>API Users: <Text as="span" fontWeight="semibold">{bank.customersUsingAPI.toLocaleString('en-NZ')}</Text></Text>
                              <Text fontSize={{ base: "xs", md: "sm" }}>Customers at Cap: <Text as="span" fontWeight="semibold">{bank.customersHittingCap.toLocaleString('en-NZ')}</Text></Text>
                              <Text fontSize={{ base: "xs", md: "sm" }}>Apps Per Customer: <Text as="span" fontWeight="semibold">{appsPerCustomer.toFixed(2)}</Text></Text>
                            </Box>
                          </VStack>
                        </CardBody>
                      </Card>
                    </GridItem>
                  );
                })}
              </Grid>
            </TabPanel>

            <TabPanel p={{ base: 3, md: 6 }}>
              <Card boxShadow="md" variant="gradient">
                <CardBody p={{ base: 4, md: 6 }}>
                  <Heading size={{ base: "sm", md: "md" }} mb={{ base: 3, md: 5 }} color="blue.600">Revenue Streams Comparison</Heading>
                  <Box
                    height={{ base: "350px", md: "450px" }}
                    p={3}
                    borderRadius="md"
                    bgGradient={gradients.gray.light}
                  >
                    <ComparisonChart data={bankRevenueData} />
                  </Box>
                </CardBody>
              </Card>
            </TabPanel>

            <TabPanel p={{ base: 3, md: 6 }}>
              <CostAnalysis bankRevenueData={bankRevenueData} />
            </TabPanel>

            <TabPanel p={{ base: 3, md: 6 }}>
              <Card boxShadow="md" variant="gradient">
                <CardBody p={{ base: 4, md: 6 }}>
                  <Heading size={{ base: "sm", md: "md" }} mb={{ base: 3, md: 5 }} color="blue.600">About NZ Open Banking API Fees</Heading>
                  <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                    <Box bgGradient={gradients.blue.light} p={{ base: 3, md: 4 }} borderRadius="md">
                      <Heading size={{ base: "xs", md: "sm" }} mb={{ base: 1, md: 2 }} color="blue.700">Fee Structure</Heading>
                      <Text mb={2} fontSize={{ base: "xs", md: "sm" }}>Under the Customer and Product Data Act 2025, banks can charge:</Text>
                      <VStack align="start" spacing={1} pl={4}>
                        <Text fontSize={{ base: "xs", md: "sm" }}>• Up to 1 cent per successful API call for data access</Text>
                        <Text fontSize={{ base: "xs", md: "sm" }}>• Maximum of $5 per customer per month for transaction data</Text>
                        <Text fontSize={{ base: "xs", md: "sm" }}>• 5 cents per transaction for payment initiation</Text>
                        <Text fontSize={{ base: "xs", md: "sm" }}>• Fees apply per app, so customers using multiple apps generate more revenue</Text>
                      </VStack>
                    </Box>

                    <Box bgGradient={gradients.warning.light} p={{ base: 3, md: 4 }} borderRadius="md">
                      <Heading size={{ base: "xs", md: "sm" }} mb={{ base: 1, md: 2 }} color="orange.700">International Comparison</Heading>
                      <Text fontSize={{ base: "xs", md: "sm" }}>Unlike the UK, Australia, and Canada—which mandate free API access—New Zealand's approach allows banks to charge fees, which critics argue may stifle innovation and competition.</Text>
                    </Box>

                    <Box bgGradient={gradients.success.light} p={{ base: 3, md: 4 }} borderRadius="md">
                      <Heading size={{ base: "xs", md: "sm" }} mb={{ base: 1, md: 2 }} color="green.700">Timeline</Heading>
                      <Text fontSize={{ base: "xs", md: "sm" }}>Major banks (ANZ, ASB, BNZ, Westpac) must comply with API standards by December 2025. Kiwibank follows in 2026.</Text>
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