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
} from "@chakra-ui/react";
import { Formik } from "formik";
import React, { forwardRef } from "react";
import { ref } from "yup";

function ItSkills({},itSkillsRef) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box ref={itSkillsRef} width={"100%"} bg={"white"} borderRadius={"5px"}>
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            IT Skills 
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD DETAILS
          </Button>
        </Flex>
        <Text  color={"#8F8F8F"}>
          Specify details about programming languages (such as Java, Python,
          C/C++, Oracle, SQL etc), softwares (Microsoft Word, Excel, Tally etc)
          or any other software related knowledge.
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add IT Skills</ModalHeader>
          <ModalCloseButton />

          <form>
            <ModalBody>
              <>
                {" "}
                <FormControl>
                  <FormLabel>SKills</FormLabel>
                  <Input type="text" />
                </FormControl>
              </>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" type="submit">
                save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default forwardRef(ItSkills);
