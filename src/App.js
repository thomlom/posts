import React from "react";
import { Router } from "@reach/router";

import { useAuth } from "./AuthProvider";

import CreateEvent from "./CreateEvent";
import EventDetail from "./EventDetail";
import Home from "./Home";
import NotFound from "./NotFound";

function App() {
  const { isAdmin, isAuthenticated } = useAuth();

  return (
    <Router>
      <Home path="/" />
      {isAdmin && <CreateEvent path="/create" />}
      {isAuthenticated && <EventDetail path="/event/:eventId" />}
      <NotFound default />
    </Router>
  );
}

export default App;
