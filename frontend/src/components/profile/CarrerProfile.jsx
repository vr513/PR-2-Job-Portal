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

function CarrerProfile({}, carrerProfileRef) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      ref={carrerProfileRef}
      width={"100%"}
      bg={"white"}
      borderRadius={"5px"}
    >
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Carrer Profile
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD Carrer Profile
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
                  <FormLabel>Current Industry</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Desired Job Type</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Prefered Shift</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Expected Salary</FormLabel>
                  <Input type="number" />
                </FormControl>
                <FormControl>
                  <FormLabel>Department</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Desired Employment Type</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Preferred Work Location</FormLabel>
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

export default forwardRef(CarrerProfile);
