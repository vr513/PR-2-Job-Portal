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
  useDisclosure,
  Heading,
  UnorderedList,
  ListItem,
  Link,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import axios from "../../utils/axiosConfig";

const ProjectCard = ({ project }) => {
  return (
    <>
      <Box
        w={"100%"}
        p={"1rem"}
        borderRadius={"15px"}
        mt={"15px"}
        boxShadow={"0px 2px 6px 4px rgba(0, 0, 0, 0.1)"}
      >
        <Heading
          fontWeight={500}
          color={"#4b9c95"}
          fontFamily={"Poppins"}
          fontSize={"20px"}
          as={"h3"}
        >
          {project.projectName}
        </Heading>
        <Text mt={"10px"} fontSize={"14px"}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          culpa modi sed neque ad incidunt officia quae possimus! Eum, sequi
          odio. Cumque consectetur in dolore officia vel numquam architecto
          repellat?
        </Text>
        <UnorderedList mt={"10px"}>
          <ListItem key={`list1-${project.projectName}`}>
            Github URL -{" "}
            <Link color={"#4b9c95"} as={RouterLink} to={project.githubUrl}>
              {project.githubUrl}
            </Link>{" "}
          </ListItem>
          <ListItem key={`list2-${project.projectName}`}>
            Deployment URL -{" "}
            <Link color={"#4b9c95"} as={RouterLink} to={project.deploymentUrl}>
              {project.deploymentUrl}
            </Link>{" "}
          </ListItem>
        </UnorderedList>
      </Box>
    </>
  );
};

function Projects({}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { token, currentUser, setCurrentUser } = useAuth();

  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project name is required"),
    projectDescription: Yup.string().required(
      "Project description is required"
    ),
    githubUrl: Yup.string()
      .required("Github URL is required")
      .url("Please enter a valid Github URL"),
    deploymentUrl: Yup.string()
      .required("Deployment URL is required")
      .url("Please enter a valid URL"),
  });

  const addProject = async (values, actions) => {
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.post(
        "/add-project",
        {
          projectName: values.projectName,
          projectDescription: values.projectDescription,
          githubUrl: values.githubUrl,
          deploymentUrl: values.deploymentUrl,
        },
        config
      );
      setCurrentUser(response.data.user);
      customClose();
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      projectName: "",
      projectDescription: "",
      githubUrl: "",
      deploymentUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      addProject(values, actions);
    },
  });

  const customClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Box id="projects"  width={"100%"} bg={"white"} borderRadius={"5px"}>
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Projects
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD PROJECTS
          </Button>
        </Flex>
        <Text color={"#8F8F8F"}>
          Add details about projects you have done in college, internship or at
          work.
        </Text>
        <VStack>
          {currentUser.projects.map((project, index) => (
            <ProjectCard project={project} index={`project-${index}`} />
          ))}
        </VStack>
      </Flex>

      <Modal isOpen={isOpen} onClose={customClose}>
        <ModalOverlay />
        <ModalContent
          as={"form"}
          onSubmit={formik.handleSubmit}
          maxW={"50%"}
          fontFamily={"Poppins"}
        >
          <ModalHeader>Add Projects</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isInvalid={
                formik.errors.projectName && formik.touched.projectName
              }
            >
              <FormLabel>Project Name</FormLabel>
              <Input
                name="projectName"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <FormErrorMessage>{formik.errors.projectName}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.errors.projectDescription &&
                formik.touched.projectDescription
              }
            >
              <FormLabel>Project Description</FormLabel>
              <Input
                name="projectDescription"
                value={formik.values.projectDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <FormErrorMessage>
                {formik.errors.projectDescription}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik.errors.githubUrl && formik.touched.githubUrl}
            >
              <FormLabel>Github URL</FormLabel>
              <Input
                name="githubUrl"
                value={formik.values.githubUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <FormErrorMessage>{formik.errors.githubUrl}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.errors.deploymentUrl && formik.touched.deploymentUrl
              }
            >
              <FormLabel>Deployment URL</FormLabel>
              <Input
                name="deploymentUrl"
                value={formik.values.deploymentUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <FormErrorMessage>{formik.errors.deploymentUrl}</FormErrorMessage>
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

export default Projects;
