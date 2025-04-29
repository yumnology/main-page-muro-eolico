import { Box, VStack } from '@chakra-ui/react';
import DailyLineChart from './DailyLineChart';
import MonthlyLineChart from './MonthlyLineChart';

const ChartsContainer = ({energyPerHour, monthsData, daysData}) => {
  return (
    <Box width="90%" backgroundColor="#F7F8FA" padding="20px" borderRadius="15px" marginTop="30px">
      <VStack spacing="30px">
        <DailyLineChart energyPerHour={energyPerHour}/>
        <MonthlyLineChart daysData={daysData}/>
      </VStack>
    </Box>
  );
};

export default ChartsContainer;
