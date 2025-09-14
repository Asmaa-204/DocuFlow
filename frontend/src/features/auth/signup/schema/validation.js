import * as yup from "yup";
import { translator as t } from "@data/translations/ar";

const validation = yup.object({
  email: yup
    .string()
    .email(t.validation.invalidEmail)
    .required(t.validation.emailRequired),
  password: yup.string().required(t.validation.passwordRequired),
  confirmPassword: yup
    .string()
    .required(t.validation.passwordRequired)
    .oneOf([yup.ref("password")], t.validation.passwordsMismatch),
  firstName: yup.string().required(t.validation.firstNameRequired),
  lastName: yup.string().required(t.validation.lastNameRequired),
  role: yup.string().required(t.validation.roleRequired),
});

export { validation };
