import {
  Box,
  Checkbox,
  Flex,
  HStack,
  Heading,
  Icon,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/jobs/Navbar";
import {
  MdAdd,
  MdWorkOutline,
  MdCurrencyRupee,
  MdOutlineLocationOn,
  MdHideSource,
  MdOutlineWatchLater,
  MdStarBorder,
} from "react-icons/md";

export default function Jobs() {
  return (
    <Box bg="primary" height="100vh" width="100%">
      <Box
        display="flex"
        flexDir="column"
        gap="20px"
        pl="25.5vw"
        position="sticky"
        top="0px"
        bg="primary"
        height="4rem"
        mr="2rem"
      >
        <Navbar />
      </Box>

      <Text
        display="flex"
        mt="3rem"
        ml="2rem"
        mr="2rem"
        width="67%"
        fontSize="20px"
      >
        7 jobs based on your desired preference
      </Text>
      <Box display="flex" mt="1rem" ml="2rem" mr="2rem" gap="2rem">
        <Box
          display="flex"
          flexDir="column"
          width="74%"
          gap="1rem"
          height="75vh"
          overflowY="scroll"

          sx={{
            "::-webkit-scrollbar": {
              width: "5px",
            },
            "::-webkit-scrollbar-track": {
              // background: '#f1f1f1'
              background: "primary",
            },
            "::-webkit-scrollbar-thumb": {
              background: "secondary",
            },
          }}



        >
          <Box>
            {/* 1st box card */}
            <Box
              mr="1rem"
              display="flex"
              bg="white"
              flexDir="column"
              height="220px"
              p="1rem"
              gap="0.75rem"
              pt="1.5rem"
            >
              <Flex gap={3}>
                <Checkbox colorScheme="gray" size="lg" />
                <Text fontSize="18px" fontWeight="600">
                  Hiring for international Voice
                </Text>
              </Flex>
              <Text ml="2rem" fontSize="17">
                Intellecta consultants
              </Text>
              <Flex ml="2rem" gap="10">
                <Flex flexDir="row" alignItems="center" gap={2}>
                  <Icon boxSize={5} as={MdWorkOutline} />
                  <Text>0-5 years</Text>
                </Flex>
                <Flex flexDir="row" alignItems="center" gap={2}>
                  <Icon boxSize={5} as={MdCurrencyRupee} />
                  <Text>2.5-7 LPA</Text>
                </Flex>
                <Flex flexDir="row" alignItems="center" gap={2}>
                  <Icon boxSize={5} as={MdOutlineLocationOn} />
                  <Text>Pune,Mumbai</Text>
                </Flex>
              </Flex>
              <Text ml="2rem">Description of the job</Text>

              <Flex justifyContent="space-between" alignItems="center">
                <Flex
                  borderRadius="5px"
                  bg="primary"
                  p="5px"
                  ml="2rem"
                  width="12%"
                  gap={2}
                  alignItems="center"
                >
                  <Icon boxSize={5} as={MdOutlineWatchLater} />
                  <Text>3 days ago</Text>
                </Flex>

                <Flex gap="2rem">
                  <Flex gap={2} alignItems="center">
                    <Icon as={MdHideSource} boxSize={5} />
                    <Text>Hide</Text>
                  </Flex>
                  <Flex gap={2} alignItems="center">
                    <Icon as={MdStarBorder} boxSize={5} />
                    <Text>Save</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>

          {/* 1st box card */}
          <Box>
            <Box
              mr="1rem"
              display="flex"
              bg="white"
              flexDir="column"
              height="220px"
              p="1rem"
              gap="0.75rem"
              pt="1.5rem"
            >
              <Flex gap={3}>
                <Checkbox colorScheme="gray" size="lg" />
                <Text fontSize="18px" fontWeight="600">
                  Hiring for international Voice
                </Text>
              </Flex>
              <Text ml="2rem" fontSize="17">
                Intellecta consultants
              </Text>
              <Flex ml="2rem" gap="10">
                <Flex flexDir="row" alignItems="center" gap={2}>
                  <Icon boxSize={5} as={MdWorkOutline} />
                  <Text>0-5 years</Text>
                </Flex>
                <Flex flexDir="row" alignItems="center" gap={2}>
                  <Icon boxSize={5} as={MdCurrencyRupee} />
                  <Text>2.5-7 LPA</Text>
                </Flex>
                <Flex flexDir="row" alignItems="center" gap={2}>
                  <Icon boxSize={5} as={MdOutlineLocationOn} />
                  <Text>Pune,Mumbai</Text>
                </Flex>
              </Flex>
              <Text ml="2rem">Description of the job</Text>

              <Flex justifyContent="space-between" alignItems="center">
                <Flex
                  borderRadius="5px"
                  bg="primary"
                  p="5px"
                  ml="2rem"
                  width="12%"
                  gap={2}
                  alignItems="center"
                >
                  <Icon boxSize={5} as={MdOutlineWatchLater} />
                  <Text>3 days ago</Text>
                </Flex>

                <Flex gap="2rem">
                  <Flex gap={2} alignItems="center">
                    <Icon as={MdHideSource} boxSize={5} />
                    <Text>Hide</Text>
                  </Flex>
                  <Flex gap={2} alignItems="center">
                    <Icon as={MdStarBorder} boxSize={5} />
                    <Text>Save</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>

          {/* 3rs box  */}
          <Box>
            <Box
              mr="1rem"
              display="flex"
              bg="white"
              flexDir="column"
              height="220px"
              p="1rem"
              gap="0.75rem"
              pt="1.5rem"
            >
              <Flex gap={3}>
                <Checkbox colorScheme="gray" size="lg" />
                <Text fontSize="18px" fontWeight="600">
                  Hiring for international Voice
                </Text>
              </Flex>
              <Text ml="2rem" fontSize="17">
                Intellecta consultants
              </Text>
              <Flex ml="2rem" gap="10">
                <Flex flexDir="row" alignItems="center" gap={2}>
                  <Icon boxSize={5} as={MdWorkOutline} />
                  <Text>0-5 years</Text>
                </Flex>
                <Flex flexDir="row" alignItems="center" gap={2}>
                  <Icon boxSize={5} as={MdCurrencyRupee} />
                  <Text>2.5-7 LPA</Text>
                </Flex>
                <Flex flexDir="row" alignItems="center" gap={2}>
                  <Icon boxSize={5} as={MdOutlineLocationOn} />
                  <Text>Pune,Mumbai</Text>
                </Flex>
              </Flex>
              <Text ml="2rem">Description of the job</Text>

              <Flex justifyContent="space-between" alignItems="center">
                <Flex
                  borderRadius="5px"
                  bg="primary"
                  p="5px"
                  ml="2rem"
                  width="12%"
                  gap={2}
                  alignItems="center"
                >
                  <Icon boxSize={5} as={MdOutlineWatchLater} />
                  <Text>3 days ago</Text>
                </Flex>

                <Flex gap="2rem">
                  <Flex gap={2} alignItems="center">
                    <Icon as={MdHideSource} boxSize={5} />
                    <Text>Hide</Text>
                  </Flex>
                  <Flex gap={2} alignItems="center">
                    <Icon as={MdStarBorder} boxSize={5} />
                    <Text>Save</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          width="25%"
          alignSelf="flex-start"
          height="35vh"
          borderRadius="5px"
          ml="auto"
          p="1rem"
          bg="white"
          flexDir="column"
          fontWeight="400"
          fontSize="16px"
        >
          <Text>
            {" "}
            Get Jobs Matching Your Criteria By Adding Below Prefernces
          </Text>
          <HStack mt="3rem" fontWeight="500" color="secondary">
            <Icon as={MdAdd} boxSize={5} />
            <Text>Add your preferred job role</Text>
          </HStack>
          <HStack mt="1rem" fontWeight="500" color="secondary">
            <Icon as={MdAdd} boxSize={5} />
            <Text>Add your preferred job location</Text>
          </HStack>
          <HStack mt="1rem" fontWeight="500" color="secondary">
            <Icon as={MdAdd} boxSize={5} />
            <Text>Add your preferred job salary</Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
