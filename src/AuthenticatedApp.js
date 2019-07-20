import React from "react";
import { Router } from "@reach/router";

import Home from "./Home";
import CreateEvent from "./CreateEvent";

function AuthenticatedApp() {
  return (
    <Router>
      <Home path="/" />
      <CreateEvent path="/create" />
    </Router>
  );
}

export default AuthenticatedApp;
