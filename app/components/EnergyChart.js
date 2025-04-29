"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los elementos de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const getFormattedDate = () => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

export default function EnergyChart({ isSidebarOpen, allHours }) {

  const newData = allHours;

  const [currentDate, setCurrentDate] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [displayLabels, setDisplayLabels] = useState([]);
  const [chartWidth, setChartWidth] = useState("100%");
  const [fullData, setFullData] = useState([]);
  const [fullLabels, setFullLabels] = useState([]);



  useEffect(() => {
    // Establecer la fecha inicial cuando se cargue en el cliente
    setCurrentDate(getFormattedDate());
  }, []);

  useEffect(() => {
    if (newData) {
      const hours = Object.keys(newData);
      const generatedValues = Object.values(newData);
      setFullData(generatedValues);
      setFullLabels(hours);
    }
    if (isSidebarOpen) {
      setDisplayData(fullData.filter((_, index) => index % 2 === 0));
      setDisplayLabels(fullLabels.filter((_, index) => index % 2 === 0));
      setChartWidth("75%"); // Reducir el ancho cuando el sidebar está abierto
    } else {
      setDisplayData(fullData);
      setDisplayLabels(fullLabels);
      setChartWidth("100%"); // Ancho completo cuando el sidebar está cerrado
    }
  }, [isSidebarOpen, newData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: {
          display: false, // Oculta las líneas de cuadrícula en el eje x
        },
        ticks: {
          color: "#4A5568", // Cambia el color de las etiquetas del eje x
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Oculta las líneas de cuadrícula en el eje y
        },
        ticks: {
          color: "#4A5568", // Cambia el color de las etiquetas del eje y
        },
      },
    },
  };
  
  const data = {
    labels: displayLabels,
    datasets: [
      {
        label: "mW Generados",
        data: displayData,
        borderColor: "#4A5568", // Cambia el color de la línea
        backgroundColor: "#4A5568", // Cambia el color del punto de fondo
        pointBackgroundColor: "#4A5568", // Cambia el color de los puntos
        pointBorderColor: "#4A5568", // Cambia el color del borde del punto
        borderWidth: 2,
      },
    ],
  };
  

  return (
    <Box
      bg="white"
      borderRadius="lg"
      shadow="md"
      p="6"
      height="370px"
      width={chartWidth} // Ajustar el ancho basado en `chartWidth`
      transition="width 0.3s ease-in-out"
    >
      <Flex justify="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Generated today
        </Text>
        <Text as="span" fontSize="md" fontWeight="medium" color="gray.500">
          {currentDate}
        </Text>
      </Flex>
      <Box h="250px" width="100%">
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
}
