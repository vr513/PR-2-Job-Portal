import { Avatar, Box, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineHome, MdLogout } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
function Sidebar() {
  const {logout} = useAuth();
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      width="25vw"
      height="100vh"
    >
      <Box
        display="flex"
        flexDir="column"
        width="80%"
        height="92.4vh"
        borderRadius="5px"
        // bg="blackAlpha.300"
        bg="white"
        p="1.5rem"
        mt="1rem"  
      >
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          // padding="1rem"
          flexDir="column"
        >
          <Avatar></Avatar>
          <Text fontSize="20px">Tejas sanap</Text>
        </Box>

        <Box display="flex" flexDir="column" gap="1rem" mt="1rem">
          <Box display="flex"  gap="1rem">
            <Icon boxSize={6} as={MdOutlineHome} />
            My Home
          </Box>
          <Box display="flex"  gap="1rem">
            <Icon boxSize={6} as={MdOutlineHome} />
            Jobs
          </Box>
          <Box display="flex" gap="1rem">
            <Icon boxSize={6} as={MdOutlineHome} />
            Companies
          </Box>
          <Box _hover={{cursor : "pointer"}} onClick={logout} display="flex" gap="1rem">
            <Icon boxSize={6} as={MdLogout} />
            Logout
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
