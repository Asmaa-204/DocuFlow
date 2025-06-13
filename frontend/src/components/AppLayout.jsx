import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";

const StylesAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-width: 120rem;
`;

function AppLayout() {
  return (
    <StylesAppLayout>
      <Sidebar />
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StylesAppLayout>
  );
}

export default AppLayout;
