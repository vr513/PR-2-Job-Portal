import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";

function ResumeHeadline() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width={"100%"} bg={"white"} borderRadius={"5px"}>
      <Flex flexDir={"column"} gap={"0.5rem"} p={"1rem"} height={"15vh"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"22px"} fontWeight="600">
            Resume Headline
          </Text>
          <Button onClick={onOpen} bg="none" color={"secondary"} fontSize={"16px"}>
            ADD RESUME HEADLINE
          </Button>
        </Flex>
        <Text>
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
          <ModalBody>
            <Input type="text"/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button  colorScheme="green">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ResumeHeadline;
