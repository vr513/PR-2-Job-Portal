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

function KeySkills({}, keySKillsRef) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box ref={keySKillsRef} width={"100%"} bg={"white"} borderRadius={"5px"}>
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
          {/* hi i am tejas sanap */}
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add Key Skills</ModalHeader>
          <ModalCloseButton />

          <form>
            <ModalBody>
              <>
                <FormControl>
                  <FormLabel>Key skills</FormLabel>
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

export default forwardRef(KeySkills);
