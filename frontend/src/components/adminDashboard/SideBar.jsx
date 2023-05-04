import { CalendarIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  GridItem,
  HStack,
  Icon,
  Link,
  MenuIcon,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
function sideBar() {
  const [navSize, changeNavSize] = useState("large");
  const handleClose = () => {
    if (navSize === "small") {
      changeNavSize("large");
    } else {
      changeNavSize("small");
    }
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      w={navSize === "large" ? "20vw" : "3vw"}
      height="100vh"
      bg={navSize === "large" ? "secondary" : "primary"}
      gap="1rem"
      fontFamily="Poppins"
      transition="linear .5s"
      pos={"sticky"}
      top="0rem"
    >
      <Box
        display="flex"
        justifyContent={navSize === "large" ? "space-between" : "center"}
        mt="1rem"
        width="100%"
        alignItems="center"
      >
        <Text
          display={navSize === "small" ? "none" : ""}
          ml={navSize === "large" ? "20px" : "0"}
          fontSize="18px"
          fontWeight="400"
          color="white"
          font-family="Poppins"
        >
          Admin
        </Text>
        <HamburgerIcon
          boxSize={6}
          onClick={handleClose}
          color={navSize === "large" ? "white" : "black"}
          _hover={{ color: "black", cursor: "pointer" }}
          alignItems="center"
          mr={navSize === "large" ? "20px" : "0"}
        />
      </Box>

      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        mt="1rem"
      >
        <Avatar bg="black" display={navSize === "small" ? "none" : ""} />
        <Text
          fontSize="18px"
          fontWeight="400"
          color="white"
          mt="1.2rem"
          display={navSize === "small" ? "none" : ""}

        >
          Varad Rajopadhye
        </Text>
        <Text
          fontSize="13px"
          color="black"
          display={navSize === "small" ? "none" : ""}
          mt="0.8rem"
        >
          VP Fancy Admin
        </Text>
      </Box>

      <Box
        alignItems="center"
        alignSelf="center"
        width="60%"
        gap="1.5rem"
        display={navSize === "small" ? "none" : "flex"}
        mt="2rem"
      >
        <CalendarIcon color="white" />
        <Text fontSize="15px" fontWeight="300" color="white" display={navSize === "small" ? "none" : ""}>
          Dashboard
        </Text>
      </Box>

      <Box
        alignItems="center"
        alignSelf="center"
        width="60%"
        gap="1.5rem"
        display={navSize === "small" ? "none" : "flex"}
      >
        <CalendarIcon
          alignItems="center"
          color="white
        "
        />
        <Text fontSize="15px" fontWeight="300" color="white" display={navSize === "small" ? "none" : ""}>
          Manage Team
        </Text>
      </Box>
    </Flex>
  );
}

export default sideBar;
