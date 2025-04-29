import { Box, VStack } from '@chakra-ui/react';
import DailyHistory from './DailyHistory';
import MonthlyHistory from './MonthlyHistory';

const HistoryContainer = ({daysData, monthsData}) => {
  return (
    <Box width="90%" backgroundColor="#F7F8FA" padding="20px" borderRadius="20px">
      <VStack spacing="30px">
        <DailyHistory daysData={daysData}/>
        <MonthlyHistory monthsData={monthsData} daysData={daysData}/>
      </VStack>
    </Box>
  );
};

export default HistoryContainer;
