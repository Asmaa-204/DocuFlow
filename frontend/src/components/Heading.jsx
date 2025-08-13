import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      color: var(--color-grey-800);
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-weight: 600;
      font-size: 1.3rem;
      margin-bottom: 1rem;

      font-size: 1.6rem;
      color: var(--color-grey-700);
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

  text-transform: capitalize;
  line-height: 1.4;
`;

export default Heading;
