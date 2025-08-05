import { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";

import InputFieldRenderer from "@components/InputFieldRenderer";

//TODO: get the schemas from backend
import { jsonSchema1, uiSchema1 } from "./forms/form1";
import { InputFieldTester } from "./renderers/inputFieldTester";
import styled from "styled-components";
import ActionButtons from "./ActionButtons";

const Container = styled.div`
  width: 50rem;

  & button {
    margin-top: 1.2rem;
  }
`;

function Form({onClose}) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);

  console.log(errors);

  return (
    <Container>
      <JsonForms
        schema={jsonSchema1}
        uischema={uiSchema1}
        data={data}
        onChange={({ data, errors }) => {
          setData(data);
          setErrors(errors);
        }}
        renderers={[
          ...materialRenderers,
          {
            tester: InputFieldTester,
            renderer: InputFieldRenderer,
          },
        ]}
      />
      <ActionButtons
        isCancelDanger={false}
        textSave="Save"
        textCancel="Cancel"
        onSave={() => {}}
        onCancel={onClose}
      />
    </Container>
  );
}

export default Form;
