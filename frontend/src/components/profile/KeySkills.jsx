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
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { forwardRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MdCancel } from "react-icons/md";
import axios from "../../utils/axiosConfig";

const SkillPill = ({ location, removeSkill, index }) => {
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

function KeySkills() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [skillVal, setSkillVal] = useState("");

  const { currentUser, token, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      keySkills: currentUser?.keySkills,
    },
    onSubmit: (values, action) => {
      saveKeySkills(formik);
    },
  });

  const customClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // Enter key
      event.preventDefault();
      formik.setFieldValue("keySkills", [...formik.values.keySkills, skillVal]);
      setSkillVal("");
    }
  };

  const removeSkill = (index) => {
    const currentSkills = formik.values.keySkills;
    const newSkills = [
      ...currentSkills.slice(0, index),
      ...currentSkills.slice(index + 1),
    ];
    formik.setFieldValue("keySkills", newSkills);
  };

  const saveKeySkills = async (formik) => {
    try {
      const config = {
        headers: { Authorization: `JWT ${token}` },
      };
      const response = await axios.post(
        "/update-key-skills",
        { keySkills: formik.values.keySkills },
        config
      );
      setCurrentUser(response.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box id="key-skills"  width={"100%"} bg={"white"} borderRadius={"5px"}>
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Key Skills
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD KEY SKILLS
          </Button>
        </Flex>
        <Text color={"#8F8F8F"}>
          Tell recruiters what you know or what you are known for e.g. Direct
          Marketing, Oracle, Java etc. We will send you job recommendations
          based on these skills.
          <HStack gap={'5px'} mt={"10px"}>
            {currentUser?.keySkills?.map((skill, index) => (
              <SkillPill2
                location={skill}
                key={`skillpill-${skill}-${index}`}
              />
            ))}
          </HStack>
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={customClose}>
        <ModalOverlay />
        <ModalContent
          as={"form"}
          fontFamily={"Poppins"}
          onSubmit={formik.handleSubmit}
        >
          <ModalHeader>Add Key Skills</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <FormControl>
                <FormLabel>Key skills</FormLabel>
                <HStack gap={"5px"} flexWrap={"wrap"} mb={"5px"}>
                  {formik.values.keySkills?.map((skill, index) => (
                    <SkillPill
                      index={index}
                      removeSkill={removeSkill}
                      location={skill}
                      key={`skillpill-${skill}-${index}`}
                    />
                  ))}
                </HStack>
                <Input
                  value={skillVal}
                  onKeyDown={handleKeyDown}
                  onChange={(evt) => setSkillVal(evt.target.value)}
                  type="text"
                />
              </FormControl>
            </>
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
              Save skills
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default KeySkills;
