import styled from "styled-components";

import { Button } from "./shared.styles";

export const NavButton = styled(Button)`
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

export const StyledHeader = styled.header`
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

export const Title = styled.h1`
  color: hsl(209, 34%, 30%);
  text-transform: uppercase;
  font-size: 2.4rem;
  text-decoration: none;
`;

export const StyledNav = styled.nav`
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
