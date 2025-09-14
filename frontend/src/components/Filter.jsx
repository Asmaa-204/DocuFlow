import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { translator as t } from "@data/translations/ar";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ options, filterBy, resetParams }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams?.get(filterBy) || options?.at(0)?.value;

  function handleClick(value) {
    searchParams.set(filterBy, value);
    resetParams?.map((resetParam) =>
      searchParams.set(resetParam.name, resetParam.value)
    );
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option, index) => (
        <FilterButton
          $active={currentFilter === option.value}
          disabled={currentFilter === option.value}
          key={index}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
