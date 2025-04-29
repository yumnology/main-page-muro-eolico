import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading } from '@chakra-ui/react';

const DailyHistory = ({daysData}) => {

  const data = daysData
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .map((day) => {
      return {
        fecha: day.created_at,
        energia: ((day.total / day.entries) * 50).toFixed(2)
      };
    });

  return (
    <TableContainer width="90%" >
      <Heading size="md" marginBottom="20px">Energía por día</Heading>
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th backgroundColor="green.400" color="white" borderLeftRadius="15px">Fecha</Th>
            <Th backgroundColor="green.400" color="white" borderRightRadius="15px">Energía total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.fecha}</Td>
              <Td>mW {row.energia} </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DailyHistory;
