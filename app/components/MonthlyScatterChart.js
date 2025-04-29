import { Box, Heading } from '@chakra-ui/react';
import ScatterChart from './ScatterChart';

const MonthlyScatterChart = ({daysData}) => {
  const monthlyData = {
    datasets: [
      {
        label: 'Watts Generados',
        data: Array.from({ length: 30 }, (_, i) => {
          const day = (i + 1).toString().padStart(2, '0');
          const foundDay = daysData.find(d => d.created_at.includes(`2024-09-${day}`));
          return {
            x: day,
            y: foundDay ? ((foundDay.total / foundDay.entries) * 50).toFixed(2) : 0,
          };
        }),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <Box width="90%">
      <Heading size="md" marginBottom="20px">Gráfica de Energía por Mes</Heading>
      <ScatterChart data={monthlyData} title="Energía por Mes" width="100%" height="500px" /> 
    </Box>
  );
};

export default MonthlyScatterChart;
