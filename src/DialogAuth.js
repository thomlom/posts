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

  return (
    <StyledDialog
      isOpen={isOpen}
      onDismiss={() => {
        setIsLogin(true);
        closeDialog();
      }}
    >
      {isLogin ? (
        <Signin closeDialog={closeDialog} signin={signin} />
      ) : (
        <Signup closeDialog={closeDialog} signup={signup} />
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
