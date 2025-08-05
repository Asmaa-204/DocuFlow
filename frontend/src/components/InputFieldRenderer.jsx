import React, { useState } from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import InputField from "@components/InputField";
import styled from "styled-components";

const FieldWrapper = styled.div`
  margin-bottom: 2rem;
`;

function InputFieldRenderer({
  data,
  handleChange,
  path,
  errors,
  required,
  visible,
  schema,
  uischema,
}) {
  const [touched, setTouched] = useState(false);

  if (!visible) return null;

  return (
    <FieldWrapper>
      <InputField
        id={path}
        type={schema.format === "email" ? "email" : "text"}
        label={uischema?.label}
        placeholder={uischema?.options?.placeholder || ""}
        error={touched && errors}
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        onBlur={() => setTouched(true)}
      />
    </FieldWrapper>
  );
}

export default withJsonFormsControlProps(InputFieldRenderer);
