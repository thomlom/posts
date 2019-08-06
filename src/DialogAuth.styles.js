import styled from "styled-components";

export const ButtonLink = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  display: block;
  margin: 0 auto;
  text-decoration: underline;
  color: hsl(210, 22%, 49%);
  cursor: pointer;

  &:hover {
    color: hsl(209, 28%, 39%);
  }
`;
