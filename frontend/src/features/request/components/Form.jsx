import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';

import InputFieldRenderer from '@components/InputFieldRenderer';
import ActionButtons from '@components/ActionButtons';
import Button from '@components/Button';

import { InputFieldTester } from '../renderers/inputFieldTester';
import useDocData from '../hooks/useDocData';
import { usePatchDoc } from '../hooks/usePatchDoc';
import DocumentPreview from './DocumentPreview';

import { translator as t } from '@data/translations/ar';
import DocxViewer from './DocxViewer';

const Container = styled.div`
  display: flex;
  gap: 2rem;
  width: ${props => (props.$isSideBySide ? '100rem' : '50rem')};
  transition: width 0.3s;
`;

const FormSection = styled.div`
  flex: 1;
  min-width: 48rem;

  & button {
    margin-top: 1.2rem;
  }
`;

const PreviewSection = styled.div`
  flex: 1;
  border-left: 1px solid var(--color-grey-200);
  padding-left: 2rem;
`;

function Form({ onClose, id }) {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isSideBySide, setIsSideBySide] = useState(false);
  const { patchDocument, isPending: isPatching } = usePatchDoc(id);
  const { doc, isPending } = useDocData({ docId: id });

  useEffect(() => {
    if (!isPending && doc) {
      setData(doc.data || {});
    }
  }, [doc, isPending]);




  function handleSaveForm() {
    patchDocument(
      { docData: data, id },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  }


  if (isPending) return;

  return (
    <Container $isSideBySide={isSideBySide}>
      <FormSection>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '1rem',
          }}
        >
          <Button
            $variation="secondary"
            size="small"
            onClick={() => setIsSideBySide(s => !s)}
          >
            {isSideBySide ? t.documents.closePreview : t.documents.sideBySide}
          </Button>
        </div>
        {
          data &&
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
        }
        <ActionButtons
          isCancelDanger={false}
          textSave={t.actions.save}
          textCancel={t.actions.cancel}
          onSave={handleSaveForm}
          onCancel={onClose}
          isSaving={isPatching}
        />
      </FormSection>

      {isSideBySide && (
        <PreviewSection>
          <DocxViewer documentId={id} />
        </PreviewSection>
      )}
    </Container>
  );
}

export default Form;
