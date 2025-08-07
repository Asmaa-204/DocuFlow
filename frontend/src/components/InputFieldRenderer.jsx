import React, { useState } from "react";
import styled from "styled-components";
import { withJsonFormsControlProps } from "@jsonforms/react";
import InputField from "@components/InputField";
import { getInputType } from "@utils/getInputType";

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
  const isNumber = schema?.type === "number" || schema?.type === "integer";

  if (!visible) return null;

  return (
    <FieldWrapper>
      <InputField
        id={path}
        type={getInputType(schema)}
        label={uischema?.label || schema?.title}
        placeholder={uischema?.options?.placeholder || ""}
        error={touched && errors}
        value={data || ""}
        onChange={(e) =>
          handleChange(path, isNumber ? Number(e.target.value) : e.target.value)
        }
        onBlur={() => setTouched(true)}
      />
    </FieldWrapper>
  );
}

export default withJsonFormsControlProps(InputFieldRenderer);
