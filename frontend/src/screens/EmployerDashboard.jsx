import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import axios from "../utils/axiosConfig";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

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

const LocationPill = ({ location }) => {
  return (
    <>
      <Text
        w={"max-content"}
        color={"#FFF"}
        bg={"#4B9C95"}
        borderRadius={"25px"}
        px={"10px"}
        ml={"0px !important"}
      >
        {location}
      </Text>
    </>
  );
};

const TableRow = ({ job, getPostedJobs }) => {
  const { token } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const showToast = (status, msg) => {
    toast({
      title: msg,
      status: status,
      isClosable: true,
      position: "top-right",
    });
  };

  const openJob = (uid, isOpen) => {
    if (!isOpen) {
      try {
        const config = {
          headers: { Authorization: `JWT ${token}` },
        };
        const response = axios.post(
          "/update-job-status",
          { targetJobId: uid, jobActiveStatus: true },
          config
        );
        getPostedJobs();
        showToast("success", "Job Status updated successfully");
      } catch (err) {
        console.error(err);
      }
    } else {
      showToast("error", "Job already open");
    }
  };
  const closeJob = (uid, isOpen) => {
    if (isOpen) {
      try {
        const config = {
          headers: { Authorization: `JWT ${token}` },
        };
        const response = axios.post(
          "/update-job-status",
          { targetJobId: uid, jobActiveStatus: false },
          config
        );
        getPostedJobs();
        showToast("success", "Job Status updated successfully");
      } catch (err) {
        console.error(err);
      }
    } else {
      showToast("error", "Job already closed");
    }
  };
  return (
    <>
      <HStack w={"100%"}  justifyContent={"space-between"} _hover={{cursor : 'pointer'}}>
        <Box fontFamily={"Poppins"} w={"30%"} px={"1rem"} onClick={() => nav(`/applicants/${job.jobId}`)}>
          <Text fontSize={"16px"} color={"#000"} lineHeight={"36px"}>
            {job.jobTitle}
          </Text>
        </Box>
        <Box fontFamily={"Poppins"} w={"30%"} px={"1rem"}>
          <Text
            w={"100%"}
            textAlign={"center"}
            fontSize={"16px"}
            color={"#000"}
            lineHeight={"36px"}
          >
            {job.numOfApplicants}
          </Text>
        </Box>
        <HStack
          justifyContent={"space-around"}
          fontFamily={"Poppins"}
          w={"30%"}
          px={"1rem"}
          color={"#FFF"}
        >
          <Button
            _hover={{}}
            onClick={() => openJob(job.jobId, job.active)}
            borderRadius={"25px"}
            backgroundColor={"#009645"}
          >
            Open
          </Button>
          <Button
            _hover={{}}
            onClick={() => closeJob(job.jobId, job.active)}
            borderRadius={"25px"}
            backgroundColor={"#7C0000"}
          >
            Close
          </Button>
        </HStack>
      </HStack>
    </>
  );
};

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [locationVal, setLocationVal] = useState("");
  const [loading , setLoading] = useState(true);

  const { token , refetchUserData} = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();

  const validationSchema = yup.object({
    jobTitle: yup.string().required("Job title is required"),
    minWorkExperience: yup
      .string()
      .required("Minimum work experience is required"),
    jobLocations: yup.array().min(1, "At least one job location is required"),
    salary: yup.number().required("Salary is required"),
    jobDescription: yup.string().required("Job description is required"),
  });

  const submitForm = async (formik) => {
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.post(
        "/jobs/new",
        {
          jobTitle: formik.values.jobTitle,
          minWorkExperience: formik.values.minWorkExperience,
          jobLocations: formik.values.jobLocations,
          jobDescription: formik.values.jobDescription,
          salary: formik.values.salary,
        },
        config
      );
      getPostedJobs();
      customClose();
      refetchUserData();
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      minWorkExperience: "",
      jobLocations: [],
      salary: "",
      jobDescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      submitForm(formik);
    },
  });

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // Enter key
      event.preventDefault();
      formik.setFieldValue("jobLocations", [
        ...formik.values.jobLocations,
        locationVal,
      ]);
      setLocationVal("");
    }
  };

  const getPostedJobs = async () => {
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.get("/employer/jobs", config);
      setJobs(response.data.jobs);
    } catch (err) {
      console.error(err);
    }
  };

  const customClose = () => {
    formik.resetForm();
    onClose();
  }

  useEffect(() => {
    getPostedJobs();
    setLoading(false)
  }, []);

  if(loading) return <Loading />

  return (
    <>
      <Modal isOpen={isOpen} onClose={customClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"Poppins"} as={"form"} onSubmit={formik.handleSubmit}>
          <ModalHeader>Post a new Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isInvalid={formik.errors.jobTitle && formik.touched.jobTitle}
              mb={"5px"}
            >
              <FormLabel>Job Title</FormLabel>
              <Input
                name={"jobTitle"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobTitle}
                type="text"
              />
              <FormErrorMessage>{formik.errors.jobTitle}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.errors.minWorkExperience &&
                formik.touched.minWorkExperience
              }
              mb={"5px"}
            >
              <FormLabel>Min Work Experience</FormLabel>
              <Input
                name={"minWorkExperience"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.minWorkExperience}
                type="number"
              />
              <FormErrorMessage>
                {formik.errors.minWorkExperience}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={"5px"}>
              <FormLabel>Job Locations</FormLabel>
              <HStack gap={"5px"} flexWrap={"wrap"} mb={"5px"}>
                {formik.values.jobLocations.map((loc, index) => (
                  <LocationPill location={loc} key={`${loc}-${index}`} />
                ))}
              </HStack>
              <Input
                value={locationVal}
                onChange={(evt) => setLocationVal(evt.target.value)}
                onKeyDown={handleKeyDown}
                type={"text"}
              />
            </FormControl>
            <FormControl
              isInvalid={formik.errors.salary && formik.touched.salary}
              mb={"5px"}
            >
              <FormLabel>Salary</FormLabel>
              <Input
                name={"salary"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salary}
                type="number"
              />
              <FormErrorMessage>{formik.errors.salary}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.errors.jobDescription && formik.touched.jobDescription
              }
              mb={"5px"}
            >
              <FormLabel>Job Description</FormLabel>
              <Input
                name={"jobDescription"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobDescription}
                type="text"
              />
              <FormErrorMessage>
                {formik.errors.jobDescription}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={"space-between"}>
            <Button
              fontWeight={300}
              fontSize={"14px"}
              colorScheme="red"
              mr={3}
              onClick={customClose}
            >
              Discard and close
            </Button>
            <Button
              fontWeight={300}
              fontSize={"14px"}
              color={"white"}
              background={"#4B9C95"}
              type="submit"
            >
              Create Job
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box minH={"100vh"} height={"auto"} w={"100%"} bg={"primary"}>
        <Box position={"relative"} w={"100%"} h={"30vh"} background={"#4B9C95"}>
          <Navbar color={"#FFF"} />
          <Box
            position={"relative"}
            p={"3rem"}
            pt={"4rem"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
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
            <Box
              h={"auto"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button onClick={onOpen} color={"#4B9C95"}>
                Post New Job
              </Button>
            </Box>
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
          <VStack w={"100%"} mt={"1rem"}>
            {jobs.map((job, index) => (
              <TableRow
                getPostedJobs={getPostedJobs}
                key={job.jobId}
                job={job}
              />
            ))}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default EmployerDashboard;
