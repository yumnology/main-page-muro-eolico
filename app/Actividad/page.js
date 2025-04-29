"use client";
import { Box, SimpleGrid, Heading, Text, VStack, Divider, List, ListItem, Badge, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import StatusIndicator from "../components/StatusIndicator";

async function getSystemStatus() {
  try {
    const response = await fetch("https://api-muro-eolico.onrender.com/api/v1/status", {
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching system status:", error);
    return { status: 0, lastUpdate: "N/A" };
  }
}

async function getStatusHistory() {
  try {
    const response = await fetch("https://api-muro-eolico.onrender.com/api/v1/statusHistory", {
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching status history:", error);
    return [];
  }
}

export default function MonitorPage() {
  const [statusData, setStatusData] = useState({ status: 0, lastUpdate: "--" });
  const [statusHistory, setStatusHistory] = useState([]);
  const [lastActiveTime, setLastActiveTime] = useState(null);
  const [xiaoInactive, setXiaoInactive] = useState(false);
  const [restartDetected, setRestartDetected] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const data = await getSystemStatus();
      setStatusData({ status: data.status, lastUpdate: data.lastUpdate || "--" });

      const history = await getStatusHistory();
      setStatusHistory(history);

      if (data.status === 1) {
        if (xiaoInactive) {
          setRestartDetected(true);
        }
        setLastActiveTime(new Date(data.lastUpdate));
        setXiaoInactive(false);
      } else {
        if (lastActiveTime) {
          const now = new Date();
          const diffMinutes = (now - lastActiveTime) / 60000;
          if (diffMinutes >= 6) {
            setXiaoInactive(true);
          }
        }
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 180000); // Se actualiza cada 3 minutos

    return () => clearInterval(intervalId);
  }, [lastActiveTime, xiaoInactive]);

  return (
    <Box px="8" py="4" height="100vh" bg="#F8F9FA">
      <Heading as="h3" size="lg" mb="4" textAlign="center">
        Device Status Monitoring
      </Heading>
      <SimpleGrid columns={1} spacing="4">
        {/* Estado Actual */}
        <VStack spacing={4} p={6} bg="white" borderRadius="lg" boxShadow="xl" align="center" w="full">
          <StatusIndicator status={statusData.status} />
          <Divider />
          <Text fontSize="md" color="gray.600">
            Last Updated: <strong>{statusData.lastUpdate}</strong>
          </Text>
          <Text fontSize="sm" color="gray.500">Monitoring system checks every 3 minutes.</Text>
          {xiaoInactive && <Text color="red.500" fontWeight="bold">⚠️ Xiao may be inactive (no update for 6+ minutes)</Text>}
          {restartDetected && <Text color="green.500" fontWeight="bold">✅ Xiao was restarted</Text>}
        </VStack>

        {/* Historial de Estado */}
        <VStack spacing={4} p={6} bg="white" borderRadius="lg" boxShadow="xl" align="center" w="full" overflowY="auto" maxH="400px">
          <Heading as="h4" size="md" mb="2">Status History</Heading>
          <List spacing={2} w="full" px={4}>
            {statusHistory.length > 0 ? (
              statusHistory.map((entry, index) => (
                <ListItem 
                  key={index} 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center" 
                  bg="gray.50" 
                  p={2} 
                  borderRadius="md"
                  boxShadow="sm"
                >
                  <Text fontSize="sm" color="gray.700">
                    {entry.lastUpdate}
                  </Text>
                  <Badge 
                    colorScheme={entry.status === 1 ? "green" : "red"} 
                    fontSize="xs" 
                    p={1.5} 
                    borderRadius="full"
                    minW="80px"
                    textAlign="center"
                  >
                    <Icon as={entry.status === 1 ? FaCheckCircle : FaTimesCircle} mr={1} boxSize={3} />
                    {entry.status === 1 ? "ACTIVE" : "NOT ACTIVE"}
                  </Badge>
                </ListItem>
              ))
            ) : (
              <Text color="gray.500">No history available</Text>
            )}
          </List>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}
