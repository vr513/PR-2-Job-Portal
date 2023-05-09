import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
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
  useDisclosure,
  Switch,
} from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import React, { forwardRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as Yup from "yup";
import axios from '../../utils/axiosConfig'

const EmploymentCard = ({ employment }) => {
  const startDate = new Date(employment.fromDate);
  const currDate = employment.toDate ? new Date(employment.toDate) : new Date();
  const dateOptions = { day: "numeric", month: "numeric", year: "numeric" };
  return (
    <>
      <Box
        w={"100%"}
        p={"1rem"}
        borderRadius={"15px"}
        mt={"15px"}
        boxShadow={"0px 2px 6px 4px rgba(0, 0, 0, 0.1)"}
      >
        <HStack justifyContent={"space-between"}>
          <Heading
            fontWeight={500}
            color={"#4b9c95"}
            fontFamily={"Poppins"}
            fontSize={"20px"}
            as={"h3"}
          >
            {employment.position} at {employment.companyName}
          </Heading>
          <Text>
            {startDate.toLocaleDateString("en-GB", dateOptions)} -{" "}
            {currDate.toLocaleDateString("en-GB", dateOptions)}
          </Text>
        </HStack>
        <Text mt={"10px"} fontSize={"14px"}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          culpa modi sed neque ad incidunt officia quae possimus! Eum, sequi
          odio. Cumque consectetur in dolore officia vel numquam architecto
          repellat?
        </Text>
      </Box>
    </>
  );
};

function Employement({}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentUser, token, setCurrentUser } = useAuth();

  const saveEmployment = async(formik) => {
    try{
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.post('/add-new-employment',{
        companyName : formik.values.companyName,
        position : formik.values.position,
        description : formik.values.description,
        isCurrentJob : formik.values.isCurrentJob,
        fromDate : new Date(formik.values.fromDate),
        toDate : formik.values.isCurrentJob ? null : new Date(formik.values.toDate)
      },config);
      setCurrentUser(response.data.user);
      customClose()
    }catch(err){
      console.error(err);
    }
  }

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company name is required"),
    position: Yup.string().required("Position is required"),
    isCurrentJob: Yup.boolean(),
    fromDate : Yup.date().required("Start date is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      position: "",
      isCurrentJob: false,
      fromDate: "",
      toDate: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      saveEmployment(formik);
    },
  });
  const customClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Box id="employment" width={"100%"} bg={"white"} borderRadius={"5px"}>
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Employement
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD EMPLOYEMENT
          </Button>
        </Flex>
        <Text color={"#8F8F8F"}>
          Mention your employment details including your current and previous
          company work experience.
        </Text>
        <VStack>
          {currentUser.employmentHistory.map((employment, index) => (
            <EmploymentCard key={`employment-${index}`} employment={employment} />
          ))}
        </VStack>
      </Flex>
      <Modal isOpen={isOpen} onClose={customClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={formik.handleSubmit} maxW={"70%"}>
          <ModalHeader>Add Employement details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isInvalid={
                formik.errors.companyName && formik.touched.companyName
              }
            >
              <FormLabel>Company name</FormLabel>
              <Input
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={"companyName"}
                type="text"
              />
              <FormErrorMessage>{formik.errors.companyName}</FormErrorMessage>
            </FormControl>
            <HStack gap={"1rem"}>
              <FormControl
                isInvalid={formik.errors.position && formik.touched.position}
              >
                <FormLabel>Role</FormLabel>
                <Input
                  type="text"
                  name="position"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.position}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.errors.isCurrentJob && formik.touched.isCurrentJob
                }
              >
                <FormLabel>Is this your current job?</FormLabel>
                <Switch
                  isChecked={formik.values.isCurrentJob}
                  onChange={() => {
                    formik.setFieldValue(
                      "isCurrentJob",
                      !formik.values.isCurrentJob
                    );
                  }}
                />
                <FormErrorMessage>
                  {formik.errors.isCurrentJob}
                </FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl
                isInvalid={formik.errors.fromDate && formik.touched.fromDate}
              >
                <FormLabel>Start Date </FormLabel>
                <Input
                  type="date"
                  name="fromDate"
                  onChange={formik.handleChange}
                  value={formik.values.fromDate}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.fromDate}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.toDate && formik.touched.toDate}
              >
                <FormLabel>End Date </FormLabel>
                <Input
                  type="date"
                  name="toDate"
                  onChange={formik.handleChange}
                  value={formik.values.toDate}
                  onBlur={formik.handleBlur}
                  disabled={formik.values.isCurrentJob}
                />
                <FormErrorMessage>{formik.errors.toDate}</FormErrorMessage>
              </FormControl>
            </HStack>
            <FormControl
              isInvalid={
                formik.errors.description && formik.touched.description
              }
            >
              <FormLabel>Job Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>
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
              Add employment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Employement;
