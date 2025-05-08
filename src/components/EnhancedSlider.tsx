import React, { useState } from 'react';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  HStack,
  Tooltip,
  Badge,
  useBreakpointValue
} from '@chakra-ui/react';

interface EnhancedSliderProps {
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
  showTooltip?: boolean;
}

const EnhancedSlider: React.FC<EnhancedSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  label,
  description,
  valuePrefix = '',
  valueSuffix = '',
  precision = 0,
  showTooltip = true
}) => {
  const [showTooltipState, setShowTooltipState] = useState(false);

  // Responsive settings for mobile
  const thumbSize = useBreakpointValue({ base: 5, md: 6 });
  const trackHeight = useBreakpointValue({ base: "6px", md: "8px" });
  const labelFontSize = useBreakpointValue({ base: "sm", md: "md" });
  const badgeFontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const descriptionFontSize = useBreakpointValue({ base: "2xs", md: "xs" });

  const formattedValue = precision > 0
    ? value.toFixed(precision)
    : Math.round(value).toString();

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
          {valuePrefix}{formattedValue}{valueSuffix}
        </Badge>
      </HStack>

      <Box px={1}>
        <Slider
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          onMouseEnter={() => setShowTooltipState(true)}
          onMouseLeave={() => setShowTooltipState(false)}
          onTouchStart={() => setShowTooltipState(true)}
          onTouchEnd={() => setShowTooltipState(false)}
          colorScheme="blue"
        >
          <SliderTrack bg="gray.200" height={trackHeight} borderRadius="md">
            <SliderFilledTrack bg="blue.500" />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="blue.500"
            color="white"
            placement="top"
            isOpen={showTooltip && showTooltipState}
            label={`${valuePrefix}${formattedValue}${valueSuffix}`}
          >
            <SliderThumb
              boxSize={thumbSize}
              bg="white"
              borderColor="blue.500"
              borderWidth="2px"
              _focus={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)" }}
            />
          </Tooltip>
        </Slider>
      </Box>

      {description && (
        <Text fontSize={descriptionFontSize} color="gray.500" mt={0}>
          {description}
        </Text>
      )}
    </VStack>
  );
};

export default EnhancedSlider;
