"use client";

import { Box, Text, Link as ChakraLink, VStack, IconButton, Flex, Icon, Divider } from "@chakra-ui/react";
import { FaHome, FaWind, FaHistory, FaTimes, FaBolt } from "react-icons/fa";
import Link from 'next/link'; // Importar Link de Next.js para manejar la navegación

export default function Sidebar({ isOpen, onClose }) {
  return (
    <Box
      as="aside"
      position="fixed" // Mantener el sidebar fijo
      top="0"
      left={isOpen ? "0" : "-250px"} // Ajustar la posición del sidebar según su estado
      w="250px"
      h="100vh" // Asegurar que ocupe toda la altura de la pantalla
      bg="white"
      boxShadow="md"
      zIndex="1001"
      borderRight="1px solid"
      borderColor="gray.200"
      transition="left 0.3s ease" // Transición suave para apertura y cierre
      display="flex" // Usar flexbox para estructura
      flexDirection="column" // Dirección vertical para los elementos del sidebar
    >
      {/* Header del Sidebar con botón de cierre */}
      <Flex justifyContent="space-between" alignItems="center" p="4">
        {/* Título del Sidebar */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          Wind wall
          </Text>
          <Text fontSize="md" color="gray.500">
            Ibero Puebla
          </Text>
        </Box>

        {/* Botón para cerrar el Sidebar */}
        <IconButton
          aria-label="Cerrar Sidebar"
          icon={<FaTimes />} // Usar FaTimes como icono
          onClick={onClose} // Llamar a la función `onClose` para ocultar el Sidebar
          size="lg" // Hacer el botón más grande
          variant="ghost"
          color="gray.600"
        />
      </Flex>

      {/* Divider para separar el header del contenido */}
      <Divider borderColor="gray.200" mb="4" />

      {/* Contenedor Flex para empujar los elementos hacia abajo */}
      <Flex direction="column" flex="1" justifyContent="space-between">
        {/* Sección de Dashboards */}
        <VStack align="start" spacing="4" px="6">

          <ChakraLink href="/" display="flex" alignItems="center" onClick={onClose} py="2" w="full">
            <Icon as={FaHome} mr="3" />
            Main
          </ChakraLink>

          <ChakraLink href="/Helices" display="flex" alignItems="center" onClick={onClose} py="2" w="full">
            <Icon as={FaWind} mr="3" />
            Propellers
          </ChakraLink>


          <ChakraLink href="/Historial" display="flex" alignItems="center" onClick={onClose} py="2" w="full">
            <Icon as={FaHistory} mr="3" />
            History
          </ChakraLink>

          <ChakraLink href="/Actividad" display="flex" alignItems="center" onClick={onClose} py="2" w="full">
            <Icon as={FaBolt} mr="3" />
            Activity
          </ChakraLink>

        </VStack>

        {/* Footer del sidebar */}
        <Box px="6" py="4">
          <Text fontSize="sm" color="gray.500">
            © 2024 Ibero Puebla
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
