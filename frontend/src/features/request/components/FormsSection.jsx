import styled from "styled-components";
import Row from "@components/Row";
import Heading from "@components/Heading";
import FormInfo from "./FormInfo";

import { translator as t } from "@data/translations/ar";

const CardDiv = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid #f5f5f5;
  position: relative;
  width: 100%;

  &:last-of-type {
    border-bottom: none;
  }
`;

// TODO: use the forms coming from backend when they are available
const forms = [
  "Form1",
  "Form2",
  "Form3",
  "Form2",
  "Form3",
  "Form2",
  "Form3",
  "Form2",
  "Form3",
  "Form2",
  "Form3",
  "Form2",
  "Form3",
];

function FormsSection({ heading = "h3" }) {
  return (
    <CardDiv>
      <Heading as={heading}>{t.documents.forms}</Heading>
      <Row
        type="horizontal"
        style={{
          overflowX: "auto",
        }}
      >
        {forms.map((form, index) => (
          <FormInfo key={index} formName={form} />
        ))}
      </Row>
    </CardDiv>
  );
}

export default FormsSection;
