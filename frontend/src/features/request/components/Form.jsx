import { useEffect, useState } from "react";
import styled from "styled-components";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";

import InputFieldRenderer from "@components/InputFieldRenderer";
import ActionButtons from "@components/ActionButtons";

import { InputFieldTester } from "../renderers/inputFieldTester";
import useDocData from "../hooks/useDocData";
import { usePatchDoc } from "../hooks/usePatchDoc";

const Container = styled.div`
  width: 50rem;

  & button {
    margin-top: 1.2rem;
  }
`;

function Form({ onClose, id }) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);
  const { patchDocument } = usePatchDoc();
  const { doc, isPending } = useDocData({ docId: id });

  useEffect(() => {
    if (isPending) return;
    setData(doc.data);
  }, [doc]);

  function handleSaveForm() {
    patchDocument(
      { docData: data, id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  }

  if (isPending) return;

  return (
    <Container>
      <JsonForms
        schema={doc?.template?.schema}
        uischema={doc?.template?.uiSchema}
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
        onSave={handleSaveForm}
        onCancel={onClose}
      />
    </Container>
  );
}

export default Form;
