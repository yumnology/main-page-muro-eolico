"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import { ChakraProvider, Box, Flex, IconButton } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa"; // Importar FaBars para el botón de apertura
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado inicial para el Sidebar

  // Función para alternar la visibilidad del Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para cerrar el Sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pared Eólica</title>
      </head>
      <body className={inter.className}>
        <ChakraProvider>
          {/* Contenedor Principal */}
          <Flex className="main-container" minHeight="100vh">
            {/* Sidebar con las propiedades isOpen y onClose */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Contenido principal */}
            <Box
              className="content-container"
              flex="1"
              ml={{ base: isSidebarOpen ? "250px" : "0" }} // Ajustar margen izquierdo según el estado del Sidebar
              transition="margin-left 0.3s ease" // Transición suave para el cambio de margen
              position="relative"
            >
              {/* Header con botón de menú */}
              <Header>
                <IconButton
                  aria-label="Abrir menú"
                  icon={<FaBars />} // Mostrar icono de barra cuando el Sidebar está cerrado
                  onClick={toggleSidebar} // Cambiar el estado cuando se presiona el botón
                  size="lg"
                  variant="outline"
                  position="fixed"
                  top="1%"
                  left="16px"
                  zIndex="1000"
                  display={!isSidebarOpen ? "inline-flex" : "none"} // Mostrar el botón solo si el Sidebar está cerrado
                />
              </Header>

              {/* Contenido de la página */}
              <Box className="page-content" p="4" mt="64px" height="calc(100vh - 64px)">
                {children}
              </Box>
            </Box>
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
