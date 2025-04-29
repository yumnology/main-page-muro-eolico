"use client";
import { Button as ChakraButton } from "@chakra-ui/react";

const ButtonTest = ({ onClick, loading = false, icon, isDisabled = false, ...props }) => {
  return (
    <ChakraButton
      onClick={onClick}
      variant="outline" 
      borderRadius="md" // Bordes rectangulares
      p="4" 
      w="40px" 
      h="40px" 
      fontSize="lg"
      transition="all 0.2s ease-in-out"
      isLoading={loading}
      isDisabled={isDisabled}
      spinnerPlacement="center"
      bg="white" // Fondo blanco
      borderColor={isDisabled ? "gray.300" : "gray.500"} 
      color={isDisabled ? "gray.300" : "gray.600"}
      _hover={{
        bg: isDisabled ? "white" : "gray.100", 
        color: isDisabled ? "gray.300" : "gray.800", 
      }}
      _active={{
        bg: isDisabled ? "white" : "gray.200", 
      }}
      _disabled={{
        cursor: "not-allowed", 
        opacity: 0.5,
      }}
      {...props}
    >
      {!loading && icon} 
    </ChakraButton>
  );
};

export default ButtonTest;
