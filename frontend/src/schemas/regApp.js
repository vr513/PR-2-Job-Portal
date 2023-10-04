import * as yup from "yup";

export const regSchema = yup.object().shape({
  gender: yup
    .string()
    .required("Required")
    .matches(/^(male|female)$/, 'Gender must be either "male" or "female"'),
    contactNumber: yup
    .number()
    .test("len", "Must be 10 characters", (val) => val.toString().length === 10)
    .required("Required"),
  currentLocation: yup.string().required("Required"),
});
