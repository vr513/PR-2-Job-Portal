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
import React, { useState } from "react";
import {
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineWorkOutline,
  MdOutlineMailOutline,
  MdOutlineCalendarToday,
} from "react-icons/md";
import ResumeHeadline from "../components/profile/ResumeHeadline";

function Profile() {
  const [resumeFile, setResumeFile] = useState(null);
  const handleResumeInput = (e) => {
    setResumeFile(e.target.files[0]);
  };

  return (
    <Box display="flex" height="100vh" flexDir="column" bg="primary">
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
          <Text fontSize={"22px"}>Pratap Rajput</Text>

          <HStack fontSize={"16px"}>
            <Box
              display={"flex"}
              width={"50%"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Icon boxSize={5} as={MdOutlineLocationOn} />
              Pune,India
            </Box>
            <Box
              display={"flex"}
              width={"50%"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Icon boxSize={5} as={MdOutlinePhone} />
              +91591240914
            </Box>
          </HStack>

          <HStack fontSize={"16px"}>
            <Box
              display={"flex"}
              width={"50%"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Icon boxSize={5} as={MdOutlineWorkOutline} />
              Fresher
            </Box>
            <Box
              display={"flex"}
              width={"50%"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Icon boxSize={5} as={MdOutlineMailOutline} />
              pratp.rajput7676@gmail.com
            </Box>
          </HStack>
          <HStack fontSize={"16px"}>
            <Box
              display={"flex"}
              width={"50%"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Icon boxSize={5} as={MdOutlineCalendarToday} />
              Add Avail to join
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
          width={"25vw"}
          p={"1rem"}
          borderRadius={"5px"}
          bg={"white"}
          height={"65vh"}
        >
          <Text>quicks links</Text>
          <Text>quicks links</Text>
          <Text>quicks links</Text>
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
          <Box width={"100%"} bg={"white"} borderRadius={"5px"}>
            <Flex flexDir={"column"} gap={"0.25rem"} p={"1rem"} height={"32vh"} overflowY={"hidden"} >
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

          {/* resume headline */}

          {/* <Box width={"100%"} bg={"white"} borderRadius={"5px"}>
            <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"} height={"15vh"} >
              <Flex alignItems={"center"} justifyContent={"space-between"} >
                <Text fontSize={"22px"} fontWeight="600">
                  Resume Headline
                </Text>
                <Button bg="none" color={"secondary"} fontSize={"16px"}>ADD RESUME HEADLINE</Button>
              </Flex>
              <Text>
                It is the first thing recruiters notice in your profile. Write
                concisely what makes you unique and right person for the job you
                looking for
              </Text>
            </Flex>
          </Box> */}

          {/* keyskills */}

          <ResumeHeadline />

          <Box width={"100%"} height={"25vh"} bg={"white"} borderRadius={"5px"}>
            <Box p={"1rem"} height={"25vh"}>
              Resume
            </Box>
          </Box>

          <Box width={"100%"} height={"25vh"} bg={"white"} borderRadius={"5px"}>
            <Box p={"1rem"} height={"25vh"}>
              Resume
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
