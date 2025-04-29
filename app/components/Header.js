"use client";
import { usePathname } from 'next/navigation';
import { Flex, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { FaHome, FaWind, FaHistory } from "react-icons/fa"; // Importar los iconos necesarios

export default function Header({ children }) {
  const pathname = usePathname();

  // Determinar el icono en base a la ruta
  const getHomeIcon = () => {
    switch (pathname) {
      case "/":
        return FaHome;
      case "/Helices":
        return FaWind;
      case "/Historial":
        return FaHistory;
      default:
        return FaHome; // Fallback por defecto al icono de home
    }
  };

  return (
    <Flex
      as="header"
      w="full"
      h="16"
      px="8"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      {/* Contenido centrado del Header */}
      <Box>
        <Breadcrumb separator="/" fontSize="lg" color="gray.700">
          <BreadcrumbItem>
            {/* Icono inicial que cambia según la página */}
            <BreadcrumbLink href="/">
              <Icon as={getHomeIcon()} mr="1" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Wind wall</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            {/* Solo el nombre de la página sin icono adicional */}
            <BreadcrumbLink href="#">
              {pathname === "/" ? "Main" : pathname.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      {/* Botón de cierre del menú se posiciona en la derecha (pasado como children) */}
      <Box position="absolute" right="16px">
        {children}
      </Box>
    </Flex>
  );
}
