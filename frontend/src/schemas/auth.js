import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const authSchema = yup.object().shape({
    email:yup.string().email("Please enter a valid email").required("Required"),
    password:yup
        .string()
        .min(5)
        .matches(passwordRules,{message:"Use strong password"})
        .required("Required"),
    
    confirmPassword:yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required("required"),  
})