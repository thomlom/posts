import styled from "styled-components";

import { Button } from "./shared.styles";

export const NavButton = styled(Button)`
  background-color: transparent;
  border: none;
  box-shadow: none;

  color: var(--grey-700);

  &:hover {
    background-color: var(--grey-200);
  }

  &:focus {
    outline: none;
  }
`;

export const StyledHeader = styled.header`
  margin-bottom: var(--m-2);

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
    width: 50px;
    height: 50px;
    cursor: pointer;

    .secondary {
      fill: var(--grey-700);
    }

    @media screen and (min-width: 480px) {
      display: none;
    }
  }
`;

export const Title = styled.h1`
  color: var(--grey-800);
  font-size: var(--text-4xl);
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
`;

export const StyledNav = styled.nav<{ isMenuOpen: boolean }>`
  button:not(:first-child),
  a:not(:first-child) {
    margin-left: var(--m-2);
  }

  @media screen and (max-width: 480px) {
    display: ${props => (props.isMenuOpen ? "flex" : "none")};
    flex-direction: column;

    button {
      background-color: white;
      width: 100%;
      text-align: left;
    }

    a:not(:first-child),
    button:not(:first-child) {
      margin-top: var(--m-2);
      margin-left: 0;
    }
  }
`;
