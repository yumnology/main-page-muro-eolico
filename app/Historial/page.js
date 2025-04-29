"use client";

import { Box, SimpleGrid, Grid, GridItem, Heading, Flex } from "@chakra-ui/react";
import DynamicChart from "../components/DynamicChart"; 
import DaysCard from "../components/DaysCard";
import EnergyChart from "../components/EnergyChart";
import OverviewCard from "../components/OverviewCard";
import Button from "../components/Button"; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

// Funcin para obtener datos desde la API
async function getAllWallData() {
  try {
      const response = await fetch('https://api-muro-eolico.onrender.com/api/v1/readAll');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al obtener los datos de la API:", error);
      return [];
  }
}

async function getData() {
  try {
    const response = await fetch('https://api-muro-eolico.onrender.com/api/v1/getTotal', {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'cors': 'no-cors'
      }

    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

async function getCurrentMonth() {
  try {
    const response = await fetch('https://api-muro-eolico.onrender.com/api/v1/getCurrentMonth', {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'cors': 'no-cors'
      }

    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

async function getWeek() {
  try {
    const response = await fetch('https://api-muro-eolico.onrender.com/api/v1/getWeek', {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'cors': 'no-cors'
      }

    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

async function getCurrentDay() {
  try {
    const response = await fetch('https://api-muro-eolico.onrender.com/api/v1/getCurrentDay', {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'cors': 'no-cors'
      }

    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

async function getAllHours() {
  try {
    const response = await fetch('https://api-muro-eolico.onrender.com/api/v1/getAllHours', {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'cors': 'no-cors'
      }

    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}


export default function HistorialPage() {

  const [data, setData] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [week, setWeek] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const [allHours, setAllHours] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Función para obtener y actualizar datos
    const fetchData = async () => {
      const data = await getData();
      setData(data);
      const currentMonth = await getCurrentMonth();
      setCurrentMonth(currentMonth);
      const week = await getWeek();
      setWeek(week);
      const currentDay = await getCurrentDay();
      setCurrentDay(currentDay);
      const allHours = await getAllHours();
      setAllHours(allHours);
    };

    // Obtén los datos inmediatamente al montar el componente
    fetchData();

    // Configura un intervalo para obtener datos cada 10 segundos
    const intervalId = setInterval(fetchData, 10000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  // FUNCIÓN PARA EXPORTAR LOS DATOS EN FORMATO EXCEL - AQUÍ INCIA LA FUNCIÓN
  // Moví la función aquí abajo para darle un efecto al botón xd, arriba no me servía 
  async function exportToExcel() {
    setIsExporting(true);
    // Obtener los datos de la API
    const jsonData = await getAllWallData();

    if (jsonData.length === 0) {
        alert("No hay datos para exportar.");
        setIsExporting(false); // Desactivar estado de carga si no hay datos
        return;
    }

    // Crear un nuevo libro de trabajo con ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    // Crear la fila de encabezado con estilos
    const header = Object.keys(jsonData[0]);
    const headerRow = worksheet.addRow(header);

    // Aplicar estilos a la fila de encabezado
    headerRow.eachCell((cell, colNumber) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D3D3D3' }  // Color gris claro
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    // Aadir datos al worksheet y aplicar formato condicional a las filas con 'hour'
    jsonData.forEach((item) => {
        const row = worksheet.addRow(Object.values(item));

        // Aplicar estilos de fondo gris claro si la fila corresponde a una hora especfica
        if (item.hour) {
            row.eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'F0F0F0' }  // Color gris claro para las filas de horas
                };
            });
        }
    });

    // Ajustar el ancho de las columnas segn el contenido
    worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
            maxLength = Math.max(maxLength, cell.value ? cell.value.toString().length : 0);
        });
        column.width = maxLength < 10 ? 10 : maxLength;
    });

    // Crear el archivo Excel y desencadenar la descarga
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, "datos_muroeolico.xlsx");
    setIsExporting(false);
  }

  // AQUÍ TERMINA LA FUNCIÓN PARA EXPORTAR LOS DATOS EN EXCEL


  return (
    <Box px="8" py="4" height="100vh" bg="#F8F9FA" position="relative">
      <Box position="absolute" top="16px" right="16px">
        <Button
          onClick={exportToExcel}
          loading={isExporting} // Pasar el estado de carga al botón
          loadingText="Loading"
        >
          Export
        </Button>
      </Box>

      <Box mb="8" pt="10"> 
        <Heading as="h3" size="lg" mb="4">Overview</Heading>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing="4">
          <OverviewCard bg="blue.50" title="Today" value={(currentDay?.total ** 2/216 * 1000).toFixed(4)} unit="mW" />
          <OverviewCard title="This week" value={(week?.total_week ** 2/216 * 1000).toFixed(4)} unit="mW" bg="purple.50"/>
          <OverviewCard title="This month" value={(currentMonth?.total ** 2/216 * 1000).toFixed(4)} unit="mW" bg="blue.50"/>
          <OverviewCard title="All generated" value={(data?.total ** 2/216 * 1000).toFixed(4)} unit="mW" bg="purple.50"/>
        </SimpleGrid>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={6} mb={8}>
        <GridItem>
          <EnergyChart allHours={allHours}/>
        </GridItem>
        <GridItem>
          <DaysCard weekData={week}/>
        </GridItem>
      </Grid>

      <Box mt="8">
        <DynamicChart />
      </Box>
    </Box>
  );
}