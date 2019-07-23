import React, { useState } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

import { useAuth } from "./AuthProvider";
import Signin from "./Signin";
import Signup from "./Signup";

function AuthModal({ children, isLogin = true, ...props }) {
  const [internalIsLogin, setInternalIsLogin] = useState(isLogin);
  const { signin, signup } = useAuth();

  return (
    <Dialog {...props}>
      {internalIsLogin ? (
        <Signin signin={signin} />
      ) : (
        <Signup signup={signup} />
      )}
      {internalIsLogin && (
        <button onClick={() => setInternalIsLogin(false)}>
          No account? Sign up!
        </button>
      )}
    </Dialog>
  );
}

export default AuthModal;
