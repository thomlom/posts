import React from "react";

import { useAuth } from "./AuthProvider";
import Signin from "./Signin";
import Signup from "./Signup";

export default function UnauthenticatedApp() {
  const { signin, signup } = useAuth();

  return (
    <div>
      <Signin signin={signin} />
      <Signup signup={signup} />
    </div>
  );
}
