import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Heading,
  Link,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import Sidebar from "../components/home/Sidebar";
import { MdOutlineLocationOn } from "react-icons/md";
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

const JobPill = ({ location }) => {
  return (
    <Text
      w={"max-content"}
      color={"#FFF"}
      bg={"#4B9C95"}
      borderRadius={"25px"}
      px={"10px"}
      py={"2px"}
      ml={"0px !important"}
    >
      {location}
    </Text>
  );
};

const JobCard = ({ job }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-around"
        padding="0.5rem"
        flexDir="column"
        height="85%"
        bg="white"
        borderRadius="5px"
        border="1px solid rgba(75, 156, 149, 0.5) "
        width="450px"
      >
        <Text textAlign="end" width="100%">
          {getElapsedDays(job.created)}d ago
        </Text>
        <Link as={RouterLink} to={`/jobs/${job._id}`} fontSize="20px" fontWeight="600" width="400px">
          {job.jobTitle}
        </Link>
        <Text color="#5A5A5A">{job.companyName}</Text>
        <Box display="flex" flexDir="row" gap={3}>
          <Icon boxSize={6} as={MdOutlineLocationOn} />
          <HStack gap={"10px"}>
            {job.jobLocations.map((location, index) => (
              <JobPill location={location} key={`sacda-${index}`} />
            ))}
          </HStack>
        </Box>
      </Box>
    </>
  );
};

const CompanyCard = ({ company }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end"
        padding="1rem"
        flexDir="column"
        height="90%"
        bg="white"
        borderRadius="5px"
        border="1px solid rgba(75, 156, 149, 0.5) "
        width="450px"
        gap="0.5rem"
      >
        <Text fontSize="20px" fontWeight="600" width="400px" textAlign="center">
          {company.name}
        </Text>
        <Box display="flex" justifyContent="center" gap="2">
          <Text>Posted Jobs : {company.allJobs.length}</Text>
          <span>|</span>
          <Text>22.2k reviews</Text>
        </Box>
        <Link
          fontSize="16px"
          display="flex"
          color="#4B9C95"
          fontWeight="500"
          justifyContent="center"
        >
          View Jobs
        </Link>
      </Box>
    </>
  );
};

const Home = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [topRecruiters, setTopRecruiters] = useState([]);

  const { token } = useAuth();

  const getRecommendedJobs = async () => {
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.get("/recommended-jobs", config);
      setRecommendedJobs(response.data.jobs);
    } catch (err) {
      console.error(err);
    }
  };

  const getTopRecruiters = async () => {
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.get("/top-recruiters", config);
      setTopRecruiters(response.data.companies);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRecommendedJobs();
    getTopRecruiters();
  }, []);

  return (
    <Box height="100%" width="100vw" bg="primary" fontFamily={"Poppins"}>
      <HStack width="100vw">
        <Sidebar />
        <Box
          width="72vw"
          height="100vh"
          display="flex"
          flexDir="column"
          gap="20px"
        >
          <Navbar />
          <Box
            height="40%"
            mt="1rem"
            display="flex"
            flexDir="column"
            borderRadius="5px"
            bg="white"
            padding="10px"
            gap="5px"
          >
            <HStack justifyContent="space-between" ml="3">
              <Heading fontWeight="500" color="#5A5A5A" fontSize="22px">
                Recommended jobs
              </Heading>
              <Link>view all</Link>
            </HStack>

            <HStack
              height="300px"
              // overflowX="none"

              overflowY="hidden"
              whiteSpace="nowrap"
              alignItems="flex-start"
              gap="1rem"
              ml="3"
              mt="3"
              sx={{
                "::-webkit-scrollbar": {
                  width: "2px",
                  height: "5px",
                },
                "::-webkit-scrollbar-track": {
                  // background: '#f1f1f1'
                  background: "white",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "secondary",
                },
              }}
            >
              {recommendedJobs.map((job, index) => (
                <JobCard job={job} key={job._id} />
              ))}
            </HStack>
          </Box>
          <Box
            height="40%"
            mt="0.5rem"
            display="flex"
            flexDir="column"
            borderRadius="5px"
            bg="white"
            padding="10px"
            gap="10px"
          >
            <HStack justifyContent="space-between" ml="3">
              <Heading fontWeight="500" color="#5A5A5A" fontSize="22px">
                Top Recruiters
              </Heading>
            </HStack>

            <Box
              display="flex"
              height="100%"
              width="100%"
              // overflowX="none"
              overflowY="hidden"
              whiteSpace="nowrap"
              gap="1rem"
              ml="3"
              mt="3"
              sx={{
                "::-webkit-scrollbar": {
                  width: "2px",
                  height: "5px",
                },
                "::-webkit-scrollbar-track": {
                  // background: '#f1f1f1'
                  background: "white",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "secondary",
                },
              }}
            >
              {topRecruiters.map((company) => <CompanyCard company={company} key={company._id} />)}
            </Box>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default Home;
