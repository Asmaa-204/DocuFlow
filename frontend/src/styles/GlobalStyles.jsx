import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  &.light-mode{}
  &.dark-mode {}
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  user-select: none;
}

body {
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

input,
textarea,
select {
  background-color: inherit;
}

button {  
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}
`;

export default GlobalStyles;