import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Button, HStack, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import axios from '../utils/axiosConfig'

const TableHeading = ({ heading }) => {
  return (
    <>
      <Box
        fontFamily={"Poppins"}
        background={"#4B9C95"}
        w={"30%"}
        p={"1rem"}
        borderRadius={"15px"}
      >
        <Text fontSize={"20px"} color={"#FFF"} lineHeight={"36px"}>
          {heading}
        </Text>
      </Box>
    </>
  );
};

const TableRow = ({job , getPostedJobs}) => {
  const {token} = useAuth();
  const toast = useToast();

  const showToast = (status, msg) => {
    toast({
      title: msg,
      status: status,
      isClosable: true,
      position :'top-right'
    });
  };

  const openJob = (uid , isOpen) => {
    if(!isOpen){
      try{
        const config = {
          headers: { Authorization: `JWT ${token}` },
        };
        const response = axios.post('/update-job-status',{targetJobId : uid , jobActiveStatus : true},config);
        getPostedJobs()
        showToast('success',"Job Status updated successfully");
      }catch(err){
        console.error(err);
      }
    }else{
      showToast('error','Job already open');
    }
  }
  const closeJob = (uid , isOpen) => {
    if(isOpen){
      try{
        const config = {
          headers: { Authorization: `JWT ${token}` },
        };
        const response = axios.post('/update-job-status',{targetJobId : uid , jobActiveStatus : false},config);
        getPostedJobs()
        showToast('success',"Job Status updated successfully");
      }catch(err){
        console.error(err);
      }
    }else{
      showToast('error','Job already closed');
    }
  }
  return (
    <>
      <HStack w={"100%"} justifyContent={'space-between'}>
        <Box fontFamily={"Poppins"} w={"30%"} px={"1rem"}>
          <Text fontSize={"16px"} color={"#000"} lineHeight={"36px"}>
            {job.jobTitle}
          </Text>
        </Box>
        <Box fontFamily={"Poppins"} w={"30%"} px={"1rem"}>
          <Text w={'100%'} textAlign={'center'} fontSize={"16px"} color={"#000"} lineHeight={"36px"}>
            {job.numOfApplicants}
          </Text>
        </Box>
        <HStack justifyContent={'space-around'} fontFamily={"Poppins"} w={"30%"} px={"1rem"} color={'#FFF'}>
          <Button _hover={{}} onClick={() => openJob(job.jobId,job.active)} borderRadius={'25px'} backgroundColor={'#009645'}>Open</Button>
          <Button _hover={{}} onClick={() => closeJob(job.jobId,job.active)} borderRadius={'25px'} backgroundColor={'#7C0000'}>Close</Button>
        </HStack>
      </HStack>
    </>
  );
};

const EmployerDashboard = () => {
  
  const [jobs , setJobs] = useState([]);

  const {token} = useAuth();

  const getPostedJobs = async() => {
    try{
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.get('/employer/jobs',config);
      setJobs(response.data.jobs);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    getPostedJobs();
  },[])

  return (
    <>
      <Box minH={"100vh"} height={"auto"} w={"100%"} bg={"primary"}>
        <Box position={"relative"} w={"100%"} h={"30vh"} background={"#4B9C95"}>
          <Navbar color={'#FFF'} />
          <Box position={"relative"} p={"2rem"} pt={"4rem"}>
            <VStack
              alignItems={"flex-start"}
              fontFamily={"Poppins"}
              color={"#FFF"}
            >
              <Heading
                fontWeight={700}
                fontSize={"36px"}
                lineHeight={"54px"}
                as={"h2"}
              >
                DASHBOARD
              </Heading>
              <Text fontSize={"16px"} opacity={"75%"}>
                Welcome to your Dashboard
              </Text>
            </VStack>
          </Box>
        </Box>
        <Box w={"100%"} p={"3rem"} h={"100%"}>
          <Box
            display={"flex"}
            w={"100%"}
            flexDir={"row"}
            justifyContent={"space-between"}
          >
            <TableHeading heading={"Job Name"} />
            <TableHeading heading={"Number of Applicants"} />
            <TableHeading heading={"Status"} />
          </Box>
          <VStack w={"100%"} mt={'1rem'}>
            {/* <TableRow />
            <TableRow />
            <TableRow /> */}
            {jobs.map((job, index) => <TableRow getPostedJobs={getPostedJobs} key={job.jobId} job={job} />)}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default EmployerDashboard;
