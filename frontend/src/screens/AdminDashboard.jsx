import React, { useEffect, useState } from "react";
import SideBar from "../components/adminDashboard/SideBar";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import SignUp from "../components/auth/SignUp";
import { color } from "framer-motion";

import axios from "../utils/axiosConfig";
import { useAuth } from "../contexts/AuthContext";

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const approveEmployer = (uid) => {
  console.log(uid);
}

const blockEmployer = (uid) => {
  console.log(uid);
}

const EmployerTableRow = ({ employer, index }) => {
  return (
    <>
      <Tr>
        <Td textTransform={'capitalize'} >{index}. {employer.name}</Td>
        <Td>{generateRandomString()}</Td>
        <Td
          display="flex"
          justifyContent="space-between"
          width="92%"
          pl={0}
          pr={0}
          gap="1rem"
        >
          <Button
            color="white"
            bg="#009645"
            width="50%"
            borderRadius="5px"
            fontWeight="400"
            _hover={{ bg: "green" }}
            disabled={true}
            onClick={() => approveEmployer(employer._id)}
          >
            Approve
          </Button>
          <Button
            color="white"
            width="50%"
            bg="red"
            borderRadius="5px"
            fontWeight="400"
            _hover={{ bg: "red.600" }}
            disabled={employer.verified}
            onClick={() => blockEmployer(employer._id)}
          >
            Block
          </Button>
        </Td>
      </Tr>
    </>
  );
};

const AdminDashboard = () => {
  const { token } = useAuth();

  const [employers, setEmployers] = useState([]);

  const getAllEmployers = async () => {
    let res;
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      res = await axios.get("/all-employers", config);
      console.log(res);
      setEmployers(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllEmployers();
  }, []);
  return (
    <Box
      bg="primary"
      justifyContent="center"
      display="flex"
      pos={"sticky"}
      top={"0rem"}
    >
      <Box>
        <SideBar />
      </Box>

      <Box display="flex" flexDir="column" ml={8} width={"100%"} gap={6}>
        {" "}
        <Box
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          gap="1rem"
          pos="sticky"
          top="0.7rem"
          bg="primary"
        >
          <Heading>COMMIT</Heading>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="primary"
          >
            <Text textAlign="center" fontSize="24px" fontWeight="600">
              DASHBOARD
            </Text>
            <Button
              colorScheme="green"
              bgColor="secondary"
              variant="solid"
              mr="20px"
            >
              Download reports
            </Button>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Button
              borderRadius="5px"
              bgColor="secondary"
              width="35%"
              height="70px"
              color="white"
              fontWeight="400"
              _hover={{ bg: "black" }}
            >
              Pending Request
            </Button>
            <Button
              borderRadius="5px"
              bgColor="secondary"
              width="60%"
              height="70px"
              color="white"
              fontWeight="400"
              mr="20px"
              _hover={{ bg: "black" }}
            >
              All Companies
            </Button>
          </Box>

          <Box border="2px solid #4B9C95" mr="20px" mt="10px"></Box>
        </Box>
        <Box
          mt="1rem"
          mb="1rem"
          height="62vh"
          mr="20px"
          overflowY="scroll"
          pos=""
          sx={{
            "::-webkit-scrollbar": {
              width: "10px",
            },
            "::-webkit-scrollbar-track": {
              // background: '#f1f1f1'
              background: "gray",
            },
            "::-webkit-scrollbar-thumb": {
              background: "black",
            },
          }}
        >
          <TableContainer overflow="hidden">
            <Table
              variant="unstyled"
              __css={{ tableLayout: "fixed", width: "full" }}
            >
              <Thead>
                <Tr>
                  <Th p="0px" textTransform="none">
                    <Box
                      display="flex"
                      alignItems="center"
                      width="92%"
                      fontSize="18px"
                      fontWeight="400"
                      bg="secondary"
                      height="4rem"
                      borderRadius="5px"
                      color="white"
                      pl="5%"
                    >
                      Company Names
                    </Box>
                  </Th>
                  <Th p="0px" textTransform="none">
                    <Box
                      display="flex"
                      alignItems="center"
                      width="92%"
                      fontSize="18px"
                      fontWeight="400"
                      bg="secondary"
                      height="4rem"
                      borderRadius="5px"
                      color="white"
                      pl="5%"
                    >
                      Gst number
                    </Box>
                  </Th>

                  <Th p="0px" textTransform="none">
                    <Box
                      display="flex"
                      alignItems="center"
                      width="92%"
                      fontSize="18px"
                      fontWeight="400"
                      bg="secondary"
                      height="4rem"
                      borderRadius="5px"
                      color="white"
                      pl="5%"
                    >
                      Status
                    </Box>
                  </Th>
                </Tr>
              </Thead>
              <Tbody fontSize="18px">
                <Tr>
                  <Td>1. Google</Td>
                  <Td>36AAGCG6803L1ZD</Td>
                  <Td
                    display="flex"
                    justifyContent="space-between"
                    width="92%"
                    pl={0}
                    pr={0}
                    gap="1rem"
                  >
                    <Button
                      color="white"
                      bg="#009645"
                      width="50%"
                      borderRadius="5px"
                      fontWeight="400"
                      _hover={{ bg: "green" }}
                    >
                      Approve
                    </Button>
                    <Button
                      color="white"
                      width="50%"
                      bg="red"
                      borderRadius="5px"
                      fontWeight="400"
                      _hover={{ bg: "red.600" }}
                    >
                      Deny
                    </Button>
                  </Td>
                </Tr>
                {employers.map((emp,index) => <EmployerTableRow index={index + 1} employer={emp} key={`emp-${index}`} />)}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
