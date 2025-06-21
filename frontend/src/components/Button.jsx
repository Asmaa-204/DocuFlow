import styled, { css } from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  padding: 1rem 1.6rem;
  background-color: var(--color-brand-600);
  color: var(--color-grey-0);

  border: none;
  border-radius: 5px;

  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: var(--color-brand-700);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: var(--color-grey-300);
    color: var(--color-grey-500);
    cursor: not-allowed;
  }

  &:hover:disabled {
    background-color: var(--color-grey-300);
    transform: none;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  ${(props) =>
    props.$variation === "primary" &&
    css`
      background-color: var(--color-brand-700);

      &:hover {
        background-color: var(--color-brand-800);
      }
    `};

  ${(props) =>
    props.$variation === "secondary" &&
    css`
      background-color: var(--color-blue-700);

      &:hover {
        background-color: var(--color-blue-800);
      }
    `};

  ${(props) =>
    props.$variation === "danger" &&
    css`
      background-color: var(--color-red-700);

      &:hover {
        background-color: var(--color-red-800);
      }
    `};
`;

function Button({ children, onClick, ...props }) {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
