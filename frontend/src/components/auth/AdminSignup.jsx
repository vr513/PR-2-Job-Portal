import React from "react";
import {
  Box,
  Button,
  RadioGroup,
  Radio,
  InputRightElement,
  Stack,
  Card,
  Link,
  Container,
  Heading,
  PopoverAnchor,
  Text,
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
  Center,
  textDecoration,
  FormErrorMessage,
  background,
  InputGroup,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, useFormik } from "formik";
import { authSchema } from "../../schemas/auth";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminSignup({ toggleForm }) {
  const [viewPass, setViewPass] = useState(false);
  const [viewIcon, setViewIcon] = useState(false);
  const [alertStatus, setAlertStatus] = useState("success");
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Temp");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (formik) => {
    setShowAlert(false);
    try {
      const res = await signup(
        formik.values.email,
        formik.values.password,
        formik.values.name,
        formik.values.role
      );

      if (res.status < 200 || res.status > 300) {
        setAlertStatus("error");
        setAlertTitle(res.data.err);
      } else {
        setAlertStatus("success");
        setAlertTitle(res.data.message);
      }
      setShowAlert(true);
      navigate("/");
    } catch (err) {
      setAlertStatus("error");
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      role: "admin",
    },

    onSubmit: (values, action) => {
      submitForm(formik);
    },
  });

  return (
    <Box
      display="flex"
      as="form"
      flexDirection="column"
      gap="15px"
      onSubmit={formik.handleSubmit}
    >
      <Text
        color={"#000"}
        pt="10pxpx"
        fontSize="32px"
        fontFamily="Poppins"
        fontWeight="600"
      >
        Welcome!
      </Text>
      {showAlert && (
        <Alert borderRadius={"10px"} status={alertStatus}>
          <AlertIcon />
          <AlertTitle>{alertTitle}</AlertTitle>
        </Alert>
      )}
      <Box>
        <FormControl isInvalid={formik.errors.name && formik.touched.name}>
          <FormLabel
            color="#666666"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="16px"
            lineHeight="20px"
          >
            Name
          </FormLabel>
          <Input
            type="text"
            name="name"
            variant="flushed"
            color="black"
            borderColor="#666666"
            height="2rem"
            focusBorderColor="black"
            fontSize="18px"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          mt="10px"
          isInvalid={formik.errors.email && formik.touched.email}
        >
          <FormLabel
            color="#666666"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="16px"
            lineHeight="20px"
          >
            Email address
          </FormLabel>
          {/* <Input type='email' border="1px" borderStyle="none none solid none" borderRadius="0px" outline="0"
                        />  */}

          <Input
            type="email"
            name="email"
            variant="flushed"
            color="black"
            borderColor="#666666"
            height="2rem"
            focusBorderColor="black"
            fontSize="18px"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={formik.errors.password && formik.touched.password}
          mt="10px"
        >
          <FormLabel
            color="#666666"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="16px"
            lineHeight="20px"
          >
            Password
          </FormLabel>
          <InputGroup>
            <Input
              type={viewPass ? "text" : "password"}
              name="password"
              variant="flushed"
              borderColor="#666666"
              focusBorderColor="black"
              height="2rem"
              fontSize="18px"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputRightElement size="sm" pb="1rem">
              {viewIcon ? (
                <ViewOffIcon
                  as="button"
                  onClick={() => {
                    setViewPass(!viewPass);
                    setViewIcon(!viewIcon);
                  }}
                  _hover={{
                    cursor: "pointer",
                  }}
                  boxSize="25"
                  color="black"
                />
              ) : (
                <ViewIcon
                  as="button"
                  onClick={() => {
                    setViewPass(!viewPass);
                    setViewIcon(!viewIcon);
                  }}
                  _hover={{
                    cursor: "pointer",
                  }}
                  boxSize="25"
                  color="black"
                />
              )}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
      </Box>
      <Button
        bg="black"
        height="57px"
        color="white"
        type="submit"
        fontSize="16px"
        fontWeight="400"
        lineHeight="24px"
        textAlign="center"
        background="#000000"
        borderRadius="8px"
        _hover={{ bg: "green.700" }}
      >
        Register as Admin
      </Button>
    </Box>
  );
}
