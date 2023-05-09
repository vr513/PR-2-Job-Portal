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
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";
import axios from "../../utils/axiosConfig";

const JobPill = ({ location, removeSkill, index }) => {
  return (
    <>
      <Box pos={"relative"}>
        <Text
          w={"max-content"}
          color={"#FFF"}
          bg={"#4B9C95"}
          borderRadius={"25px"}
          px={"10px"}
          ml={"0px !important"}
          pr={"15px"}
        >
          {location}
        </Text>
        <Icon
          _hover={{ cursor: "pointer" }}
          onClick={() => removeSkill(index)}
          pos={"absolute"}
          top={"-2px"}
          right={"0px"}
          as={MdCancel}
          boxSize={3}
        />
      </Box>
    </>
  );
};

const JobPill2 = ({ location }) => {
  return (
    <Text
      w={"max-content"}
      color={"#FFF"}
      bg={"#4B9C95"}
      borderRadius={"25px"}
      px={"10px"}
      ml={"0px !important"}
      pr={"15px"}
    >
      {location}
    </Text>
  );
};

const JobPreferences = () => {
  const [location, setLocation] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentUser, setCurrentUser, token } = useAuth();

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // Enter key
      event.preventDefault();
      formik.setFieldValue("preferredWorkLocation", [
        ...formik.values.preferredWorkLocation,
        location,
      ]);
      setLocation("");
    }
  };

  const removeSkill = (index) => {
    const currentLocations = formik.values.preferredWorkLocation;
    const newLocations = [
      ...currentLocations.slice(0, index),
      ...currentLocations.slice(index + 1),
    ];
    formik.setFieldValue("preferredWorkLocation", newLocations);
  };

  const saveJobPreferences = async (values, actions) => {
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.post(
        "/save-job-preferences",
        {
          preferredWorkLocation: values.preferredWorkLocation,
          minSalary: values.minSalary,
        },
        config
      );
      setCurrentUser(response.data.user);
    } catch (err) {
      console.error(err);
    }
  };
  const customClose = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      preferredWorkLocation: currentUser.preferredWorkLocation,
      minSalary: currentUser.minSalary,
    },
    onSubmit: (values, actions) => { saveJobPreferences(values,actions)},
  });

  return (
    <>
      <Box
        id={"job-preferences"}
        width={"100%"}
        bg={"white"}
        borderRadius={"5px"}
      >
        <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={"22px"} fontWeight="600">
              Job Preferences
            </Text>
            <Button
              onClick={onOpen}
              bg="none"
              color={"secondary"}
              fontSize={"16px"}
            >
              ADD JOB PREFERENCES
            </Button>
          </Flex>
          <Text color={"#8F8F8F"}>
            Please mention your job preferences. You can add details about your
            sjob preferences like minimum salary and prefered job locations.
            This will help us personalise job recommendations.
          </Text>
          <VStack alignItems={"flex-start"}>
            <UnorderedList>
              <ListItem key={`jp-1`}>
                <Text> Salary Expectations : {currentUser.minSalary}</Text>
              </ListItem>
              <ListItem key={`jp-2`}>
                <Text> Job Location Preferences : </Text>
                <HStack gap={'10px'}>
                  {currentUser.preferredWorkLocation.map((job , index) => (
                    <JobPill2 location={job} key={`kpcds-${index}`} />
                  ))}
                </HStack>{" "}
              </ListItem>
            </UnorderedList>
          </VStack>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={customClose}>
        <ModalOverlay />
        <ModalContent
          as={"form"}
          onSubmit={formik.handleSubmit}
          fontFamily={"Poppins"}
        >
          <ModalHeader>Add Job Preferences</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isInvalid={
                formik.errors.preferredWorkLocation &&
                formik.touched.preferredWorkLocation
              }
            >
              <FormLabel>Job Location Preferences</FormLabel>
              <HStack my={"10px"}>
                {formik.values.preferredWorkLocation.map((loc, index) => (
                  <JobPill
                    removeSkill={removeSkill}
                    location={loc}
                    key={`loc-${index}`}
                    index={index}
                  />
                ))}
              </HStack>
              <Input
                value={location}
                onChange={(evt) => setLocation(evt.target.value)}
                onBlur={formik.handleBlur}
                type="text"
                onKeyDown={handleKeyDown}
              />
              <FormErrorMessage>
                {formik.errors.preferredWorkLocation}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik.errors.minSalary && formik.touched.minSalary}
            >
              <FormLabel>Minimum Salary Expectations</FormLabel>
              <Input
                name="minSalary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                value={formik.values.minSalary}
              />
              <FormErrorMessage>{formik.errors.minSalary}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button fontWeight={300} fontSize={"14px"} colorScheme="red" mr={3} onClick={customClose}>
              Discard and close
            </Button>
            <Button
              fontWeight={300}
              fontSize={"14px"}
              color={"white"}
              background={"#4B9C95"}
              type="submit"
            >
              Save Job Preferences
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobPreferences;
