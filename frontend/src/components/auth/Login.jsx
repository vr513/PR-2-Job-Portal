import { Box, Button, Card, Link,Container, Heading, PopoverAnchor,Text,FormControl,Input,FormHelperText,FormLabel, Center, textDecoration, FormErrorMessage, Icon, InputGroup, InputLeftElement, InputRightElement} from '@chakra-ui/react'
import React from 'react'
import{ViewIcon,ViewOffIcon} from '@chakra-ui/icons'
import { useState } from 'react';
import SignUp from './SignUp';
import {Formik, useFormik } from "formik"
import { authSchema } from '../../schemas/auth';

function Login(props) {

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema:authSchema,
        onSubmit:(values,action) =>{
            alert(JSON.stringify(values,null,2));
        },
        });
    
    const[viewPass,setViewPass] = useState("false")
    const[viewIcon,setViewIcon] = useState("true")
    console.log(viewIcon)
return (
    <Container height="80vh">
        <Box display="flex" flexDirection="column" 
        justifyContent="center"
         bg="white" borderRadius= "22px"  
            gap="1rem"
            padding="40px"
            outline="0"

            // outlineColor="black"
            // outlineStyle="solid"
            // borderColor="black"
        >
           
            <Box  as="div"display="flex" bg="black" width="40%" justifyContent="space-evenly"
                background="#E1EDEC"
                borderRadius="32px"
            >
                <Button isDisabled
                    backgroun="#E1EDEC"
                    borderRadius= "32px"
                    fontFamily="Poppins"
                    fontSize="0.9rem"
                    fontWeight="400"
                    lineHeight="18px"
                    height="30px"
                    _hover={{cursor:"default"}}
                >sign in</Button>
                <Button
                    color="white"
                    background="#000000"
                    borderRadius= "1rem"
                    fontFamily="Poppins"
                    fontSize="0.9rem"
                    fontWeight="400"
                    lineHeight="18px"
                    width="87px"
                    height="30px"
                    _hover={{bg:"green.700"}}
                    onClick={()=>{
                       props.onFormSwitch('signUp')
                    }}
                >sign up</Button>
            </Box>
            <Formik >
                <Box as="form" display = "flex" flexDirection="column" gap="15px" onSubmit={formik.handleSubmit}> 
                    <Text pt="10pxpx" fontSize="32px" fontFamily="Poppins" fontWeight="600">Welcome Back! </Text>
                    <Box>

                    <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                        <FormLabel color="#666666" 
                                    fontFamily="Poppins"
                                    fontWeight="400"
                                    fontSize="16px"
                                    lineHeight="20px"
                        >Email address</FormLabel>
                            {/* <Input type='email' border="1px" borderStyle="none none solid none" borderRadius="0px" outline="0"
                            />  */}

                        <Input type='email' name='email' variant='flushed' color="black" borderColor="#666666" height="2rem"
                        focusBorderColor='black' fontSize="18px"

                        value={formik.values.email}
                        onChange={formik.handleChange}                        
                        onBlur={formik.handleBlur}

                        />
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.password && formik.touched.password} mt="30px">
                        <FormLabel color="#666666" 
                            fontFamily="Poppins"
                            fontWeight="400"
                            fontSize="16px"
                            lineHeight="20px"
                        >Password</FormLabel>
                        <InputGroup> 
                            <Input type={viewPass?'text' : 'password'}
                            name='password' variant='flushed' borderColor="#666666"
                            focusBorderColor='black' height="2rem" fontSize="18px" size="lg"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                            <InputRightElement size="sm" pb="1rem">
                                    {viewIcon? 
                                    <ViewOffIcon  as="button" onClick={()=>{
                                        setViewPass(!viewPass)
                                        setViewIcon(!viewIcon)
                                    }}
                                    _hover={{   
                                                cursor:"pointer"
                                            }}

                                    boxSize="25" color="black"
                                    /> :
                                    <ViewIcon as="button" onClick={()=>{
                                        setViewPass(!viewPass)
                                        setViewIcon(!viewIcon)
                                    }}
                                    _hover={{   
                                                cursor:"pointer"
                                            }}
                                    boxSize="25" color="black"
                                    /> 
                                    }
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>
                    </Box>

                    <Link alignSelf="flex-end" href='#'> forgot password</Link>

                    <Button bg="black" 
                    height="57px" 
                    color="white" 
                    type="submit"
                        fontSize= "16px"
                        fontWeight="400"
                        lineHeight="24px"
                        textAlign="center"

                        background="#000000"
                        borderRadius="8px"
                        _hover={{bg:"green.700"}}

                    >Sign in</Button>
                </Box>
            </Formik>
        </Box>

    </Container>
  )
}

export default Login