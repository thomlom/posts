import React from "react";
import { Link } from "@reach/router";

import { useAuth } from "./AuthProvider";

import Events from "./Events";

function Home() {
  const { isAuthenticated, isAdmin, user } = useAuth();

  return (
    <div>
      {isAuthenticated && <p>Hello {user.name}</p>}
      {isAdmin && <Link to="/create">Create an event</Link>}
      <Events />
    </div>
  );
}

export default Home;
