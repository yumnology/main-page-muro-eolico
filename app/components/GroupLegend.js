import { Box, Flex, Text, Icon, Spacer, Center } from '@chakra-ui/react';

const GroupLegend = ({dayTotalData}) => {
  const groups = [
    { name: 'Group 1', turbines: 'Propeller 1, Propeller 2, Propeller 3, Propeller 4, Propeller5', color: '#36A2EB'},
    { name: 'Group 2', turbines: 'Propeller 6, Propeller 7, Propeller 8, Propeller 9, Propeller10', color: '#FF9F40'}
  ];

  return (
    <Box>
        <Text fontSize="md" as={'b'}>
         Total generated in the day <br></br>
          <Center>
            {dayTotalData?.date}
          </Center>
        </Text>
      {groups.map((group, index) => (
        <Flex key={index} align="center" marginBottom="20px" marginTop='20px' marginLeft='30px'>

          <Box
            width="12px"
            height="12px"
            backgroundColor={group.color}
            borderRadius="50%"
            marginRight="10px"
          />
          <Text fontSize="sm">
            <strong>{group.name}</strong> <br /> {group.turbines}
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export default GroupLegend;
