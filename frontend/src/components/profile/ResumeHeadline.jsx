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

function ResumeHeadline({}, resumeHeadlineRef) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      ref={resumeHeadlineRef}
      width={"100%"}
      bg={"white"}
      borderRadius={"5px"}
    >
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Resume Headline
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD RESUME HEADLINE
          </Button>
        </Flex>
        <Text color={"#8F8F8F"}>
          It is the first thing recruiters notice in your profile. Write
          concisely what makes you unique and right person for the job you
          looking for
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add Resume Headline</ModalHeader>
          <ModalCloseButton />

          <form>
            <ModalBody>
              <>
                <FormControl>
                  <FormLabel>Resume headline</FormLabel>
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

export default forwardRef(ResumeHeadline);
