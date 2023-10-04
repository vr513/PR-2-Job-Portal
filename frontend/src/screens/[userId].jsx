import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Spacer,
  Text,
  Link,
  VStack,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineWorkOutline,
  MdOutlineMailOutline,
} from "react-icons/md";
import axios from "../utils/axiosConfig";

import {
  BsGenderFemale,
  BsGenderMale,
  BsGenderAmbiguous,
} from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";

const CustomLinkTo = ({ href, text }) => {
  const nav = useNavigate();
  return (
    <Flex height={"9%"} alignItems={"center"} justifyContent={"space-between"}>
      <Text>{text}</Text>
      <Button bg={"none"} onClick={() => nav(href)} color={"secondary"}>
        Go to
      </Button>
    </Flex>
  );
};
const SkillPill2 = ({ location }) => {
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

const UserData = () => {
  const [loading, setLoading] = useState(true);
  const [customCurrentUser, setCustomCurrentUser] = useState(null);
  const [age , setAge] = useState(0);

  const { id: jobId, applicantId } = useParams();

  let dob;

  const { token } = useAuth();

  const getUserData = async () => {

    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.get(
        `/applicant/${jobId}/${applicantId}`,
        config
      );
      
      console.log(response);
      setCustomCurrentUser(response.data.user);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    dob = new Date(customCurrentUser?.dateOfBirth);
    setAge(new Date().getFullYear() - dob.getFullYear());
  },[customCurrentUser])

  const lastEmployment =
    customCurrentUser?.employmentHistory[
      customCurrentUser.employmentHistory.length - 1
    ];

    console.log(loading);

  const getGenderIcon = () => {
    if (customCurrentUser.gender == "male") return BsGenderMale;
    else if (customCurrentUser.gender == "female") return BsGenderFemale;
    else return BsGenderAmbiguous;
  };
  
  if (loading) {
    return <Box />;
  }
  else return (
    <>
      <Box
        display="flex"
        height="100vh"
        flexDir="column"
        bg="primary"
        fontFamily={"Poppins"}
      >
        <Box
          position="fixed"
          top="0px"
          width="100vw"
          height="30vh"
          bg="secondary"
          display="flex"
          p="2rem"
          gap="2rem"
          justifyContent="flex-start"
          alignItems={"center"}
          color={"White"}
        >
          <Avatar boxSize="8rem" bg="#353535" alignSelf={"center"} />
          <Box
            display={"flex"}
            flexDir={"column"}
            width={"50vw"}
            gap={"0.75rem"}
          >
            <Text fontSize={"22px"}>{customCurrentUser?.name}</Text>

            <HStack fontSize={"16px"}>
              <Box
                display={"flex"}
                width={"50%"}
                alignItems={"center"}
                gap={"1rem"}
              >
                <Icon boxSize={5} as={MdOutlineLocationOn} />
                {customCurrentUser?.currentLocation}
              </Box>
              <Box
                display={"flex"}
                width={"50%"}
                alignItems={"center"}
                gap={"1rem"}
              >
                <Icon boxSize={5} as={MdOutlinePhone} />
                <Link
                  as={RouterLink}
                  to={`tel:+91${customCurrentUser?.contactNumber}`}
                >
                  +91 {customCurrentUser?.contactNumber}
                </Link>
              </Box>
            </HStack>

            <HStack fontSize={"16px"}>
              {lastEmployment && (
                <Box
                  display={"flex"}
                  width={"50%"}
                  alignItems={"center"}
                  gap={"1rem"}
                >
                  <Icon boxSize={5} as={MdOutlineWorkOutline} />
                  {lastEmployment.position} at {lastEmployment.companyName}
                </Box>
              )}
              <Box
                display={"flex"}
                width={"50%"}
                alignItems={"center"}
                gap={"1rem"}
              >
                <Icon boxSize={5} as={MdOutlineMailOutline} />
                <Link
                  as={RouterLink}
                  to={`mailto:${customCurrentUser?.alternateEmail}`}
                >
                  {customCurrentUser?.alternateEmail}
                </Link>
              </Box>
            </HStack>
            <HStack fontSize={"16px"}>
              <Box
                display={"flex"}
                width={"50%"}
                alignItems={"center"}
                gap={"1rem"}
              >
                <Icon boxSize={5} as={MdOutlineMailOutline} />
                <Link as={RouterLink} to={`mailto:${customCurrentUser?.email}`}>
                  {customCurrentUser?.email}
                </Link>
              </Box>
              <Box
                display={"flex"}
                width={"50%"}
                alignItems={"center"}
                gap={"1rem"}
                textTransform={"capitalize"}
              >
                <Icon boxSize={5} as={getGenderIcon()} />
                {customCurrentUser.gender} ({age})
              </Box>
            </HStack>
          </Box>
        </Box>

        <Box mt={"33vh"} ml={"2rem"} mr={"2rem"} display={"flex"} gap={"2%"}>
          <Box
            display={"flex"}
            flexDir={"column"}
            width={"25vw"}
            p={"1rem"}
            borderRadius={"5px"}
            bg={"white"}
            height={"65vh"}
          >
            <Text fontSize={"25px"} fontWeight={"600"}>
              QUICK LINKS
            </Text>

            <Flex
              alignSelf={"center"}
              mt={"0.5rem"}
              mb={"1.5rem"}
              width={"100%"}
              border={"1px"}
              borderColor={"#DEDEDE"}
            ></Flex>

            <CustomLinkTo href={"/"} text={"Home"} />
          </Box>

          <Box
            display={"flex"}
            flexDir={"column"}
            width={"69vw"}
            height={"65vh"}
            gap={"1rem"}
            overflowY={"scroll"}
            pr="1rem"
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
            {/* Resume */}
            <Box
              width={"100%"}
              bg={"white"}
              borderRadius={"5px"}
              id="upload-resume"
            >
              <Flex
                flexDir={"column"}
                gap={"0.25rem"}
                p={"1rem"}
                overflowY={"hidden"}
              >
                <Text fontSize={"22px"} fontWeight="600">
                  Resume
                </Text>
                <Text>
                  
                </Text>
                <Spacer />
              </Flex>
            </Box>

            {/* <KeySkills />
            <Employement />
            <Education />
            <Projects />
            <PersonalDetail />
            <JobPreferences /> */}

            <Flex
              flexDir={"column"}
              gap={"0.5rem"}
              p={"1rem"}
              width={"100%"}
              bg={"white"}
              borderRadius={"5px"}
              id="applicant-key-skills"
            >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize={"22px"} fontWeight="600">
                  Key Skills
                </Text>
              </Flex>
              <HStack gap={"5px"} mt={"10px"}>
                  {customCurrentUser?.keySkills?.map((skill, index) => (
                    <SkillPill2
                      location={skill}
                      key={`skillpill-${skill}-${index}`}
                    />
                  ))}
                </HStack>
            </Flex>

            <Flex
              width={"100%"}
              bg={"white"}
              borderRadius={"5px"}
              flexDir={"column"}
              gap={"0.5rem"}
              p={"1rem"}
              id="applicant-employment-history"
            >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize={"22px"} fontWeight="600">
                  Employement History
                </Text>
              </Flex>
              
              <VStack>
                {customCurrentUser.employmentHistory.map(
                  (employment, index) => (
                    <EmploymentCard
                      key={`employment-${index}`}
                      employment={employment}
                    />
                  )
                )}
              </VStack>
            </Flex>

            <Flex
              width={"100%"}
              bg={"white"}
              borderRadius={"5px"}
              flexDir={"column"}
              gap={"0.5rem"}
              p={"1rem"}
              id="applicant-projects"
            >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize={"22px"} fontWeight="600">
                  Projects
                </Text>
              </Flex>
              
              <VStack>
                {customCurrentUser.projects.map((project, index) => (
                  <ProjectCard project={project} index={`project-${index}`} />
                ))}
              </VStack>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserData;
