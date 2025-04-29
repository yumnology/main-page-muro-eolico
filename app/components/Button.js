"use client";
import { Button as ChakraButton, Icon } from "@chakra-ui/react";
import { FaFileExport } from "react-icons/fa";

const Button = ({ onClick, children, loading = false, loadingText = "Loading", ...props }) => {
  return (
    <ChakraButton
      onClick={onClick}
      colorScheme="gray"
      variant="outline"
      leftIcon={!loading && <Icon as={FaFileExport} />}
      size="md"
      _hover={{ bg: "gray.100" }}
      _active={{ bg: "gray.200" }}
      isLoading={loading}
      loadingText={loadingText}
      spinnerPlacement="start"
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
