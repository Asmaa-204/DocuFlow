import { translator as t } from "@data/translations/ar";

const inputsData = [
  {
    type: "email",
    label: t.user.email,
    id: "email",
    placeholder: "example@cu.edu.eg",
  },
  {
    type: "password",
    label: t.user.password,
    id: "password",
    placeholder: t.auth.enterPassword,
  },
  {
    type: "password",
    label: t.user.confirmPassword,
    id: "confirmPassword",
    placeholder: t.auth.reenterPassword,
  },
  {
    type: "text",
    label: t.user.firstName,
    id: "firstName",
    placeholder: t.auth.enterFirstName,
  },
  {
    type: "text",
    label: t.user.lastName,
    id: "lastName",
    placeholder: t.auth.enterLastName,
  },
  {
    type: "select",
    label: t.user.role,
    id: "role",
    options: [
      { value: "professor", label: t.user.professor },
      { value: "department_manager", label: t.user.departmentManager },
      { value: "administrator", label: t.user.administrator },
    ],
    placeholder: t.auth.selectRole,
  },
];

export { inputsData };
