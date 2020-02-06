import React from "react";

import error from "./assets/error.svg";

import { Message } from "./shared.styles";

const Loading = () => {
  return (
    <Message>
      <img src={error} alt="Illustration of man in front of a red cross" />
      <p>Oops. Something bad happened!</p>
    </Message>
  );
};

export default Loading;
