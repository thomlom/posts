import React, { useState } from "react";
import { navigate, Link } from "@reach/router";

import { useAuth } from "./AuthProvider";
import { useDialog } from "./DialogProvider";

import IconClose from "./IconClose";
import IconMenu from "./IconMenu";
import { NavButton, StyledHeader, Title, StyledNav } from "./Header.styles";

function Header() {
  const { isAuthenticated, signout } = useAuth();
  const { openDialog } = useDialog();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(isOpen => !isOpen);

  return (
    <StyledHeader>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title>Events</Title>
        </Link>
        {isMenuOpen ? (
          <IconClose onClick={toggleMenu} />
        ) : (
          <IconMenu onClick={toggleMenu} />
        )}
      </div>
      <StyledNav isMenuOpen={isMenuOpen}>
        {isAuthenticated ? (
          <>
            <Link to="/create">
              <NavButton>Add new event</NavButton>
            </Link>
            <NavButton
              onClick={() => {
                signout();
                navigate("/");
              }}
            >
              Sign Out
            </NavButton>
          </>
        ) : (
          <NavButton onClick={openDialog}>Sign In</NavButton>
        )}
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
