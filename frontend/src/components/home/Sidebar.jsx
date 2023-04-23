import { Avatar, Box, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineHome } from "react-icons/md";
function Sidebar() {
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
            <Link>My home</Link>
          </Box>
          <Box display="flex"  gap="1rem">
            <Icon boxSize={6} as={MdOutlineHome} />
            <Link>Jobs</Link>
          </Box>
          <Box display="flex" gap="1rem">
            <Icon boxSize={6} as={MdOutlineHome} />
            <Link>Companies</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
