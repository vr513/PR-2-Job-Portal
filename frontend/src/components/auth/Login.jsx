import {
  Box,
  Button,
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
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useFormik } from "formik";
import { authSchema } from "../../schemas/auth";
import { useAuth } from "../../contexts/AuthContext";

function Login({ toggleForm }) {
  const [viewPass, setViewPass] = useState(false);

  const { login } = useAuth();

  const submitForm = async(formik)=> {
    try{
      const res = await login(formik.values.email,formik.values.password);
      console.log(res);
    }catch(err){
      console.error(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    
    onSubmit: (values, action) => {
      submitForm(formik);
      
    },
  });

  return (
    <Box
      as="form"
      display="flex"
      flexDirection="column"
      gap="15px"
      onSubmit={formik.handleSubmit}
    >
      <Text color={"#000"} pt="10pxpx" fontSize="32px" fontFamily="Poppins" fontWeight="600">
        Welcome Back!{" "}
      </Text>
      <Box>
        <FormControl isInvalid={formik.errors.email && formik.touched.email}>
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
          mt="30px"
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
              size="lg"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              color={'#000'}
            />
            <InputRightElement size="sm" pb="1rem">
              {!viewPass ? (
                <ViewOffIcon
                  as="button"
                  onClick={() => {
                    setViewPass(!viewPass);
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

      <Link alignSelf="flex-end" href="#">
        {" "}
        forgot password
      </Link>

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
        Sign in
      </Button>
    </Box>
  );
}

export default Login;
