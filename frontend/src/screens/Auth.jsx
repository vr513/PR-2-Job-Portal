import {
  Box,
  Flex,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
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
          {currentForm === "signIn" ? (
            <Login onFormSwitch={toggleForm} />
          ) : (
            <SignUp onFormSwitch={toggleForm} FormState={currentForm} />
          )}
        </Box>
      </HStack>
    </Box>
  );
}
