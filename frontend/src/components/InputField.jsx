import styled from "styled-components";
import Select from "./inputs/Select";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & input,
  & select {
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);
  }

  & input:focus,
  & select:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s;
  background-color: var(--color-grey-0);

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }
`;

const Label = styled.label`
  display: block;
  text-transform: capitalize;
  color: var(--color-grey-700);
  font-weight: 500;
`;

const Error = styled.p`
  color: var(--color-red-700);
  font-size: 1.2rem;
  margin-top: 0.25rem;
`;

function InputField({
  id,
  error,
  type,
  register,
  validate,
  label,
  placeholder,
  options = [],
  ...props
}) {
  return (
    <Container $error={!!error}>
      {label && <Label htmlFor={id}>{label}</Label>}

      {type === "textArea" ? (
        <TextArea
          {...register?.(id, { validate })}
          id={id}
          aria-invalid={!!error}
          autoComplete="on"
          placeholder={placeholder}
        />
      ) : type === "select" ? (
        <Select
          {...register?.(id, { validate })}
          id={id}
          aria-invalid={!!error}
          options={options}
          placeholder={placeholder}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder || "Select..."}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      ) : (
        <input
          {...register?.(id, { validate })}
          {...props}
          type={type}
          id={id}
          aria-invalid={!!error}
          autoComplete="on"
          placeholder={placeholder}
        />
      )}

      {error && <Error>{error}</Error>}
    </Container>
  );
}

export default InputField;
export { Label, Error };
