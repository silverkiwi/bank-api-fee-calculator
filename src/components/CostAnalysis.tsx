import {
  Box,
  VStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Grid,
  GridItem,
  Card,
  CardBody,
} from '@chakra-ui/react';

// Define the types for cost data
type CostItem = {
  category: string;
  lowEstimate: number; // in millions NZD
  highEstimate: number; // in millions NZD
  description: string;
};

type BankRevenue = {
  name: string;
  color: string;
  annualRevenue: number;
  customerCount: number;
};

// Bank implementation cost data (in millions NZD)
const implementationCosts: CostItem[] = [
  { 
    category: 'API Development', 
    lowEstimate: 5, 
    highEstimate: 15, 
    description: 'Designing RESTful APIs, integrating with legacy core banking systems, testing'
  },
  { 
    category: 'Security & Compliance', 
    lowEstimate: 3, 
    highEstimate: 10, 
    description: 'Encryption, OAuth 2.0 implementation, fraud monitoring, regulatory audits'
  },
  { 
    category: 'Third-Party Support', 
    lowEstimate: 2, 
    highEstimate: 5, 
    description: 'Developer portals, sandbox environments, documentation, and SDKs'
  },
  { 
    category: 'Legacy System Upgrades', 
    lowEstimate: 10, 
    highEstimate: 30, 
    description: 'Modernizing outdated infrastructure to enable API connectivity'
  },
  { 
    category: 'Legal & Accreditation', 
    lowEstimate: 1, 
    highEstimate: 3, 
    description: 'Compliance with the Customer and Product Data Act 2025, legal reviews'
  }
];

// Annual ongoing costs (in millions NZD)
const ongoingCosts: CostItem[] = [
  { 
    category: 'Maintenance & Operations', 
    lowEstimate: 2, 
    highEstimate: 8, 
    description: 'Hosting (cloud), API monitoring, bug fixes, version updates'
  }
];

type CostAnalysisProps = {
  bankRevenueData: BankRevenue[];
};

