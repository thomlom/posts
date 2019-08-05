import React, { useState } from "react";
import styled from "styled-components";
import { navigate, Link } from "@reach/router";

import { useAuth } from "./AuthProvider";
import { useDialog } from "./DialogProvider";

import { Button } from "./shared.styles";

const NavButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: hsl(209, 34%, 30%);
  box-shadow: none;

  @media (max-width: 480px) {
    background-color: hsl(210, 36%, 96%);
  }

  &:hover {
    background-color: hsl(210, 36%, 96%);
  }
`;

const StyledHeader = styled.header`
  padding: 0.75rem 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  @media screen and (min-width: 480px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div:first-of-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  svg {
    width: 4rem;
    height: 4rem;
    cursor: pointer;

    .secondary {
      fill: hsl(209, 34%, 30%);
    }

    @media screen and (min-width: 480px) {
      display: none;
    }
  }
`;

const Title = styled.h1`
  color: hsl(209, 34%, 30%);
  text-transform: uppercase;
  font-size: 2.4rem;
  text-decoration: none;
`;

const StyledNav = styled.nav`
  button:not(:first-child) {
    margin-left: 1rem;
  }

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;

    button {
      background-color: white;
      width: 100%;
      text-align: left;
    }

    button:not(:first-child) {
      margin-top: 1rem;
      margin-left: 0;
    }
  }
`;

function Nav() {
  const { isAuthenticated, isAdmin, signout } = useAuth();
  const { openDialog } = useDialog();

  return (
    <StyledNav>
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
    </StyledNav>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => setIsMenuOpen(isOpen => !isOpen);

  return (
    <StyledHeader>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title>Events</Title>
        </Link>
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-close"
            onClick={toggleMenu}
          >
            <path
              class="secondary"
              fill-rule="evenodd"
              d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-menu"
            onClick={toggleMenu}
          >
            <path
              class="secondary"
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        )}
      </div>
      {isMenuOpen && <Nav />}
    </StyledHeader>
  );
}

export default Header;
