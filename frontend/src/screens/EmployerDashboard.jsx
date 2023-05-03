import React from "react";
import Navbar from "../components/Navbar";
import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";

const TableHeading = ({ heading }) => {
  return (
    <>
      <Box
        fontFamily={"Poppins"}
        background={"#4B9C95"}
        w={"30%"}
        p={"1rem"}
        borderRadius={"15px"}
      >
        <Text fontSize={"20px"} color={"#FFF"} lineHeight={"36px"}>
          {heading}
        </Text>
      </Box>
    </>
  );
};

const TableRow = () => {
  return (
    <>
      <HStack w={"100%"} justifyContent={'space-between'}>
        <Box fontFamily={"Poppins"} w={"30%"} px={"1rem"}>
          <Text fontSize={"16px"} color={"#000"} lineHeight={"36px"}>
            Job name
          </Text>
        </Box>
        <Box fontFamily={"Poppins"} w={"30%"} px={"1rem"}>
          <Text w={'100%'} textAlign={'center'} fontSize={"16px"} color={"#000"} lineHeight={"36px"}>
            25
          </Text>
        </Box>
        <HStack justifyContent={'space-around'} fontFamily={"Poppins"} w={"30%"} px={"1rem"} color={'#FFF'}>
          <Button _hover={{}} borderRadius={'25px'} backgroundColor={'#009645'}>Open</Button>
          <Button _hover={{}} borderRadius={'25px'} backgroundColor={'#7C0000'}>Close</Button>
        </HStack>
      </HStack>
    </>
  );
};

const EmployerDashboard = () => {
  return (
    <>
      <Box minH={"100vh"} height={"auto"} w={"100%"} bg={"primary"}>
        <Box position={"relative"} w={"100%"} h={"30vh"} background={"#4B9C95"}>
          <Navbar color={'#FFF'} />
          <Box position={"relative"} p={"2rem"} pt={"4rem"}>
            <VStack
              alignItems={"flex-start"}
              fontFamily={"Poppins"}
              color={"#FFF"}
            >
              <Heading
                fontWeight={700}
                fontSize={"36px"}
                lineHeight={"54px"}
                as={"h2"}
              >
                DASHBOARD
              </Heading>
              <Text fontSize={"16px"} opacity={"75%"}>
                Welcome to your Dashboard
              </Text>
            </VStack>
          </Box>
        </Box>
        <Box w={"100%"} p={"3rem"} h={"100%"}>
          <Box
            display={"flex"}
            w={"100%"}
            flexDir={"row"}
            justifyContent={"space-between"}
          >
            <TableHeading heading={"Job Name"} />
            <TableHeading heading={"Number of Applicants"} />
            <TableHeading heading={"Status"} />
          </Box>
          <VStack w={"100%"} mt={'1rem'}>
            <TableRow />
            <TableRow />
            <TableRow />
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default EmployerDashboard;
