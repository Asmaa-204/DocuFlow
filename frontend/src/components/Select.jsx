import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  font-weight: 500;

  padding: 0.8rem 1.2rem;

  border-radius: var(--border-radius-sm);
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
`;

function Select({ options, handleChange, ...props }) {
  return (
    <StyledSelect onChange={handleChange} {...props}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
