import * as yup from "yup";

export const regSchema = yup.object().shape({
  gstNumber: yup
          .string()
          .required("Required"),
  contactNumber: yup
          .number()
          .test('len', 'Must be 10 characters', val => val.toString().length === 10)
          .required("Required"), 
  companyDesc: yup
          .string()
          .required("Required"),
  noOfEmployees: yup
          .number()
          .positive("Number must be positive")
          .required("Required"),
  city: yup
        .string()
        .required("Required"),
});
