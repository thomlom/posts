import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Button } from "./shared.styles";

const Container = styled.div`
  text-align: center;

  p {
    font-size: var(--text-2xl);
    font-weight: 500;
    color: var(--grey-600);
  }
`;

const NotFound = () => {
  const history = useHistory();
  return (
    <Container>
      <p>Oops, there's nothing here!</p>
      <Button onClick={() => history.push("/")}>Go back home</Button>
    </Container>
  );
};

export default NotFound;
