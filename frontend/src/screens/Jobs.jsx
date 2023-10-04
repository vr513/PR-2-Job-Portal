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
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import {
  MdAdd,
  MdWorkOutline,
  MdCurrencyRupee,
  MdOutlineLocationOn,
  MdHideSource,
  MdOutlineWatchLater,
  MdStarBorder,
} from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import axios from "../utils/axiosConfig";
import { Link as RouterLink } from "react-router-dom";

function getElapsedDays(dateString) {
  const currentDate = new Date();
  const inputDate = new Date(dateString);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const elapsedMilliseconds = currentDate - inputDate;
  const elapsedDays = Math.floor(elapsedMilliseconds / millisecondsPerDay);
  return elapsedDays;
}

const LocationPill = ({ location }) => {
  return (
    <Text
      w={"max-content"}
      color={"#FFF"}
      bg={"#4B9C95"}
      borderRadius={"25px"}
      px={"10px"}
      py={"2px"}
      ml={"0px !important"}
      textTransform={"capitalize"}
    >
      {location}
    </Text>
  );
};

const JobCard = ({ job }) => {
  return (
    <>
      <Box>
        <Box
          mr="1rem"
          display="flex"
          bg="white"
          flexDir="column"
          borderRadius={"10px"}
          px="1rem"
          gap="0.75rem"
          py="1.5rem"
        >
          <Link as={RouterLink} to={`/jobs/${job._id}`}>
            <Text ml={"2rem"} fontSize="18px" fontWeight="600">
              {job.jobTitle}
            </Text>
          </Link>
          <Text ml="2rem" fontSize="17">
            {job.companyName}
          </Text>
          <Flex ml="2rem" gap="10">
            <Flex flexDir="row" alignItems="center" gap={2}>
              <Icon boxSize={5} as={MdWorkOutline} />
              <Text>{job.minWorkExperience}</Text>
            </Flex>
            <Flex flexDir="row" alignItems="center" gap={2}>
              <Icon boxSize={5} as={MdCurrencyRupee} />
              <Text>{job.salary}</Text>
            </Flex>
            <Flex flexDir="row" alignItems="center" gap={2}>
              <Icon boxSize={5} as={MdOutlineLocationOn} />
              <HStack gap={"10px"}>
                {job.jobLocations.map((loc, index) => (
                  <LocationPill location={loc} key={`sacdsce-${index}`} />
                ))}
              </HStack>
            </Flex>
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <Flex
              borderRadius="5px"
              bg="primary"
              p="5px"
              ml="2rem"
              gap={2}
              alignItems="center"
            >
              <Icon boxSize={5} as={MdOutlineWatchLater} />
              <Text>{getElapsedDays(job.created)} days ago</Text>
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
    </>
  );
};

const Jobs = () => {
  const [localJobs, setLocalJobs] = useState([]);

  const { token, currentUser } = useAuth();

  const getJobs = async () => {
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.post(
        "/jobs",
        {
          minSalary: currentUser.minSalary ?? 0,
          preferredJobLocations: currentUser.preferredWorkLocation,
        },
        config
      );
      setLocalJobs(response.data.jobs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <Box bg="primary" height="100vh" width="100%" fontFamily={"Poppins"}>
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
          {localJobs.map((job) => (
            <JobCard job={job} key={job._id} />
          ))}
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
          <Link as={RouterLink} to={"/profile"}>
            <HStack mt="1rem" fontWeight="500" color="secondary">
              <Icon as={MdAdd} boxSize={5} />
              <Text>Add your preferred job role</Text>
            </HStack>
          </Link>
          <Link as={RouterLink} to={"/profile"}>
            <HStack mt="1rem" fontWeight="500" color="secondary">
              <Icon as={MdAdd} boxSize={5} />
              <Text>Add your preferred job location</Text>
            </HStack>
          </Link>
          <Link as={RouterLink} to={"/profile"}>
            <HStack mt="1rem" fontWeight="500" color="secondary">
              <Icon as={MdAdd} boxSize={5} />
              <Text>Add your preferred job salary</Text>
            </HStack>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
export default Jobs;
