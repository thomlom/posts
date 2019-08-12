import React from "react";

import loading from "./assets/loading.svg";

import { Container } from "./Loading.styles";

const Loading = () => {
  return (
    <Container>
      <img src={loading} alt="Illustration of a woman holding a spinner" />
      <p>Loading...</p>
    </Container>
  );
};

export default Loading;
