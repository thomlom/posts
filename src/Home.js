import React, { useState } from "react";
import { Link } from "@reach/router";
import { Dialog } from "@reach/dialog";

import { useAuth } from "./AuthProvider";

import Events from "./Events";
import Signin from "./Signin";
import Signout from "./Signout";

function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const { isAuthenticated, user, signin } = useAuth();

  return (
    <div>
      {isAuthenticated && <p>Hello {user.name}</p>}
      <Link to="/create">Create an event</Link>
      <button onClick={() => setShowDialog(true)}>Show dialog</button>
      <Dialog isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <Signin signin={signin} />
      </Dialog>
      <Signout />
      <Events />
    </div>
  );
}

export default Home;
