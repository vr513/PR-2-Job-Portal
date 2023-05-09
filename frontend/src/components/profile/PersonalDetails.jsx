import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from '../../utils/axiosConfig'
import * as Yup from "yup";


const PersonalDetails = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { token, setCurrentUser, currentUser } = useAuth();

  const dateString = currentUser.dateOfBirth;
  const date = new Date(dateString);
  const isoDateString = date.toISOString();
  const dateOnlyString = isoDateString.substr(0, 10);

  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    currentLocation : Yup.string().required("Current Location is required"),
    alternateEmail: Yup.string()
      .email("Must be a valid email")
      .required("Alternate email is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    contactNumber: Yup.string()
      .matches(/^\d{10}$/, "Must be a 10 digit number")
      .required("Contact number is required"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Must be male, female, or other")
      .required("Gender is required"),
  });

  const savePersonalDetails = async(values, actions) => {
    try{
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.post('/save-personal-details',{
        address : values.address,
        currentLocation : values.currentLocation,
        alternateEmail : values.alternateEmail,
        dateOfBirth : new Date(values.dateOfBirth),
        contactNumber : values.contactNumber,
        gender : values.gender
      },config);
      setCurrentUser(response.data.user);
      customClose();
    }catch(err){
      console.error(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      address: currentUser.address,
      currentLocation : currentUser.currentLocation,
      alternateEmail: currentUser.alternateEmail,
      dateOfBirth: dateOnlyString,
      contactNumber: currentUser.contactNumber,
      gender: currentUser.gender,
    },
    validationSchema : validationSchema,
    onSubmit : (values,actions) => {
      savePersonalDetails(values,actions);
    }
  });

  const customClose = () => {
    onClose();
  };


  return (
    <Box
      width={"100%"}
      bg={"white"}
      borderRadius={"5px"}
      id="personal-details"
    >
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Personal Details
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD PERSONAL DETAILS
          </Button>
        </Flex>
        <Text color={"#8F8F8F"}>
          This information will help the recruiters and Naukri know about your
          current job profile and also your desired job criteria. This will also
          help us personalize your job recommendations.
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={customClose}>
        <ModalOverlay />
        <ModalContent onSubmit={formik.handleSubmit} as={"form"} fontFamily={"Poppins"} maxW={"50%"}>
          <ModalHeader>Add Profile Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
            <FormControl
              isInvalid={formik.errors.address && formik.touched.address}
            >
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik.errors.currentLocation && formik.touched.currentLocation}
            >
              <FormLabel>Current Location</FormLabel>
              <Input
                type="text"
                name="currentLocation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentLocation}
              />
              <FormErrorMessage>{formik.errors.currentLocation}</FormErrorMessage>
            </FormControl>
            </HStack>
            <HStack gap={"1rem"}>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select your gender"
                  {...formik.getFieldProps("gender")}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.errors.dateOfBirth && formik.touched.dateOfBirth
                }
              >
                <FormLabel>Date of birth</FormLabel>
                <Input
                  name="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="date"
                />
                <FormErrorMessage>{formik.errors.dateOfBirth}</FormErrorMessage>
              </FormControl>
            </HStack>

            <HStack gap={"1rem"}>
            <FormControl
                isInvalid={
                  formik.errors.contactNumber && formik.touched.contactNumber
                }
              >
                <FormLabel>Contact Number</FormLabel>
                <Input
                  name="contactNumber"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                />
                <FormErrorMessage>{formik.errors.contactNumber}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.errors.alternateEmail && formik.touched.alternateEmail
                }
              >
                <FormLabel>Alternate Email</FormLabel>
                <Input
                  name="alternateEmail"
                  value={formik.values.alternateEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                />
                <FormErrorMessage>{formik.errors.alternateEmail}</FormErrorMessage>
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
              Add employment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PersonalDetails;
