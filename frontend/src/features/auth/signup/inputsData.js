const inputsData = [
  {
    type: "email",
    label: "Email",
    id: "email",
  },
  {
    type: "password",
    label: "Password",
    id: "password",
  },
  {
    type: "password",
    label: "Confirm Password",
    id: "confirmPassword",
  },
  {
    type: "text",
    label: "First Name",
    id: "firstName",
  },
  {
    type: "text",
    label: "Last Name",
    id: "lastName",
  },
  {
    type: "select",
    label: "Role",
    id: "role",
    options: [
      { value: "professor", label: "Professor" },
      { value: "department_manager", label: "Department Manager" },
      { value: "administrator", label: "Administrator" },
    ],
    placeholder: "Select your role",
  },
];

export { inputsData };
