import styled from "styled-components";

import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 2rem;
`;

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
