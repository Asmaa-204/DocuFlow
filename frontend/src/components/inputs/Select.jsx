import styled from "styled-components";
import { HiChevronDown } from "react-icons/hi2";

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 1.2rem 1.6rem 1.2rem 4rem;
  border: 2px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-size: 1.6rem;
  color: var(--color-grey-700);
  appearance: none;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const SelectIcon = styled(HiChevronDown)`
  position: absolute;
  left: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  color: var(--color-grey-400);
  pointer-events: none;
`;

function Select({ placeholder, options = [], value, onChange, ...props }) {
  return (
    <SelectContainer>
      <StyledSelect value={value} onChange={onChange} {...props}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option
              key={option?.id || option.value}
              value={option.id || option.value}
            >
              {option.title || option.label || option.name}
            </option>
          );
        })}
      </StyledSelect>
      <SelectIcon />
    </SelectContainer>
  );
}

export default Select;
