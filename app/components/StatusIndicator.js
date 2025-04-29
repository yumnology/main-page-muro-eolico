import { Box, Text } from "@chakra-ui/react";

const getStatusColor = (status) => {
  return status === 1 ? "green.400" : "red.400";
};

export default function StatusIndicator({ status }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      borderRadius="md"
      bg="white"
      boxShadow="md"
      p={6}
      textAlign="center"
      transition="background 0.3s ease-in-out"
    >
      <Box
        width={12}
        height={12}
        borderRadius="full"
        bg={getStatusColor(status)}
        mb={4}
        transition="background 0.3s ease-in-out"
      />
      <Text fontSize="lg" fontWeight="bold">
        {status === "loading" ? "Checking status..." : `Status: ${status}`}
      </Text>
    </Box>
  );
}