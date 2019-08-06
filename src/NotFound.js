import React from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";

import { Button } from "./shared.styles";

const Container = styled.div`
  text-align: center;

  p {
    font-size: 2.4rem;
    color: hsl(209, 23%, 60%);
  }
`;

function NotFound() {
  return (
    <Container>
      <p>Oops, there's nothing here!</p>
      <Button onClick={() => navigate("/")}>Go back home</Button>
    </Container>
  );
}

export default NotFound;
