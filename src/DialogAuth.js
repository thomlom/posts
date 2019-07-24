import React, { useState } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

import { useDialog } from "./DialogProvider";
import { useAuth } from "./AuthProvider";

import Signin from "./Signin";
import Signup from "./Signup";

function DialogAuth() {
  const { isOpen, closeDialog } = useDialog();
  const { signin, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog isOpen={isOpen} onDismiss={closeDialog}>
      {isLogin ? (
        <Signin closeDialog={closeDialog} signin={signin} />
      ) : (
        <Signup closeDialog={closeDialog} signup={signup} />
      )}
      {isLogin && (
        <button onClick={() => setIsLogin(false)}>No account? Sign up!</button>
      )}
    </Dialog>
  );
}

export default DialogAuth;
