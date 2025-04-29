"use client";
import { useEffect } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

export default function WeatherWidget() {
  useEffect(() => {
    // Cargar el script del nuevo widget de weatherwidget.io
    const script = document.createElement("script");
    script.src = "https://weatherwidget.io/js/widget.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box
      bg="white"
      borderRadius="lg"
      shadow="md"
      p="6"
      height="300px" 
      width="100%" 
      display="flex"
      flexDirection="column" // Colocar elementos en columna
    >
      {/* Contenedor del título */}
      <Text fontSize="xl" fontWeight="bold" mb="2" width="100%" textAlign="left">
        Weather
      </Text>

      {/* Contenedor del widget del clima */}
      <Box
        flex="1" // Tomar el espacio restante
        width="100%" // Abarcar todo el ancho disponible
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="2"
      >
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/en/19d04n98d21/puebla-city/"
          data-label_1="PUEBLA"
          data-label_2="WEATHER"
          data-icons="Climacons Animated"
          data-days="5"
          data-theme="pure"
          style={{ width: "100%", textAlign: "center", fontSize: "16px" }}
        >
          PUEBLA WEATHER
        </a>
      </Box>
    </Box>
  );
}
