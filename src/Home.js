import React, { useState } from "react";
import { Link } from "@reach/router";

import { useAuth } from "./AuthProvider";

import AuthModal from "./AuthModal";
import Events from "./Events";
import Signout from "./Signout";

function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {isAuthenticated && <p>Hello {user.name}</p>}
      <Link to="/create">Create an event</Link>
      <button onClick={() => setShowDialog(true)}>Show dialog</button>
      <AuthModal
        isOpen={showDialog}
        onDismiss={() => setShowDialog(false)}
      ></AuthModal>
      <Signout />
      <Events />
    </div>
  );
}

export default Home;
