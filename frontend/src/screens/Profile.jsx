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
  Input,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineWorkOutline,
  MdOutlineMailOutline,
} from "react-icons/md";
import KeySkills from "../components/profile/KeySkills";
import Employement from "../components/profile/Employment";
import Education from "../components/profile/Education";
import Projects from "../components/profile/Projects";
import PersonalDetail from "../components/profile/PersonalDetails";
import { useAuth } from "../contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import JobPreferences from "../components/profile/JobPrefs";

function Profile() {
  const [resumeFile, setResumeFile] = useState(null);
  const handleResumeInput = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const { currentUser } = useAuth();

  const lastEmployment =
    currentUser?.employmentHistory[currentUser.employmentHistory.length - 1];

    const customScroll = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({behavior : 'smooth'})
    }

  const CustomLinkTo = ({ href, text }) => {
    return (

        <Flex
          height={"9%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text>{text}</Text>
          <Button bg={"none"} onClick={() => customScroll(href)} color={"secondary"}>
            ADD
          </Button>
        </Flex>
     
    );
  };

  return (
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
        justifyContent="space-between"
        alignItems={"center"}
        color={"White"}
      >
        <Avatar boxSize="8rem" bg="#353535" alignSelf={"center"} />
        <Box display={"flex"} flexDir={"column"} width={"50vw"} gap={"0.75rem"}>
          <Text fontSize={"22px"}>{currentUser?.name}</Text>

          <HStack fontSize={"16px"}>
            <Box
              display={"flex"}
              width={"50%"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Icon boxSize={5} as={MdOutlineLocationOn} />
              {currentUser?.currentLocation}
            </Box>
            <Box
              display={"flex"}
              width={"50%"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Icon boxSize={5} as={MdOutlinePhone} />
              <Link as={RouterLink} to={`tel:+91${currentUser?.contactNumber}`}>
                +91 {currentUser?.contactNumber}
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
                to={`mailto:${currentUser?.alternateEmail}`}
              >
                {currentUser?.alternateEmail}
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
              <Link as={RouterLink} to={`mailto:${currentUser?.email}`}>
                {currentUser?.email}
              </Link>
            </Box>
          </HStack>
        </Box>
        <Box
          width={"30vw"}
          height={"27vh"}
          bg={"#353535"}
          borderRadius={"5px"}
          p="1rem"
          pl="2.5rem"
        >
          <Text fontSize={"22px"}>10 Pending Actions</Text>
          <Flex
            flexDirection="column"
            height={"60%"}
            mt="1.1rem"
            gap="0.5rem"
            overflowY={"hidden"}
          >
            <Link>Add Preferred Location</Link>
            <Link>Add Preferred Resume</Link>
            <Link>Add Preferred Department</Link>
          </Flex>
          <Flex justifyContent={"flex-end"}>
            <Link fontSize={"13px"}>VIEW ALL</Link>
          </Flex>
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

          <CustomLinkTo href={"upload-resume"} text={"Upload Resume"} />
          <CustomLinkTo href={"key-skills"} text={"Key Skills"} />
          <CustomLinkTo href={"employment"} text={"Employment"} />
          <CustomLinkTo href={"education"} text={"Education"} />
          <CustomLinkTo href={"projects"} text={"Projects"} />
          <CustomLinkTo href={"personal-details"} text={"Personal Details"} />
          <CustomLinkTo href={'job-preferences'} text={'Job Preferences'} />
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
          <Box width={"100%"} bg={"white"} borderRadius={"5px"} id="upload-resume">
            <Flex
              flexDir={"column"}
              gap={"0.25rem"}
              p={"1rem"}
              height={"32vh"}
              overflowY={"hidden"}
            >
              <Text fontSize={"22px"} fontWeight="600">
                Resume
              </Text>
              <Text>
                Resume is the most important document recruiters look for.
                Recruiters generaly do not look at profile without resumes
              </Text>
              <Spacer />
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
                mt="0.5rem"
                height={"50%"}
                border={"1px solid #e1edec"}
                borderRadius={"5px"}
                gap="0.25rem"
              >
                <Box
                  as="label"
                  display="flex"
                  border="1px"
                  width="20%"
                  bg="secondary"
                  textColor={"white"}
                  height={"2.5rem"}
                  borderRadius={"5px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _hover={{ cursor: "pointer" }}
                >
                  <Input
                    type={"file"}
                    display={"none"}
                    onChange={handleResumeInput}
                    multiple={false}
                  />
                  <span>UPLOAD RESUME</span>
                </Box>

                <Box>
                  {resumeFile ? (
                    <span>{resumeFile.name}</span>
                  ) : (
                    <span>Supported Formats :doc,docx,rtf,pdf,upto 2MB</span>
                  )}
                </Box>
              </Box>
            </Flex>
          </Box>

          <KeySkills />
          <Employement />
          <Education />
          <Projects />
          <PersonalDetail />
          <JobPreferences />
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
