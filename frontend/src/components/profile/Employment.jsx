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

function Employement({}, employmentRef) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box ref={employmentRef} width={"100%"} bg={"white"} borderRadius={"5px"}>
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Employement
          </Text>
          <Button
            onClick={onOpen}
            bg="none"
            color={"secondary"}
            fontSize={"16px"}
          >
            ADD EMPLOYEMENT
          </Button>
        </Flex>
        <Text color={"#8F8F8F"}>
          Mention your employment details including your current and previous
          company work experience.
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add Employement details</ModalHeader>
          <ModalCloseButton />

          <form>
            <ModalBody>
              <>
                <Flex direction={"column"} gap={"2rem"}>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input type="text" />

                    <FormLabel>Experience since </FormLabel>
                    <Input type="date" />
                  </FormControl>

                  {/* 
                  <FormControl>
                    <FormLabel>Past Experience</FormLabel>
                    <Input type="text" />
                  </FormControl> */}
                </Flex>
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

export default forwardRef(Employement);
