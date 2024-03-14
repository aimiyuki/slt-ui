import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background-color: #f0f4f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 5rem;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const NavTitle = styled.div`
  font-size: 1.5rem;
  color: #333;
`;

const NavLinkContainer = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavLinkItem = styled.li`
  margin: 0 15px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
  &:hover {
    color: #007bff;
  }
`;

const Navbar = () => (
  <Nav>
    <div>
      <NavTitle>SLT</NavTitle>
    </div>
    <NavLinkContainer>
      <NavLinkItem>
        <NavLink to="/">Home</NavLink>
      </NavLinkItem>
      <NavLinkItem>
        <NavLink to="/about">Algorithm</NavLink>
      </NavLinkItem>
    </NavLinkContainer>
  </Nav>
);

export default Navbar;
