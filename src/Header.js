import React from "react";

import { useAuth } from "./AuthProvider";
import { useDialog } from "./DialogProvider";
import Signout from "./Signout";

function Header() {
  const { isAuthenticated } = useAuth();

  const { openDialog } = useDialog();

  return (
    <header>
      <h1>My events</h1>
      <button onClick={openDialog}>Login/Register</button>
      {isAuthenticated && <Signout />}
    </header>
  );
}

export default Header;
