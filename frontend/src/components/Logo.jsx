import styled from "styled-components";

const StyledLogo = styled.div`
  padding: 0 2.4rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <h1>📝 DocuFlow</h1>
    </StyledLogo>
  );
}

export default Logo;
