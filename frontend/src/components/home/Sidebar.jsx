import { Avatar, Box, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { MdOutlineHome, MdLogout, MdWork, MdAccountCircle } from "react-icons/md";
import {BiBuildings} from 'react-icons/bi'
import { useAuth } from "../../contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";

const SideBarItem = ({ name, icon, href }) => {
  return (
    <>
      <Link as={RouterLink} to={href} _hover={{}}>
        <Box display="flex" gap="1rem">
          <Icon boxSize={6} as={icon} />
          {name}
        </Box>
      </Link>
    </>
  );
};

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
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
          <Text fontSize="20px">{currentUser.name}</Text>
        </Box>

        <Box display="flex" flexDir="column" gap="1rem" mt="1rem">
         <SideBarItem icon={MdOutlineHome} name={'Home'} href={'/'} />
         <SideBarItem icon={MdWork} name={'Jobs'} href={'/jobs'} />
         <SideBarItem icon={BiBuildings} name={'Companies'} href={'/companies'} />
         <SideBarItem icon={MdAccountCircle} name={'Profile'} href={'/profile'} />
         <Box
            _hover={{ cursor: "pointer" }}
            onClick={logout}
            display="flex"
            gap="1rem"
          >
            <Icon boxSize={6} as={MdLogout} />
            Logout
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
