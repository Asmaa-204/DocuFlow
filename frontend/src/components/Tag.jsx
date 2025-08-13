import styled, { css } from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.$type}-700);
  background-color: var(--color-${(props) => props.$type}-100);

  ${(props) =>
    props.$version === "icons" &&
    css`
      padding: 0.4rem;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      text-transform: none;
    `}
`;

Tag.defaultProps = {
  $version: "text",
};

export default Tag;
