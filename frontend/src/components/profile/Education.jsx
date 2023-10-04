import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  HStack,
  useDisclosure,
  UnorderedList,
  ListItem,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import React, { forwardRef } from "react";
import * as Yup from "yup";
import axios from '../../utils/axiosConfig'
import { useAuth } from "../../contexts/AuthContext";

const EduCard = ({education}) => {
  const date = new Date(education.dateOfCompletion);
  return (
    <>
      <Box display={"flex"} flexDir={"row"} gap={"10px"}>
        <Text
          fontSize={"20px"}
          fontWeight={700}
          fontFamily={"open-sans"}
          fontStyle={"italic"}
        >
          {education.degreeName}
        </Text>{" "}
        <Text fontSize={"20px"} fontFamily={"mono"}>
          from{" "}
        </Text>
        <Text
          fontSize={"20px"}
          fontWeight={700}
          fontFamily={"open-sans"}
          fontStyle={"italic"}
        >
          {education.collegeName}
        </Text>{" "}
        <Text
          fontSize={"20px"}
          fontWeight={600}
          fontFamily={"open-sans"}
          fontStyle={"italic"}
        >
          ({date.getFullYear()}) -
        </Text>
        <Text fontSize={"18px"} fontWeight={500} fontFamily={"poppins"}>
          GPA : {education.actualGPA} / {education.maxGPA}
        </Text>
      </Box>
    </>
  );
};

function Education({}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {token , setCurrentUser , currentUser} = useAuth();

  const validationSchema = Yup.object().shape({
    degreeName: Yup.string().required("Degree name is required"),
    collegeName: Yup.string().required("College name is required"),
    dateOfCompletion: Yup.date().required("Date of completion is required"),
    actualGPA: Yup.number()
      .required("Actual GPA is required")
      .typeError("Actual GPA must be a number"),
    maxGPA: Yup.number()
      .required("Maximum GPA is required")
      .typeError("Maximum GPA must be a number"),
  });

  const addEducationDetails = async(values , action) => {
    try{
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.post("/add-education",{
        degreeName : values.degreeName,
        collegeName : values.collegeName,
        dateOfCompletion : new Date(values.dateOfCompletion),
        actualGPA : values.actualGPA,
        maxGPA : values.maxGPA
      },config);
      setCurrentUser(response.data.user);
      customClose();
    }catch(err){
      console.error(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      degreeName: "",
      collegeName: "",
      dateOfCompletion: "",
      actualGPA: "",
      maxGPA: "",
    },
    validationSchema : validationSchema,
    onSubmit: (values, action) => {
      addEducationDetails(values , action);
    },
  });

  const customClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Box id="education" width={"100%"} bg={"white"} borderRadius={"5px"}>
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Education
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD EDUCATION
          </Button>
        </Flex>
        <Text color={"#8F8F8F"}>
          Please mention your education details. You can add details about your
          school, college and degree. This will increase your profile strength.
        </Text>
        <VStack alignItems={"flex-start"}>
          <UnorderedList>
            {currentUser.educationHistory.map((education,index) => (
              <ListItem key={index}>
                <EduCard education={education} />
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      </Flex>

      <Modal isOpen={isOpen} onClose={customClose}>
        <ModalOverlay />
        <ModalContent
          fontFamily={"Poppins"}
          as={"form"}
          onSubmit={formik.handleSubmit}
          maxW={'60%'}
        >
          <ModalHeader>Add Education Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack gap={'1rem'}>
            <FormControl
              isInvalid={formik.errors.degreeName && formik.touched.degreeName}
            >
              <FormLabel>Degree Name</FormLabel>
              <Input
                type="text"
                name={'degreeName'}
                value={formik.values.degreeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors.degreeName}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.dateOfCompletion && formik.touched.dateOfCompletion}>
              <FormLabel>Date of Completion</FormLabel>
              <Input type="date" name="dateOfCompletion" value={formik.values.dateOfCompletion} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <FormErrorMessage>{formik.errors.dateOfCompletion}</FormErrorMessage>
            </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>College Name</FormLabel>
              <Input type="text" value={formik.values.collegeName} onChange={formik.handleChange} onBlur={formik.handleBlur} name="collegeName" />
              <FormErrorMessage>{formik.errors.collegeName}</FormErrorMessage>
            </FormControl>
            <HStack gap={'1rem'}>
              <FormControl isInvalid={formik.errors.actualGPA && formik.touched.actualGPA}>
                <FormLabel>Actual GPA</FormLabel>
                <Input type="number" name="actualGPA" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.actualGPA} />
                <FormErrorMessage>{formik.errors.actualGPA}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.maxGPA && formik.touched.maxGPA}>
                <FormLabel>Max GPA</FormLabel>
                <Input type="number" name="maxGPA" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.maxGPA} />
                <FormErrorMessage>{formik.errors.maxGPA}</FormErrorMessage>
              </FormControl>
            </HStack>
          </ModalBody>
          <ModalFooter>
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
              Add Education History
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Education;
