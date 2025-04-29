
'use client';
import { ChakraProvider, Flex, Heading, Box } from '@chakra-ui/react';
import Button from '../components/Button';
import CardsContainer from "../components/CardsContainer";
import MonthlyEnergyChart from "../components/MonthlyEnergyChart";
import GroupChartContainer from "../components/GroupChartContainer";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import OverviewCard from '../components/OverviewCard';
import CardsContainer2 from '../components/CardsContainer2';
import ButtonTest from '../components/ButtonTest';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


async function getData() {
  try {
    const response = await fetch('https://api-muro-eolico.onrender.com/api/v1/readLatest', {
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
async function getGroupsData() {
  try {
    const response = await fetch('https://api-muro-eolico.onrender.com/api/v1/get_totals', {
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

async function getTempLatest(group){
  try {
    const response = await fetch(`https://api-muro-eolico.onrender.com/api/v1/readTempLatest/${group}`, {
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

export default function Home() {

  //const data = {propeller1: 1, propeller2: 1, propeller3: 1, propeller4: 1, propeller5: 1}
  // const data = await getData();
  // const dayTotalData = await getLatestDay();
  
  const [data, setData] = useState(null);
  const [groups, setGroups] = useState(null);
  const [dayTotalData, setDayTotalData] = useState(null);
  const [tempLatest1, setTempLatest1] = useState(null);
  const [tempLatest2, setTempLatest2] = useState(null);
  const [showFirstContainer, setShowFirstContainer] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    // Función para obtener y actualizar datos
    const fetchData = async () => {
      const latestData = await getData();
      const latestDay = await getCurrentDay();
      setData(latestData);
      setDayTotalData(latestDay);
      const tempLatest1 = await getTempLatest(1);
      setTempLatest1(tempLatest1);
      const tempLatest2 = await getTempLatest(2)
      setTempLatest2(tempLatest2)
      const groups = await getGroupsData();
      setGroups(groups);
    };

    // Obtén los datos inmediatamente al montar el componente
    fetchData();

    // Configura un intervalo para obtener datos cada 10 segundos
    const intervalId = setInterval(fetchData, 10000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const deleteData = async () => {
      try {
        const response = await fetch('https://api-muro-eolico.onrender.com/api/v1/resetTempWallData', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'cors': 'no-cors'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Data deleted successfully');
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };

    // Set up an interval to delete data every 5 minutes
    const intervalId = setInterval(deleteData, 300000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

   // Función para alternar entre los dos contenedores
   const toggleContainer = () => {
    setIsExiting(true); // Inicia la animación de salida

    setTimeout(() => {
      setShowFirstContainer(!showFirstContainer); // Cambia el contenedor
      setIsExiting(false); // Restablece la animación de entrada
    }, 500); // La duración debe coincidir con la duración de la animación `fadeOut`
  };

  return (
    <main>
      <ChakraProvider>
        <Flex direction="column" align="center" height="100vh" padding="20px">
          <Flex width="90%" justify="space-between" align="center" marginBottom="20px">
            <Heading as="h3" size="lg" mb="4">Propellers Overview</Heading>
            <Box>
              <Flex alignItems="center" gap="8px">
                <ButtonTest
                  onClick={toggleContainer}
                  icon={<FaArrowLeft />}
                  isDisabled={showFirstContainer} // Deshabilitar si ya está en el grupo 1
                  colorScheme={showFirstContainer ? "gray" : "blue"} // Cambia el color si está deshabilitado
                />
                <ButtonTest
                  onClick={toggleContainer}
                  icon={<FaArrowRight />}
                  isDisabled={!showFirstContainer} // Deshabilitar si ya está en el grupo 2
                  colorScheme={!showFirstContainer ? "gray" : "blue"} // Cambia el color si está deshabilitado
                />
              </Flex>
            </Box>
          </Flex>

          {/* Esta sección es para cambiar el grupo de helices */}
          
          {showFirstContainer ? (
            <CardsContainer latestData={tempLatest1} onToggle={toggleContainer} isExiting={isExiting} />
          ) : (
            <CardsContainer2 latestData={tempLatest2} onToggle={toggleContainer} isExiting={isExiting} />
          )}


          <Flex width="90%" justify="space-between" alignItems="flex-start" marginTop="30px">
            <GroupChartContainer dayTotalData={dayTotalData} groups={groups} temp1={tempLatest1} temp2={tempLatest2}/>

            <Flex direction="column" gap="4" width="25%"> 
              <OverviewCard title="Today" value={(dayTotalData?.total ** 2/216 * 1000).toFixed(4) || 'N/A'} unit="mW" />
              <OverviewCard title="Now" value={(((tempLatest1?.propeller1 + tempLatest1?.propeller2 + tempLatest1?.propeller3 + tempLatest1?.propeller4 + tempLatest1?.propeller5 + tempLatest2?.propeller1 + tempLatest2?.propeller2 + tempLatest2?.propeller3 + tempLatest2?.propeller4 + tempLatest2?.propeller5) ** 2/216 * 1000).toFixed(4) ) || 'N/A'} unit="mW" />
            </Flex>
          </Flex>
        </Flex>
      </ChakraProvider>
    </main>
  );
}