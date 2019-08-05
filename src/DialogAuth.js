import React, { useState } from "react";
import styled from "styled-components";

import { useDialog } from "./DialogProvider";
import { useAuth } from "./AuthProvider";

import CustomDialog from "./CustomDialog";
import Signin from "./Signin";
import Signup from "./Signup";

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
    <CustomDialog isOpen={isOpen} onDismiss={close}>
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
    </CustomDialog>
  );
}

export default DialogAuth;
