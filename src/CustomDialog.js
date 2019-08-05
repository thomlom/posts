import React from "react";
import styled from "styled-components";
import { Dialog } from "@reach/dialog";

import "@reach/dialog/styles.css";

const StyledDialog = styled(Dialog)`
  border-radius: 5px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin: 15vh auto;
  background-color: hsl(210, 36%, 96%);

  @media (max-width: 768px) {
    width: 75vw;
  }

  position: relative;

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 4rem;
    height: 4rem;
    cursor: pointer;

    .secondary {
      fill: hsl(209, 34%, 30%);
    }
  }
`;

const CustomDialog = ({ children, onDismiss, ...rest }) => {
  return (
    <StyledDialog onDismiss={onDismiss} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="icon-close"
        onClick={onDismiss}
      >
        <path
          className="secondary"
          fillRule="evenodd"
          d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
        />
      </svg>
      {children}
    </StyledDialog>
  );
};

export default CustomDialog;
