"use client";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function OverviewCard({ title, value, unit }) {
  return (
    <Box bg="blue.50" borderRadius="lg" shadow="md" p="6">
      <Text fontSize="sm" fontWeight="medium" color="gray.600">{title}</Text>
      <Flex alignItems="baseline" justifyContent="space-between" mt="4">
        <Text fontSize="3xl" fontWeight="bold">{value}</Text>
        <Text fontSize="sm" color="gray.500">{unit}</Text>
      </Flex>
    </Box>
  );
}
