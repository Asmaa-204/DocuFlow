import styled from "styled-components";

const Form = styled.form`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: min(45rem, 95%);

  background-color: white;
  border-radius: 6px;
  padding: 3rem 4rem;
  box-shadow: 0 10px 40px -14px rgba(0, 0, 0, 0.25);

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export default Form;