import { Box, Text, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

const PropellerCard = ({ title, percentage, voltage }) => {


  const progressColor = percentage < 40 ? 'red.400' : percentage < 70 ? 'yellow.400' : 'green.400';

  return (
    <Box 
      width="100%" 
      backgroundColor="white" 
      padding="20px" 
      borderRadius="10px" 
      boxShadow="sm"
      textAlign="center"
    >
      <Text fontSize="lg" fontWeight="bold" marginBottom="20px">
        {title}
      </Text>
      <CircularProgress value={percentage} color={progressColor} size="100px" marginBottom="25px">
        <CircularProgressLabel>{`${percentage}%`}</CircularProgressLabel>
      </CircularProgress>
      <Text fontSize="sm">Voltage: {voltage || '--'}</Text>
    </Box>
  );
};

export default PropellerCard;
