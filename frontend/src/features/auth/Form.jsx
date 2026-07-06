import styled from "styled-components";

const Form = styled.form`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 2.6rem;

  width: min(45rem, 95%);

  background-color: var(--color-grey-0);  
  color: var(--color-grey-700);
  border-radius: 6px;
  padding: 3rem 4rem;
  box-shadow: var(--shadow-lg);             

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
`;

export default Form;
