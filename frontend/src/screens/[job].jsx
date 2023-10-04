import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Heading,
  Link,
  Icon,
  Divider,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import Navbar from "../components/home/Navbar";
import { MdOutlineLocationOn, MdLogout, MdWork } from "react-icons/md";
import { BiBuildings } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import { FaBriefcase, FaDollarSign } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "../utils/axiosConfig";

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
      fontSize={"14px"}
    >
      {location}
    </Text>
  );
};

const Job = () => {
  const [currJob, setCurrJob] = useState(null);
  const [created, setCreated] = useState(new Date("2023-04-13T06:45:59.492Z"));
  const { token } = useAuth();
  const dateOptions = { day: "numeric", month: "numeric", year: "numeric" };

  const { id: jobId } = useParams();

  const getJobData = async () => {
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.get(`/job/${jobId}`, config);
      setCurrJob(response.data.job);
      setCreated(new Date(response.data.job.created));
    } catch (err) {
      console.error(err);
    }
  };

  const toast = useToast()

  const showToast = (status, msg) => {
    toast({
      title: msg,
      status: status,
      isClosable: true,
      position: "top-right",
    });
  };

  const applyToJob = async() => {
    try{
        const config = {
            headers: { Authorization: `JWT ${token}` },
          };
          const response = await axios.post(`/jobs/${jobId}/apply`,{},config);
          showToast('success',response.data.msg)
    }catch(err){
        console.error(err);
        showToast('error',err.response.data.error)
    }
  }

  useEffect(() => {
    getJobData();
  }, []);

  if (currJob === null) return <Box />;

  return (
    <>
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
              height="83%"
              mt="1rem"
              display="flex"
              flexDir="column"
              borderRadius="5px"
              bg="white"
              padding="3rem"
              gap="5px"
            >
              <HStack justifyContent={"space-between"} mb={'0.5rem'}>
                <Heading as={"h2"} fontFamily={"monospace"}>
                  {currJob.jobTitle}
                </Heading>
                <Button onClick={applyToJob} borderRadius={'10px'} color={'#FFF'} bg={"#4B9C95"}>Apply</Button>
              </HStack>
              <Divider />
              <VStack mt={"1rem"} alignItems={"flex-start"}>
                <HStack w={"100%"} justifyContent={"space-between"}>
                  <HStack fontSize={"18px"}>
                    <Icon as={BiBuildings} />
                    <Text>Posted By : {currJob.companyName}</Text>
                  </HStack>
                  <HStack fontSize={"18px"}>
                    <Icon as={FaBriefcase} />
                    <Text>
                      Minimum Work Experience : {currJob.minWorkExperience}
                    </Text>
                  </HStack>
                </HStack>
                <HStack w={"100%"} justifyContent={"space-between"}>
                  <HStack fontSize={"18px"}>
                    <Icon as={AiFillClockCircle} />
                    <Text>
                      Posted at :{" "}
                      {created.toLocaleDateString("en-GB", dateOptions)} (
                      {getElapsedDays(created)}d ago)
                    </Text>
                  </HStack>
                  <HStack fontSize={"18px"}>
                    <Icon as={FaDollarSign} />
                    <Text>Salary : {currJob.salary}</Text>
                  </HStack>
                </HStack>

                <HStack fontSize={"18px"}>
                  <Icon as={MdOutlineLocationOn} />
                  <Text>Job Locations : </Text>
                  <HStack gap={"10px"}>
                    {currJob.jobLocations.map((loc, index) => (
                      <JobPill location={loc} key={`dcsa-${index}`} />
                    ))}
                  </HStack>
                </HStack>
              </VStack>

              <Text mt={"1rem"} fontSize={"20px"}>
                {currJob.jobDescription}
              </Text>
              <Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil,
                labore voluptatibus. Perferendis ipsam aperiam aut fuga modi
                iure accusantium quos eveniet eius qui corrupti fugit, veritatis
                dolorum in aspernatur non! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Beatae facilis iste at illum quas
                laboriosam obcaecati nihil tempora necessitatibus! Deleniti
                perspiciatis eaque laudantium doloremque eveniet, vero quae?
                Atque, aperiam reprehenderit? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Sit totam tenetur ex cum
                laudantium aspernatur iste corporis ullam vero sapiente nihil
                laboriosam, culpa perspiciatis aliquam iure. Porro eum nesciunt
                corrupti. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Deserunt, ipsa ea! Ducimus tempore ut iusto magni
                temporibus? Nisi maxime mollitia veniam, corrupti voluptas ipsam
                repudiandae. Ducimus vitae blanditiis quaerat fuga!
              </Text>
            </Box>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default Job;
