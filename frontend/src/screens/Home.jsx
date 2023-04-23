import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Heading,
  Link,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/home/Navbar";
import Sidebar from "../components/home/Sidebar";
import { MdOutlineLocationOn } from "react-icons/md";

function Home() {
  return (
    <Box height="100%" width="100vw" bg="primary">
      <HStack width="100vw">
        <Sidebar />
        <Box
          width="72vw"
          height="100vh"
          display="flex"
          flexDir="column"
          gap="20px"
        >
          <Navbar />
          <Box
            height="40%"
            mt="1rem"
            display="flex"
            flexDir="column"
            borderRadius="5px"
            bg="white"
            padding="10px"
            gap="5px"
          >
            <HStack justifyContent="space-between" ml="3">
              <Heading fontWeight="500" color="#5A5A5A" fontSize="22px">
                05 Recomded jobs
              </Heading>
              <Link>view all</Link>
            </HStack>

            <HStack
              height="300px"
              // overflowX="none"
              
              overflowY="hidden"
              whiteSpace="nowrap"
              alignItems="flex-start"
              gap="1rem"
              ml="3"
              mt="3"
              sx={{
                "::-webkit-scrollbar": {
                  width: "2px",
                  height: "5px",
                },
                "::-webkit-scrollbar-track": {
                  // background: '#f1f1f1'
                  background: "white",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "secondary",
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-around"
                padding="0.5rem"
                flexDir="column"
                height="85%"
                bg="white"
                borderRadius="5px"
                border="1px solid rgba(75, 156, 149, 0.5) "
                width="450px"
              >
                <Text textAlign="end" width="100%">
                  3d ago
                </Text>
                <Link fontSize="20px" fontWeight="600" width="400px">
                  Machine Learning Engg
                </Link>
                <Link color="#5A5A5A">lecta consultansts</Link>
                <Box display="flex" flexDir="row" gap={3}>
                  <Icon boxSize={6} as={MdOutlineLocationOn} />
                  <Text color="#5A5A5A">Pune,Mumbai</Text>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-around"
                padding="0.5rem"
                flexDir="column"
                height="85%"
                bg="white"
                borderRadius="5px"
                border="1px solid rgba(75, 156, 149, 0.5) "
                width="450px"
              >
                <Text textAlign="end" width="100%">
                  3d ago
                </Text>
                <Link fontSize="20px" fontWeight="600" width="400px">
                  Machine Learning Engg
                </Link>
                <Link color="#5A5A5A">lecta consultansts</Link>
                <Box display="flex" flexDir="row" gap={3}>
                  <Icon boxSize={6} as={MdOutlineLocationOn} />
                  <Text color="#5A5A5A">Pune,Mumbai</Text>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-around"
                padding="0.5rem"
                flexDir="column"
                height="85%"
                bg="white"
                borderRadius="5px"
                border="1px solid rgba(75, 156, 149, 0.5) "
                width="450px"
                
              >
                <Text textAlign="end" width="100%">
                  3d ago
                </Text>
                <Link fontSize="20px" fontWeight="600" width="400px">
                  Machine Learning Engg
                </Link>
                <Link color="#5A5A5A">lecta consultansts</Link>
                <Box display="flex" flexDir="row" gap={3}>
                  <Icon boxSize={6} as={MdOutlineLocationOn} />
                  <Text color="#5A5A5A">Pune,Mumbai</Text>
                </Box>
              </Box>
              


            </HStack>
          </Box>
          <Box
            height="40%"
            mt="0.5rem"
            display="flex"
            flexDir="column"
            borderRadius="5px"
            bg="white"
            padding="10px"
            gap="10px"
          >
            <HStack justifyContent="space-between" ml="3">
              <Heading fontWeight="500" color="#5A5A5A" fontSize="22px">
                Top companies
              </Heading>
              <Link>view all</Link>
            </HStack>

            <Box
              display="flex"
              height="100%"
              width="100%"
              // overflowX="none"
              overflowY="hidden"
              whiteSpace="nowrap"
              gap="1rem"
              ml="3"
              mt="3"
              sx={{
                "::-webkit-scrollbar": {
                  width: "2px",
                  height: "5px",
                },
                "::-webkit-scrollbar-track": {
                  // background: '#f1f1f1'
                  background: "white",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "secondary",
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="flex-end"
                padding="1rem"
                flexDir="column"
                height="90%"
                bg="white"
                borderRadius="5px"
                border="1px solid rgba(75, 156, 149, 0.5) "
                width="450px"
                gap="0.5rem"
              >
                <Text
                  fontSize="20px"
                  fontWeight="600"
                  width="400px"
                  textAlign="center"
                >
                  Cerner
                </Text>
                <Box display="flex" justifyContent="center" gap="2">
                  <Text>3.4</Text>
                  <span>|</span>
                  <Text>22.2k reviews</Text>
                </Box>
                <Link
                  fontSize="16px"
                  display="flex"
                  color="#4B9C95"
                  fontWeight="500"
                  justifyContent="center"
                >
                  View Jobs
                </Link>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                padding="1rem"
                flexDir="column"
                height="90%"
                bg="white"
                borderRadius="5px"
                border="1px solid rgba(75, 156, 149, 0.5) "
                width="450px"
                gap="0.5rem"
              >
                <Text
                  fontSize="25px"
                  fontWeight="600"
                  width="400px"
                  textAlign="center"
                >
                  Cerner
                </Text>
                <Box display="flex" justifyContent="center" gap="2">
                  <Text>3.4</Text>
                  <span>|</span>
                  <Text>22.2k reviews</Text>
                </Box>
                <Link
                  fontSize="16px"
                  display="flex"
                  color="#4B9C95"
                  fontWeight="500"
                  justifyContent="center"
                >
                  View Jobs
                </Link>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                padding="1rem"
                flexDir="column"
                height="90%"
                bg="white"
                borderRadius="5px"
                border="1px solid rgba(75, 156, 149, 0.5) "
                width="450px"
                gap="0.5rem"
              >
                <Text
                  fontSize="25px"
                  fontWeight="600"
                  width="400px"
                  textAlign="center"
                >
                  Cerner
                </Text>
                <Box display="flex" justifyContent="center" gap="2">
                  <Text>3.4</Text>
                  <span>|</span>
                  <Text>22.2k reviews</Text>
                </Box>
                <Link
                  fontSize="16px"
                  display="flex"
                  color="#4B9C95"
                  fontWeight="500"
                  justifyContent="center"
                >
                  View Jobs
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
}

export default Home;
