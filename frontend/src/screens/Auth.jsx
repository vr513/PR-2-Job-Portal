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
import { useState } from "react";

export default function auth() {
  const [currentForm, setCurrentForm] = useState("signIn");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <Box bgColor="#E1EDEC" width="100vw" height="100vh">
      <Box>
        <Heading pl="5%" py="1rem">
          ## commit
        </Heading>
      </Box>
      <HStack display="flex" height="80vh">
        <Box width="60%">
          <Box pl="10%">
            <Img
              width="80%"
              height="70%"
              src="https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ></Img>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="40%"
          height="80vh"
        >
          <Container h={"80vh"}>
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
                  color={currentForm === "signIn" ? "#fff" : "#000"}
                  onClick={() => toggleForm("signIn")}
                  _hover={{}}
                >
                  sign in
                </Button>
                <Button
                  backgroundColor={
                    currentForm === "signUp" ? "#000" : "#E1EDEC"
                  }
                  borderRadius="32px"
                  fontFamily="Poppins"
                  fontSize="0.9rem"
                  fontWeight="400"
                  lineHeight="18px"
                  height="30px"
                  color={currentForm === "signUp" ? "#fff" : "#000"}
                  onClick={() => toggleForm("signUp")}
                  _hover={{}}
                >
                  sign up
                </Button>
              </Box>
              {currentForm === "signIn" ? (
                <Login toggleForm={toggleForm} />
              ) : (
                <SignUp toggleForm={toggleForm} currentForm={currentForm} />
              )}
            </Box>
          </Container>
        </Box>
      </HStack>
    </Box>
  );
}
