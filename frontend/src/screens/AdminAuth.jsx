import {
    Box,
    Flex,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    Button,
    Img,
  } from "@chakra-ui/react";
  import Login from "../components/auth/Login";
  import SignUp from "../components/auth/SignUp";
  import AdminSignup from "../components/auth/AdminSignup";
  import { useState } from "react";
  import AuthImg from "../assets/auth.png"
  
  export default function AdminAuth() {
    const [currentForm, setCurrentForm] = useState("signup");
    const toggleForm = (formName) => {
      setCurrentForm(formName);
    };

    return (
      <Box display="flex" justifyContent="center" justifyItems ="center" flexDir="column" bgColor="#E1EDEC" width="100vw" height="100vh" >
        <HStack display="flex" height="80vh" marginLeft="30%" width="100%">
  
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width="40%"
            height="80vh"
          >
            <Container h={"80vh"} >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                bg="white"
                borderRadius="22px"
                gap="1rem"
                padding="40px"
                outline="0"
              >
                <Box
                  as="div"
                  display="flex"
                  width="45%"
                  justifyContent="space-evenly"
                  borderRadius="32px"
                  gap={"10px"}
                >
                  <Button
                    backgroundColor={
                      currentForm === "signIn" ? "#000" : "#E1EDEC"
                    }
                    borderRadius="32px"
                    fontFamily="Poppins"
                    fontSize="0.9rem"
                    fontWeight="400"
                    lineHeight="18px"
                    height="30px"
                    width="100%"
                    color={currentForm === "signIn" ? "#fff" : "#000"}
                    _hover={{}}
                  >
                    admin portal
                  </Button>
                </Box>
                
                  <AdminSignup toggleForm={toggleForm} currentForm={currentForm} />
              </Box>
            </Container>
          </Box>
        </HStack>
      </Box>
    );
  }
  