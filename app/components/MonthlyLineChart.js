import { Box, Heading } from '@chakra-ui/react';
import LineChart from './LineChart';

const MonthlyLineChart = ({ daysData }) => {
  const labels = Array.from({ length: 30 }, (_, i) => (i + 1).toString().padStart(2, '0')); // Etiquetas para los días del mes
  
  const monthlyData = {
    labels,  // Etiquetas en el eje X (días del mes)
    datasets: [
      {
        label: 'mW Generados',
        data: labels.map(day => {
          const foundDay = daysData.find(d => d.created_at.includes(`2024-09-${day}`));
          return foundDay ? ((foundDay.total / foundDay.entries) * 50).toFixed(2) : 0;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false, // No rellenar el área bajo la línea
        tension: 0.1, // Suavizado de las líneas
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Energía por Mes',
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
          text: 'Día del Mes',
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
      <Heading size="md" marginBottom="20px">Gráfica de Energía por Mes</Heading>
      <LineChart data={monthlyData} options={chartOptions} width="100%" height="500px" /> 
    </Box>
  );
};

export default MonthlyLineChart;
