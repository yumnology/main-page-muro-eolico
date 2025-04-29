import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading } from '@chakra-ui/react';

const MonthlyHistory = ({monthsData, daysData}) => {

  const monthConvertor = (month) => {
    switch (month) {
      case '01':
        return 'Enero';
      case '02':
        return 'Febrero';
      case '03':
        return 'Marzo';
      case '04':
        return 'Abril';
      case '05':
        return 'Mayo';
      case '06':
        return 'Junio';
      case '07':
        return 'Julio';
      case '08':
        return 'Agosto';
      case '09':
        return 'Septiembre';
      case '10':
        return 'Octubre';
      case '11':
        return 'Noviembre';
      case '12':
        return 'Diciembre';
      default:
        return 'Mes no válido';
    }
  };

  const totalEnergyPerMonth = (month) => {
    let total = 0;
    daysData.forEach((day) => {
      if (day.created_at.includes(month)) {
        total += ((day.total / day.entries) * 50);
      }
    });
    return total.toFixed(2);
  };

  const data = monthsData.map((month) => {
    return {
      mes: monthConvertor(month.month),
      energia: totalEnergyPerMonth(month.month)
    };
  });

  return (
    <TableContainer marginTop="30px" width="90%">
      <Heading size="md" marginBottom="20px">Energía por mes</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th backgroundColor="green.400" color="white" borderLeftRadius="15px">Mes</Th>
            <Th backgroundColor="green.400" color="white" borderRightRadius="15px">Energía total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.mes} 2024</Td>
              <Td>mW {row.energia}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MonthlyHistory;
