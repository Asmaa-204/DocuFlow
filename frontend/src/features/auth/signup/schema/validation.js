import * as yup from "yup";

const validation = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  role: yup.string().required("Role is required"),
});

export { validation };
