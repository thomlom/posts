import React, { useState } from "react";

import { useDialog } from "./DialogProvider";
import { useAuth } from "./AuthProvider";

import CustomDialog from "./CustomDialog";
import Signin from "./Signin";
import Signup from "./Signup";

import { ButtonLink } from "./DialogAuth.styles";

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
