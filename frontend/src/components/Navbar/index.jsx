import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { Link } from "react-router-dom";

import {
  MdSettings,
  MdSearch,
  MdPersonOutline,
  MdOutlineDarkMode,
  MdNotificationsNone,
} from "react-icons/md";

const CustomLink = ({ href, title, color }) => {
  return (
    <Link to={href}>
      <Text
        color={color}
        fontFamily={"Poppins"}
        fontSize={"14px"}
        fontWeight={400}
        lineHeight={"30px"}
      >
        {title}
      </Text>
    </Link>
  );
};

const Navbar = ({color}) => {
  return (
    <HStack zIndex={'20'} width="100%" position="relative" top="10px" h={'1rem'} pt={'1rem'} >
      
      <HStack gap={"20px"} pos={"absolute"} left={"62%"}>
        <CustomLink color={color} href={"/home"} title={"Home"} />
        <CustomLink color={color} href={"/reports"} title={"Reports"} />
        <CustomLink color={color} href={"/jobs"} title={"Listed Jobs"} />
      </HStack>
      <HStack pos={"absolute"} right={"2rem"} gap={'10px'}>
        <Icon as={MdSettings} color={color} boxSize={6} />
        <Icon as={MdOutlineDarkMode} color={color} boxSize={6} />
        <Icon as={MdNotificationsNone} color={color} boxSize={6} />
        <Icon as={MdPersonOutline} color={color} boxSize={6} />
      </HStack>
    </HStack>
  );
};

export default Navbar;
