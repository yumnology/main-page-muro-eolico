'use client';
import { Flex, keyframes, Text } from '@chakra-ui/react';
import PropellerCard from './PropellerCard';

const fadeSlideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const fadeSlideOutToLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) scale(0.95);
  }
`;

const CardsContainer = ({ latestData, isExiting }) => {
  return (
    <Flex 
      direction="column"
      align="center"
      marginBottom="20px" 
      backgroundColor="#E9ECEF" 
      padding="20px" 
      borderRadius="20px" 
      width="90%"
      gap="20px" 
      height="55%"
      position="relative" 
      animation={`${isExiting ? fadeSlideOutToLeft : fadeSlideInFromRight} 0.6s ease-in-out`}

      
    >
      <Text fontSize="xl" fontWeight="bold" mb="10px">
        Group 1
      </Text>
      <Flex justify="space-between" align="center" width="100%" gap="20px">
        <PropellerCard title="Propeller 1" percentage={Math.floor((latestData?.propeller1 * 100) / 5) || 0} voltage={`${(latestData?.propeller1 ** 2/216 * 1000).toFixed(2) || 0} mW`} />
        <PropellerCard title="Propeller 2" percentage={Math.floor((latestData?.propeller2 * 100) / 5) || 0} voltage={`${(latestData?.propeller2 ** 2/216 * 1000).toFixed(2) || 0} mW`} />
        <PropellerCard title="Propeller 3" percentage={Math.floor((latestData?.propeller3 * 100) / 5) || 0} voltage={`${(latestData?.propeller3 ** 2/216 * 1000).toFixed(2) || 0} mW`} />
        <PropellerCard title="Propeller 4" percentage={Math.floor((latestData?.propeller4 * 100) / 5) || 0} voltage={`${(latestData?.propeller4 ** 2/216 * 1000).toFixed(2) || 0} mW`} />
        <PropellerCard title="Propeller 5" percentage={Math.floor((latestData?.propeller5 * 100) / 5) || 0} voltage={`${(latestData?.propeller5 ** 2/216 * 1000).toFixed(2) || 0} mW`} />
      </Flex>
    </Flex>

  );
};

export default CardsContainer;
