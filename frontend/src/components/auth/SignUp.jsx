import React from 'react'
import { Box, Button,RadioGroup,Radio,InputRightElement,Stack,Card, Link,Container, Heading, PopoverAnchor,Text,FormControl,Input,FormHelperText,FormLabel, Center, textDecoration, FormErrorMessage, background, InputGroup} from '@chakra-ui/react'
import { useState } from 'react'
import{ViewIcon,ViewOffIcon} from '@chakra-ui/icons'
import {Formik, useFormik } from "formik"
import { authSchema } from '../../schemas/auth';
import {motion} from "framer-motion"

export default function SignUp(props) {
        
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            confirmPassword:""
        },
        validationSchema:authSchema,
        onSubmit:(values,action) =>{
            alert(JSON.stringify(values,null,2));
        },
    });

    const[viewPass,setViewPass] = useState("false")
    const[viewIcon,setViewIcon] = useState("true")
    console.log(formik.errors)

    
  return (
    <Container height="80vh" >
        <Box as={motion.div}  display="flex" flexDirection="column" 
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
                <Button as={motion.button}
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
                        props.onFormSwitch('signIn')
                    }}  
                >sign in</Button>
                <Button
                    as={motion.button}
                    background="#E1EDEC"
                    borderRadius= "32px"
                    fontFamily="Poppins"
                    fontSize="0.9rem"
                    fontWeight="400"
                    lineHeight="18px"
                    height="30px"
                    textAlign:center
                    // initial={{background:"black"}}
                    // animate={{background:"#E1EDEC"}}
                >sign up</Button>
            </Box>

            <Box display = "flex" as="form" flexDirection="column" gap="15px" onSubmit={formik.handleSubmit}> 
                <Text pt="10pxpx" fontSize="32px" fontFamily="Poppins" fontWeight="600">Welcome!</Text>
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

                <FormControl isInvalid={formik.errors.password && formik.touched.password} mt="30px" >
                    <FormLabel color="#666666" 
                        fontFamily="Poppins"
                        fontWeight="400"
                        fontSize="16px"
                        lineHeight="20px"
                    >Password</FormLabel>
                    <InputGroup>
                    
                        <Input type={viewPass?'text' : 'password'} name='password' variant='flushed' borderColor="#666666"
                        focusBorderColor='black' height="2rem" fontSize="18px"
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

                <FormControl isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword} mt="30px">
                    <FormLabel color="#666666" 
                        fontFamily="Poppins"
                        fontWeight="400"
                        fontSize="16px"
                        lineHeight="20px"
                    >Confirm Password </FormLabel>
                    <InputGroup>
                        <Input type={viewPass?'text' : 'password'} name='confirmPassword' variant='flushed' borderColor="#666666"
                        focusBorderColor='black' height="2rem" fontSize="18px"
                        value={formik.values.confirmPassword}
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
                    <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                </Box>
                
                <RadioGroup defaultValue="2">
                <Stack spacing={5} direction="row">
                    <Radio colorScheme="green" value="1">
                    I'm An Employee
                    </Radio>
                    <Radio colorScheme="blue" value="2">
                    I'm An Employer
                    </Radio>
                </Stack>
                </RadioGroup>

                <Button bg="black" 
                height="57px" 
                color="white" type="submit"
                    fontSize= "16px"
                    fontWeight="400"
                    lineHeight="24px"
                    textAlign="center"

                    background="#000000"
                    borderRadius="8px"
                    _hover={{bg:"green.700"}}

                >Sign Up .</Button>
            </Box>
        </Box>

    </Container>
  )
}
