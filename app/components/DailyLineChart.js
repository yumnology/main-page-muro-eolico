import { Box, Heading } from '@chakra-ui/react';
import LineChart from './LineChart';

const DailyLineChart = ({ energyPerHour }) => {
  const dailyData = {
    labels: Array.from({ length: 24 }, (_, i) => i),
    datasets: [
      {
        label: 'mW Generados',
        data: Array.from({ length: 24 }, (_, i) => (
          energyPerHour[`0${i}`]/1 * 50  || energyPerHour[i]/1 * 50 || 0
        )),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,  // Asegúrate de que no se rellene bajo la línea
        tension: 0.1  // Suaviza las líneas
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Energía por Día',
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora del Día',
        },
      },
      y: {
        title: {
          display: true,
          text: 'mW Generados',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Box width="90%">
      <Heading size="md" marginBottom="20px">Gráfica de Energía por Día</Heading>
      <LineChart data={dailyData} options={chartOptions} />
    </Box>
  );
};

export default DailyLineChart;
