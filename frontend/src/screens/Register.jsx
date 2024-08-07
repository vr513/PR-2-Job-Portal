import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Button,
  Text,
  Spacer,
  Radio,
  RadioGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Form } from "formik";
import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import banner1 from "../assets/registerBanner_1.png";
import { regSchema } from "../schemas/reg";
import axios from "../utils/axiosConfig";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const { token } = useAuth();
  const navigate = useNavigate();
  const submitForm = async (formik) => {
    try {
      const config = { headers: { Authorization: `JWT ${token}` } };
      const res = await axios.post(
        "/save-employer-details",
        {
          gstNumber: formik.values.gstNumber,
          contactNumber: formik.values.contactNumber,
          companyDescription: formik.values.companyDescription,
          numberOfEmployees: formik.values.numberOfEmployees,
          companyHeadquarters: formik.values.companyHeadquarters,
        },
        config
      );
      console.log(res);
      navigate("./employerDashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      gstNumber: "",
      contactNumber: "",
      companyDescription: "",
      numberOfEmployees: "",
      companyHeadquarters: "",
    },

    validationSchema: regSchema,
    onSubmit: (values, action) => {
      //database stored
      submitForm(formik);
    },
  });

  //styling
  const labelStyles = {
    marginBottom: "4px",
    fontSize: "16px",
    fontWeight: "400",
    _focus: { color: "black", fontWeight: 600 },
    color: "blackGray",
  };
  const uploadStyles = {
    as: "label",
    display: "flex",
    border: "1px",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: "2rem",
    borderRadius: "23px",
    borderColor: "transparent",
    backgroundColor: "#44C6A4",
    textColor: "white",
    _hover: { cursor: "pointer" },
  };
  const uploadLabelStyles = {
    // backgroundColor:"green",
    color: "white",
  };
  const inputStyles = {
    borderColor: "black",
    height: "1.5rem",
    fontSize: "16px",
  };
  const captionStyle = {
    overflowWrap: "break-word",
    wordWrap: "break-word",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    width: "50%",
    marginTop: "20px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500",
    fontStyle: "italic",
  };
  const buttonSliderStyle = {
    width: "70px",
    height: "5px",
    borderColor: "none",
    _selected: {
      color: "black",
    },
  };

  return (
    <Flex>
      <Box bg="primary" width="100vw" height="100vh" fontFamily="poppins">
        <HStack
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          height="100%"
        >
          <Box width="35%" marginLeft="5%">
            <Heading fontFamily="poppins" fontSize="3rem" marginTop="2rem">
              COMMIT
            </Heading>
            <Heading
              fontFamily="poppins"
              fontSize="1.5rem"
              marginTop="2rem"
              marginBottom="0.5rem"
            >
              Register
            </Heading>
            <>
              //this is the form:
              <Box
                as="form"
                onSubmit={formik.handleSubmit}
                display="flex"
                flexDirection="column"
                gap="10px"
              >
                <FormControl
                  isInvalid={
                    formik.errors.gstNumber && formik.touched.gstNumber
                  }
                >
                  <HStack
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel sx={labelStyles}>GST Number</FormLabel>
                    <FormErrorMessage fontSize="14px">
                      {formik.errors.gstNumber}
                    </FormErrorMessage>
                  </HStack>
                  <Input
                    type="String"
                    sx={inputStyles}
                    variant="flushed"
                    focusBorderColor="black"
                    name="gstNumber"
                    value={formik.values.gstNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.errors.contactNumber && formik.touched.contactNumber
                  }
                >
                  <HStack
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel sx={labelStyles}>Contact Number</FormLabel>
                    <FormErrorMessage fontSize="14px">
                      {formik.errors.contactNumber}
                    </FormErrorMessage>
                  </HStack>

                  <Input
                    type="number"
                    sx={inputStyles}
                    variant="flushed"
                    focusBorderColor="black"
                    name="contactNumber"
                    value={formik.values.contactNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.errors.companyDescription &&
                    formik.touched.companyDescription
                  }
                >
                  <HStack
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel sx={labelStyles}>Company Description</FormLabel>
                    <FormErrorMessage fontSize="14px">
                      {formik.errors.companyDescription}
                    </FormErrorMessage>
                  </HStack>

                  <Input
                    type="text"
                    sx={inputStyles}
                    variant="flushed"
                    focusBorderColor="black"
                    name="companyDescription"
                    value={formik.values.companyDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.errors.numberOfEmployees &&
                    formik.touched.numberOfEmployees
                  }
                >
                  <HStack
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel sx={labelStyles}>No. of Employees </FormLabel>
                    <FormErrorMessage fontSize="14px">
                      {formik.errors.numberOfEmployees}
                    </FormErrorMessage>
                  </HStack>

                  <Input
                    type="number"
                    sx={inputStyles}
                    variant="flushed"
                    focusBorderColor="black"
                    name="numberOfEmployees"
                    value={formik.values.numberOfEmployees}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.errors.companyHeadquarters &&
                    formik.touched.companyHeadquarters
                  }
                >
                  <HStack
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel sx={labelStyles}>City </FormLabel>
                    <FormErrorMessage fontSize="14px">
                      {formik.errors.companyHeadquarters}
                    </FormErrorMessage>
                  </HStack>

                  <Input
                    type="text"
                    sx={inputStyles}
                    variant="flushed"
                    focusBorderColor="black"
                    name="companyHeadquarters"
                    value={formik.values.companyHeadquarters}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel sx={labelStyles} mt="10px" pb={2}>
                    Profile Picture
                  </FormLabel>
                  <Box>
                    <HStack bgColor="#1C2438" borderRadius="23px" width="100%">
                      <Box as="label" sx={uploadStyles}>
                        <Input
                          display="none"
                          overflow="hidden"
                          type="file"
                          accept="image/*"
                          multiple={false}
                          onChange={handleFileInput}
                        />
                        <span>Upload Image</span>
                      </Box>
                      <Box sx={uploadLabelStyles}>
                        {selectedFile ? (
                          <span>{selectedFile.name}</span>
                        ) : (
                          <span>JPEG,JPEG,PNG|Max:2MB</span>
                        )}
                      </Box>
                    </HStack>
                  </Box>
                </FormControl>

                <Box
                  fontSize="14px"
                  display="flex"
                  justifyContent="center"
                  marginTop="10"
                >
                  By clicking Register, you agree to the&nbsp;
                  <a href="#">Terms and Conditions & Privacy Policy</a>
                </Box>
                <Button
                  type="submit"
                  borderRadius="5px"
                  bg="black"
                  height="57px"
                  color="white"
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="24px"
                  textAlign="center"
                  background="#000000"
                  _hover={{ bg: "black" }}
                >
                  Register Now
                </Button>
              </Box>
            </>
          </Box>

          <Box
            width="30%"
            alignSelf="center"
            display="flex"
            height="90%"
            borderRadius="14px"
            bgImage={banner1}
            flexDirection="column"
            // backgroundSize= "contain"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            overflow=""
          >
            <Text sx={captionStyle}>caption</Text>
            <Spacer></Spacer>

            <HStack
              width="50"
              display="flex"
              justifyContent="center"
              marginBottom="5%"
              gap={1}
            >
              <Button sx={buttonSliderStyle} bg="black" value="1"></Button>
              <Button sx={buttonSliderStyle} bg="white" value="2"></Button>
              <Button sx={buttonSliderStyle} bg="white" value="3"></Button>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Register;
