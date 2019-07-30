import React from "react";
import styled from "styled-components";
import { navigate, Link } from "@reach/router";

import { useAuth } from "./AuthProvider";
import { useDialog } from "./DialogProvider";

import { Button } from "./shared.styles";

const NavButton = styled(Button)`
  background-color: transparent;
  color: hsl(209, 34%, 30%);
  box-shadow: none;

  &:hover {
    background-color: hsl(210, 36%, 96%);
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const Title = styled.h1`
  color: hsl(209, 34%, 30%);
  text-transform: uppercase;
  font-size: 2.4rem;
  text-decoration: none;
`;

const Nav = styled.nav`
  button:not(:first-child) {
    margin-left: 1rem;
  }
`;

// TODO: ADD HAMBURGER MENU
function Header() {
  const { isAuthenticated, isAdmin, signout } = useAuth();

  const { openDialog } = useDialog();

  return (
    <StyledHeader>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Title>Events</Title>
      </Link>

      <Nav>
        {isAdmin && (
          <Link to="/create">
            <NavButton>Add new event</NavButton>
          </Link>
        )}
        {isAuthenticated ? (
          <NavButton
            onClick={() => {
              signout();
              navigate("/");
            }}
          >
            Sign Out
          </NavButton>
        ) : (
          <NavButton onClick={openDialog}>Sign In</NavButton>
        )}
      </Nav>
    </StyledHeader>
  );
}

export default Header;
