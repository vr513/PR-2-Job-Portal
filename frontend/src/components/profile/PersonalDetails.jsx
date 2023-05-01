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

function PersonalDetails({}, personalDetailsRef) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      ref={personalDetailsRef}
      width={"100%"}
      bg={"white"}
      borderRadius={"5px"}
    >
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Personal Details
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD PERSONAL DETAILS
          </Button>
        </Flex>
        <Text color={"#8F8F8F"}>
          This information will help the recruiters and Naukri know about your
          current job profile and also your desired job criteria. This will also
          help us personalize your job recommendations.
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
                  <FormLabel>Gender</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Date of birth</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Differently Abled</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Carrer Break</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Work Permit</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Language</FormLabel>
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

export default forwardRef(PersonalDetails);
