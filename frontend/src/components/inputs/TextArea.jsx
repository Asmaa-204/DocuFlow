import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: 1.6rem;
  border: 2px solid var(--color-brand-600);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  font-size: 1.4rem;
  color: var(--color-grey-700);
  line-height: 1.6;
  resize: vertical;
  transition: all 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

function TextArea({ placeholder, value, onChange, ...props }) {
  return (
    <StyledTextArea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

export default TextArea;