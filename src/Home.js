import React from "react";
import { Link } from "@reach/router";

import { useAuth } from "./AuthProvider";
import { useDialog } from "./DialogProvider";

import Events from "./Events";
import Signout from "./Signout";

function Home() {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const { openDialog } = useDialog();

  return (
    <div>
      {isAuthenticated && <p>Hello {user.name}</p>}
      {isAdmin && <Link to="/create">Create an event</Link>}
      <button onClick={openDialog}>Login/Register</button>
      {isAuthenticated && <Signout />}
      <Events />
    </div>
  );
}

export default Home;
