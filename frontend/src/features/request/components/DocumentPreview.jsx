import styled from "styled-components";
import { HiPrinter, HiXMark } from "react-icons/hi2";
import Spinner from "@components/Spinner";
import { useGetDocPdf } from "../hooks/useGetDocPdf";
import { translator as t } from "@data/translations/ar";
import Button from "@components/Button";

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 50rem;
  gap: 1.2rem;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-200);
`;

const IframeContainer = styled.div`
  flex: 1;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  background-color: var(--color-grey-100);
  position: relative;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-red-700);
  font-size: 1.6rem;
`;

function DocumentPreview({ docId, onClose }) {
    const { url, isPending, error } = useGetDocPdf({ docId });

    function handlePrint() {
        if (!url) return;
        const printWindow = window.open(url, "_blank");
        printWindow.onload = () => {
            printWindow.print();
        };
    }

    if (isPending) return <Spinner />;
    if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

    return (
        <PreviewContainer>
            <Toolbar>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Button $variation="secondary" size="small" onClick={handlePrint} icon={<HiPrinter />}>
                        {t.documents.print}
                    </Button>
                </div>
                {onClose && (
                    <Button $variation="secondary" size="small" onClick={onClose} icon={<HiXMark />}>
                        {t.documents.closePreview}
                    </Button>
                )}
            </Toolbar>
            <IframeContainer>
                <StyledIframe src={url} title="Document Preview" />
            </IframeContainer>
        </PreviewContainer>
    );
}

export default DocumentPreview;
