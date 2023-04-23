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
} from "@chakra-ui/react";
import React from "react";

import {
  MdSettings,
  MdSearch,
  MdPersonOutline,
  MdOutlineDarkMode,
  MdNotificationsNone,
} from "react-icons/md";

function navbar() {
  return (
    <Box width="100%"  position="sticky" top="10px">
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
        <Link href="/home">Home</Link>
        <Link>Jobs</Link>
        <Link>Companies</Link>
        <Spacer />
        <Box display="flex" flexDir="row" gap="1rem" right="10px">
          <Icon as={MdSettings} boxSize={6} />
          <Icon as={MdOutlineDarkMode} boxSize={6} />
          <Icon as={MdNotificationsNone} boxSize={6} />
          <Icon as={MdPersonOutline} boxSize={6} />
        </Box>
      </HStack>
    </Box>
  );
}

export default navbar;
