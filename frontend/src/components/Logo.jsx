import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  margin: 0 auto;
  display: block;

  object-fit: contain;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
