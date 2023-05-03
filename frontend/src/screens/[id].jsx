import React from "react";
import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const LocationPill = ({ location }) => {
  return (
    <>
      <Text color={"#FFF"} bg={"#4B9C95"} borderRadius={"25px"} px={"10px"}>
        {location}
      </Text>
    </>
  );
};

const ActionButton = ({ title }) => {
  return (
    <>
      <Button
        fontFamily={"Poppins"}
        fontSize={"14px"}
        lineHeight={"24px"}
        color={"#8F8F8F"}
        border={"1px solid #4B9C95"}
        borderRadius={"8px"}
        w={"30%"}
      >
        {title}
      </Button>
    </>
  );
};

const ApplicantCard = () => {
  return (
    <>
      <Box
        w={"100%"}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
        borderRadius={"10px"}
        pb={"1rem"}
      >
        <Box py={"0.5rem"} bg={"#4B9C95"} borderRadius={"8px"}>
          <HStack>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w={"10%"}
            >
              <Box borderRadius={"50%"} h={"3rem"} w={"3rem"} bg={"#fff"} />
            </Box>
            <Text
              fontFamily={"Poppins"}
              fontSize={"30px"}
              fontWeight={500}
              lineHeight={"54px"}
              color={"#FFF"}
            >
              Travis Rajopadhye
            </Text>
          </HStack>
        </Box>
        <Box
          px={"4rem"}
          color={"#4A4A4A"}
          fontSize={"16px"}
          fontFamily={"Poppins"}
          w={"100%"}
          mt={"1rem"}
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <HStack>
            <Text w={"30%"} fontWeight={400}>
              Current
            </Text>
            <Text>SDE at Google</Text>
          </HStack>
          <HStack>
            <Text w={"30%"} fontWeight={400}>
              Education
            </Text>
            <Text>
              BTech from Pune Institute College of Engineering, Pune 2020
            </Text>
          </HStack>
          <HStack>
            <Text w={"30%"} fontWeight={400}>
              Preferred Location
            </Text>
            <HStack>
              <LocationPill location={"Pune"} />
              <LocationPill location={"Banglore"} />
              <LocationPill location={"Mumbai"} />
              <LocationPill location={"Gurgaon"} />
            </HStack>
          </HStack>
          <HStack justifyContent={"space-between"} w={"90%"} mt={"1rem"}>
            <ActionButton title={"Email"} />
            <ActionButton title={"Phone Number"} />
            <ActionButton title={"Direct Message"} />
          </HStack>
        </Box>
      </Box>
    </>
  );
};

const JobApplicants = () => {
  return (
    <>
      <Box w={"100%"} minH={"100vh"} bg={"primary"} pb={"5rem"}>
        <Navbar color={"#000"} />
        <Box w={"100%"} px={"4rem"} pt={"2rem"}>
          <Heading
            as={"h2"}
            fontWeight={500}
            fontSize={"30px"}
            lineHeight={"45px"}
            fontFamily={"Poppins"}
            color={"#000"}
            mb={"2rem"}
          >
            Candidate's Profile
          </Heading>
          <VStack gap={"20px"}>
            <ApplicantCard />
            <ApplicantCard />
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default JobApplicants;
