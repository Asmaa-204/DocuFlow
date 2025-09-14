import { NavLink } from "react-router-dom";
import styled from "styled-components";

const CallToAction = styled(NavLink)`
  position: relative;
  color: var(--color-brand-600);
  font-weight: 600;
  text-decoration: none;
  padding-bottom: 2px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-brand-600);
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: var(--color-brand-700);
  }

  &.active {
    color: var(--color-brand-800);
    font-weight: 700;
  }
`;

export default CallToAction;
