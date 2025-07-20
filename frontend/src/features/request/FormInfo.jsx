import styled from "styled-components";
import Row from "@components/Row";
import { icons } from "@data/icons";

const FormIcon = icons["form"];

function FormInfo({ formName }) {
  return (
    <Row type="vertical" style={{ alignItems: "center", gap: "8px" }}>
      {FormIcon && <FormIcon size={50} />}
      <p
        style={{
          width: "75px",
          wordWrap: "break-word",
          whiteSpace: "normal",
          margin: 0,
          fontSize: 12,
          textAlign: "center",
        }}
      >
        {formName}
      </p>
    </Row>
  );
}

export default FormInfo;
