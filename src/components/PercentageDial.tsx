import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import CircularSlider from '@fseehawer/react-circular-slider';

interface PercentageDialProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  description?: string;
  min?: number;
  max?: number;
}

const PercentageDial: React.FC<PercentageDialProps> = ({
  value,
  onChange,
  label,
  description,
  min = 0,
  max = 100
}) => {
  // Responsive sizing based on screen size
  const dialSize = useBreakpointValue({ base: 140, sm: 160, md: 180 });
  const fontSize = useBreakpointValue({ base: "1.2rem", sm: "1.3rem", md: "1.5rem" });
  const progressSize = useBreakpointValue({ base: 8, sm: 9, md: 10 });
  const trackSize = useBreakpointValue({ base: 8, sm: 9, md: 10 });

  // Generate data array for the circular slider
  const generateDataArray = (min: number, max: number) => {
    const data = [];
    for (let i = min; i <= max; i++) {
      data.push(i);
    }
    return data;
  };

  return (
    <VStack spacing={2} align="center" width="100%">
      <Box
        position="relative"
        width={`${dialSize}px`}
        height={`${dialSize}px`}
        mx="auto"
      >
        <CircularSlider
          width={dialSize}
          label=""
          min={min}
          max={max}
          dataIndex={value - min}
          data={generateDataArray(min, max)}
          knobColor="#3182CE"
          progressColorFrom="#3182CE"
          progressColorTo="#63B3ED"
          progressSize={progressSize}
          trackColor="#E2E8F0"
          trackSize={trackSize}
          onChange={(value: string | number) => {
            onChange(Number(value));
          }}
          appendToValue="%"
          valueFontSize={fontSize}
          labelColor="#3182CE"
          hideLabelValue={false}
        />
      </Box>
      <Text fontWeight="medium" fontSize="md" color="gray.700" textAlign="center">{label}</Text>
      {description && (
        <Text fontSize="xs" color="gray.500" textAlign="center" px={2}>
          {description}
        </Text>
      )}
    </VStack>
  );
};

export default PercentageDial;
