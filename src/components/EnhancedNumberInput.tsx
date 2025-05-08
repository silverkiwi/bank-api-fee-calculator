import React from 'react';
import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  VStack,
  HStack,
  Badge,
  useBreakpointValue
} from '@chakra-ui/react';

interface EnhancedNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  description?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  precision?: number;
}

const EnhancedNumberInput: React.FC<EnhancedNumberInputProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  label,
  description,
  valuePrefix = '',
  valueSuffix = '',
  precision = 0
}) => {
  // Responsive settings for mobile
  const inputSize = useBreakpointValue({ base: "sm", md: "md" });
  const labelFontSize = useBreakpointValue({ base: "sm", md: "md" });
  const badgeFontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const descriptionFontSize = useBreakpointValue({ base: "2xs", md: "xs" });

  const format = (val: number) => {
    return `${valuePrefix}${val.toFixed(precision)}${valueSuffix}`;
  };

  const parse = (val: string) => {
    // Remove prefix and suffix and parse as float
    let parsedValue = val.replace(valuePrefix, '').replace(valueSuffix, '');
    return parseFloat(parsedValue);
  };

  return (
    <VStack spacing={2} align="stretch" width="100%">
      <HStack justify="space-between" flexWrap="wrap">
        <Text
          fontWeight="medium"
          fontSize={labelFontSize}
          color="gray.700"
          mb={{ base: 1, md: 0 }}
          maxW={{ base: "100%", md: "70%" }}
        >
          {label}
        </Text>
        <Badge
          colorScheme="blue"
          fontSize={badgeFontSize}
          px={2}
          py={1}
          borderRadius="md"
          ml={{ base: 0, md: "auto" }}
        >
          {valuePrefix}{value.toFixed(precision)}{valueSuffix}
        </Badge>
      </HStack>

      <Box>
        <NumberInput
          min={min}
          max={max}
          step={step}
          value={format(value)}
          onChange={(valueString) => {
            const parsedValue = parse(valueString);
            if (!isNaN(parsedValue)) {
              onChange(parsedValue);
            }
          }}
          precision={precision}
          size={inputSize}
        >
          <NumberInputField
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            borderRadius="md"
            bg="white"
            fontSize={labelFontSize}
          />
          <NumberInputStepper>
            <NumberIncrementStepper borderColor="gray.300" color="blue.500" />
            <NumberDecrementStepper borderColor="gray.300" color="blue.500" />
          </NumberInputStepper>
        </NumberInput>
      </Box>

      {description && (
        <Text fontSize={descriptionFontSize} color="gray.500" mt={0}>
          {description}
        </Text>
      )}
    </VStack>
  );
};

export default EnhancedNumberInput;
