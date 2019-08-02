import React, { useState } from "react";
import styled from "styled-components";
import { Dialog } from "@reach/dialog";

import { useDialog } from "./DialogProvider";
import { useAuth } from "./AuthProvider";

import Signin from "./Signin";
import Signup from "./Signup";

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

const ButtonLink = styled.button`
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

function DialogAuth() {
  const { isOpen, closeDialog } = useDialog();
  const { signin, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  function close() {
    closeDialog();
    setIsLogin(true);
  }

  return (
    <StyledDialog isOpen={isOpen} onDismiss={close}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="icon-close"
        onClick={close}
      >
        <path
          className="secondary"
          fillRule="evenodd"
          d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
        />
      </svg>
      {isLogin ? (
        <Signin closeDialog={close} signin={signin} />
      ) : (
        <Signup closeDialog={close} signup={signup} />
      )}
      {isLogin && (
        <ButtonLink
          onClick={() => setIsLogin(false)}
          style={{ textAlign: "center" }}
        >
          No account? Sign up!
        </ButtonLink>
      )}
    </StyledDialog>
  );
}

export default DialogAuth;
