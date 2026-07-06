import { renderAsync } from 'docx-preview';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { translator as t } from '@data/translations/ar';
import { Toolbar } from '@mui/material';
import Button from '@components/Button';
import { HiPrinter, HiXMark } from 'react-icons/hi2';
import { useGetDocPdf } from '../hooks/useGetDocPdf';
import Spinner from '@components/Spinner';

const PreviewContainer = styled.div`
  width: 52rem;
  height: 500px;
  overflow: auto;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

const DocxContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding-left: 20px;
  section {
    margin: 0 auto !important;

    /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important; */
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-red-700);
  font-size: 1.6rem;
`;

function DocxViewer({ documentId, onClose }) {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const { url, blob, isPending, error } = useGetDocPdf({ docId: documentId });

  function handlePrint() {
    if (!url) return;
    const printWindow = window.open(url, '_blank');
    printWindow.onload = () => {
      printWindow.print();
    };
  }

  useEffect(() => {
    const load = async () => {
      if (!blob || !containerRef.current) return;

      await renderAsync(blob, containerRef.current, null, {
        className: 'docx-viewer',
        inWrapper: false,
        ignoreWidth: false,
        ignoreHeight: false,
        ignoreFonts: false,
        breakPages: true,
        useBase64URL: true,
      });

      // Scale to fit container width
      const section = containerRef.current?.querySelector('section');
      if (section && wrapperRef.current) {
        const docWidth = section.scrollWidth;
        const containerWidth = wrapperRef.current.clientWidth;
        const scale = containerWidth / docWidth;

        containerRef.current.style.transform = `scale(${scale})`;
        containerRef.current.style.transformOrigin = 'top center';
        containerRef.current.style.width = `${100 / scale}%`;
        containerRef.current.style.marginLeft = '0';
      }
    };

    load();
  }, [documentId, blob]);

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return (
    <PreviewContainer>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: 'var(--color-grey-300)',
        }}
      >
        <Button
          $variation="secondary"
          size="small"
          onClick={handlePrint}
          icon={<HiPrinter />}
        >
          {t.documents.print}
        </Button>

        {onClose && (
          <Button
            $variation="secondary"
            size="small"
            onClick={onClose}
            icon={<HiXMark />}
          >
            {t.documents.closePreview}
          </Button>
        )}
      </Toolbar>
      <DocxContainer ref={wrapperRef}>
        <div ref={containerRef} />
      </DocxContainer>
    </PreviewContainer>
  );
}

export default DocxViewer;
