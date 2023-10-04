import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  MdSettings,
  MdSearch,
  MdPersonOutline,
  MdOutlineDarkMode,
  MdNotificationsNone,
  MdLogout,
  MdAccountCircle,
} from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";

function navbar() {
  const { logout } = useAuth();
  return (
    <Box width="100%" position="sticky" top="10px">
      <HStack gap="20px">
        <InputGroup width="40%">
          <Input
            type="text"
            borderRadius="5px"
            bg="#4B9C95"
            focusBorderColor="#4b9c95"
            placeholder="Search jobs here"
            color="white"
            fontWeight="400"
            _placeholder={{ color: "white" }}
          />
          <InputRightElement>
            <Icon as={MdSearch} color="white" boxSize={6} />
          </InputRightElement>
        </InputGroup>
        <Link as={RouterLink} to={"/"}>
          Home
        </Link>
        <Link as={RouterLink} to={"/jobs"}>
          Jobs
        </Link>
        <Link as={RouterLink} to={"/companies"}>
          Companies
        </Link>
        <Spacer />
        <Box display="flex" flexDir="row" gap="1rem" right="10px">
          <Icon as={MdSettings} boxSize={6} />
          <Icon as={MdOutlineDarkMode} boxSize={6} />
          <Icon as={MdNotificationsNone} boxSize={6} />
          <Menu>
            <MenuButton>
              <Icon as={MdPersonOutline} boxSize={6} />
            </MenuButton>
            <MenuList>
              <Link as={RouterLink} to={"/profile"}>
                <MenuItem fontFamily={"Poppins"}>
                  <Icon
                    as={MdAccountCircle}
                    color={"black"}
                    boxSize={4}
                    mr={"1rem"}
                  />{" "}
                  Profile
                </MenuItem>
              </Link>
              <MenuItem onClick={logout} fontFamily={"Poppins"}>
                <Icon as={MdLogout} color={"black"} boxSize={4} mr={"1rem"} />{" "}
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </Box>
  );
}

export default navbar;
