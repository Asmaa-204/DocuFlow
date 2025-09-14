import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

import { PAGE_SIZE } from "@utils/consts";
import { translator as t } from "@data/translations/ar";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ numResults }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const numPages = Math.ceil(numResults / PAGE_SIZE);

  const first = (currentPage - 1) * PAGE_SIZE + 1;
  const last =
    first + PAGE_SIZE - 1 > numResults ? numResults : first + PAGE_SIZE - 1;

  function getNext() {
    const nexPage = currentPage === numPages ? numPages : currentPage + 1;
    searchParams.set("page", nexPage);
    setSearchParams(searchParams);
  }

  function getPrevious() {
    const prevPage = currentPage === 1 ? 1 : currentPage - 1;
    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }

  if (PAGE_SIZE >= numResults) return null;

  return (
    <StyledPagination>
      <Buttons>
        <PaginationButton disabled={currentPage === numPages} onClick={getNext}>
          <HiChevronRight />
          <span>{t.pagination.next}</span>
        </PaginationButton>

        <PaginationButton disabled={currentPage === 1} onClick={getPrevious}>
          <span>{t.pagination.previous}</span>
          <HiChevronLeft />
        </PaginationButton>
      </Buttons>

      <P>
        {t.pagination.showing} <span>{first}</span> {t.pagination.to}{" "}
        <span>{last}</span> {t.pagination.of} <span>{numResults}</span>{" "}
        {t.pagination.results}
      </P>
    </StyledPagination>
  );
}

export default Pagination;
