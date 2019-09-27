import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "./AuthProvider";

import IconClose from "./IconClose";
import IconMenu from "./IconMenu";
import { NavButton, StyledHeader, Title, StyledNav } from "./Header.styles";

function Header() {
  const { isAuthenticated, signout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(isOpen => !isOpen);

  return (
    <StyledHeader>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title>Posts</Title>
        </Link>
        {isMenuOpen ? (
          <IconClose onClick={toggleMenu} />
        ) : (
          <IconMenu onClick={toggleMenu} />
        )}
      </div>
      <StyledNav isMenuOpen={isMenuOpen}>
        <Link to="/">
          <NavButton>All Posts</NavButton>
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/create">
              <NavButton>New post</NavButton>
            </Link>
            <NavButton onClick={() => signout()}>Sign Out</NavButton>
          </>
        ) : (
          <>
            <Link to="/signin">
              <NavButton>Sign In</NavButton>
            </Link>
            <Link to="/signup">
              <NavButton>Sign Up</NavButton>
            </Link>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
