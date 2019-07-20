import React from "react";

import { useAuth } from "./AuthProvider";

function Signout() {
  const { signout } = useAuth();
  return <button onClick={signout}>Sign Out</button>;
}

export default Signout;
