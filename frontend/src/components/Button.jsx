import styled, { css } from 'styled-components';
import SpinnerMini from './SpinnerMini';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  padding: 1rem 1.6rem;
  background-color: var(--color-brand-600);
  color: var(--color-brand-100);

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
  ${props =>
    props.$variation === 'primary' &&
    css`
      background-color: var(--color-brand-700);
      color: var(--color-grey-0);
      font-size: 1.6rem;

      &:hover {
        background-color: var(--color-brand-800);
      }
    `};

  ${props =>
    props.$variation === 'secondary' &&
    css`
      background-color: var(--color-blue-700);
      color: var(--color-grey-0);

      &:hover {
        background-color: var(--color-blue-800);
      }
    `};

  ${props =>
    props.$variation === 'danger' &&
    css`
      background-color: var(--color-red-700);

      &:hover {
        background-color: var(--color-red-800);
      }
    `};

  ${props => sizes[props.$size]}
`;

function Button({ children, disabled = false, onClick, loading = false, $size = "medium", ...props }) {
  return (
    <StyledButton $size={$size} onClick={onClick} disabled={loading || disabled} {...props}>
      {loading ? <SpinnerMini /> : (props.icon ? props.icon : null)}
      {children}
    </StyledButton>
  );
}

export default Button;
