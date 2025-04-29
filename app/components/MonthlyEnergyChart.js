"use client";  

import { Bar } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
// Importamos los componentes necesarios para utilizar la gráfica
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { color } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyEnergyChart = () => {
  const data = {
    labels: ['Agosto', 'Septiembre', 'Octubre'],
    datasets: [
      {
        label: 'Energía Generada',
        data: [1200, 1500, 1000], 
        backgroundColor: 'rgba(98, 225, 75, 0.2)',
        borderColor: 'rgba(98, 225, 75 )',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Energía Generada por Mes',
        color: 'bold'
      },
    },
  };

  return (
    <Box width="50%">
      <Bar data={data} options={options} />
    </Box>
  );
};

export default MonthlyEnergyChart;
