import * as yup from "yup";
import { translator as t } from "@data/translations/ar";

const validation = yup.object({
  email: yup.string().email(t.validation.invalidEmail).required(t.validation.emailRequired),
  password: yup.string().required(t.validation.passwordRequired),
});

export { validation };