export const CostAnalysis = ({ bankRevenueData }: CostAnalysisProps) => {
  // Calculate totals
  const totalInitialCostLow = implementationCosts.reduce((sum, item) => sum + item.lowEstimate, 0);
  const totalInitialCostHigh = implementationCosts.reduce((sum, item) => sum + item.highEstimate, 0);
  const totalOngoingCostLow = ongoingCosts.reduce((sum, item) => sum + item.lowEstimate, 0);
  const totalOngoingCostHigh = ongoingCosts.reduce((sum, item) => sum + item.highEstimate, 0);
  
  const totalAnnualRevenue = bankRevenueData.reduce((sum, bank) => sum + bank.annualRevenue, 0);
  const totalAnnualRevenueInMillions = totalAnnualRevenue / 1000000;
  
  // Calculate average ROI metrics
  const netAnnualRevenueLow = totalAnnualRevenueInMillions - totalOngoingCostLow;
  const netAnnualRevenueHigh = totalAnnualRevenueInMillions - totalOngoingCostHigh;
  
  // Calculate years to break even (simplified)
  const yearsToBreakEvenLow = Math.round((totalInitialCostLow / netAnnualRevenueLow) * 10) / 10;
  const yearsToBreakEvenHigh = Math.round((totalInitialCostHigh / netAnnualRevenueHigh) * 10) / 10;
  
  // Calculate percentage of annual bank profits
  // Assuming big 4 banks combined profits of NZ$6.4B in 2023
  const totalBankProfits = 6400; // NZ$6.4B in millions
  const apiCostPercentOfProfitLow = Math.round((totalInitialCostLow / totalBankProfits) * 1000) / 10;
  const apiCostPercentOfProfitHigh = Math.round((totalInitialCostHigh / totalBankProfits) * 1000) / 10;

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" mb={4}>Cost vs. Revenue Analysis</Heading>
      
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <GridItem>
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>API Implementation Costs</Heading>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Category</Th>
                    <Th isNumeric>Low Est. (NZ$M)</Th>
                    <Th isNumeric>High Est. (NZ$M)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {implementationCosts.map((cost, index) => (
                    <Tr key={index}>
                      <Td>
                        <Text fontWeight="medium">{cost.category}</Text>
                        <Text fontSize="xs" color="gray.600">{cost.description}</Text>
                      </Td>
                      <Td isNumeric>{cost.lowEstimate}</Td>
                      <Td isNumeric>{cost.highEstimate}</Td>
                    </Tr>
                  ))}
                  <Tr fontWeight="bold">
                    <Td>Initial Total</Td>
                    <Td isNumeric>{totalInitialCostLow}</Td>
                    <Td isNumeric>{totalInitialCostHigh}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Annual Ongoing Costs & Revenue</Heading>
              <Table variant="simple" size="sm" mb={4}>
                <Thead>
                  <Tr>
                    <Th>Category</Th>
                    <Th isNumeric>Low Est. (NZ$M)</Th>
                    <Th isNumeric>High Est. (NZ$M)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ongoingCosts.map((cost, index) => (
                    <Tr key={index}>
                      <Td>
                        <Text fontWeight="medium">{cost.category}</Text>
                        <Text fontSize="xs" color="gray.600">{cost.description}</Text>
                      </Td>
                      <Td isNumeric>{cost.lowEstimate}</Td>
                      <Td isNumeric>{cost.highEstimate}</Td>
                    </Tr>
                  ))}
                  <Tr>
                    <Td colSpan={3} height="2px" p={0} bg="gray.100"></Td>
                  </Tr>
                  <Tr color="green.500">
                    <Td>API Fee Revenue</Td>
                    <Td isNumeric colSpan={2}>
                      {totalAnnualRevenueInMillions.toFixed(2)}
                    </Td>
                  </Tr>
                  <Tr fontWeight="bold">
                    <Td>Net Annual Revenue</Td>
                    <Td isNumeric>{netAnnualRevenueLow.toFixed(2)}</Td>
                    <Td isNumeric>{netAnnualRevenueHigh.toFixed(2)}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Years to Break Even</StatLabel>
                <StatNumber>{yearsToBreakEvenLow} - {yearsToBreakEvenHigh}</StatNumber>
                <StatHelpText>
                  Based on current API fee revenue
                </StatHelpText>
              </Stat>
              <Progress 
                colorScheme={yearsToBreakEvenHigh < 5 ? "green" : "orange"} 
                size="sm" 
                value={Math.min(100, (5 / yearsToBreakEvenHigh) * 100)} 
                mt={2}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Annual ROI After Break-Even</StatLabel>
                <StatNumber>
                  {Math.round((netAnnualRevenueLow / totalInitialCostLow) * 100)}% - {Math.round((netAnnualRevenueHigh / totalInitialCostHigh) * 100)}%
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Return on initial investment
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>% of Annual Bank Profits</StatLabel>
                <StatNumber>{apiCostPercentOfProfitLow}% - {apiCostPercentOfProfitHigh}%</StatNumber>
                <StatHelpText>
                  API implementation costs vs. NZ$6.4B annual profits
                </StatHelpText>
              </Stat>
              <Progress 
                colorScheme="blue" 
                size="sm" 
                value={apiCostPercentOfProfitHigh} 
                mt={2}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Cost Analysis Insights</Heading>
          <VStack align="start" spacing={3}>
            <Box>
              <Text fontWeight="bold">Implementation Costs vs. Fee Revenue</Text>
              <Text>
                The initial API implementation costs for banks range from NZ${totalInitialCostLow}M to NZ${totalInitialCostHigh}M, 
                while projected annual revenue from API fees is NZ${totalAnnualRevenueInMillions.toFixed(2)}M. 
                At current rates, banks would recoup their investment in approximately {yearsToBreakEvenLow} to {yearsToBreakEvenHigh} years.
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold">Actual Operating Costs vs. Fee Charges</Text>
              <Text>
                While the cost to process an API call is minimal (approximately NZ$0.0001 per call), 
                banks are charging 1 cent (NZ$0.01) per call – a markup of roughly 100x actual operating costs.
                Critics argue this exceeds cost recovery and represents a profit-seeking model.
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold">International Comparison</Text>
              <Text>
                Unlike New Zealand, the UK, Australia, and Canada have mandated fee-free API access, 
                treating open banking infrastructure as a digital public utility similar to online banking platforms.
                These markets have seen faster innovation and adoption as a result.
              </Text>
            </Box>
            
            <Box>
              <Text fontWeight="bold">Scale of Investment</Text>
              <Text>
                API implementation costs represent just {apiCostPercentOfProfitLow}% to {apiCostPercentOfProfitHigh}% of the NZ$6.4B 
                combined annual profits reported by New Zealand's major banks in 2023.
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};