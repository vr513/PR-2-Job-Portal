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

function ProfileSummary({}, profileSummaryRef) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      ref={profileSummaryRef}
      width={"100%"}
      bg={"white"}
      borderRadius={"5px"}
    >
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Profile Summary
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD PROFILE SUMMARY
          </Button>
        </Flex>
        <Text color={"#8F8F8F"}>
          Your Profile Summary should mention the highlights of your career and
          education, what your professional interests are, and what kind of a
          career you are looking for. Write a meaningful summary of more than 50
          characters.
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add Profile Summary</ModalHeader>
          <ModalCloseButton />

          <form>
            <ModalBody>
              <>
                <FormControl>
                  <FormLabel>Profile Summary</FormLabel>
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

export default forwardRef(ProfileSummary);
