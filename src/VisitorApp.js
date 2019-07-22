import React from "react";
import { Router } from "@reach/router";

import { useAuth } from "./AuthProvider";
import Signin from "./Signin";
import Signup from "./Signup";

export default function UnauthenticatedApp() {
  const { signin, signup } = useAuth();

  return (
    <Router>
      <Signin default signin={signin} path="/signin" />
      <Signup signup={signup} path="/signup" />
    </Router>
  );
}
