import React from "react";
import { Router } from "@reach/router";

import { useAuth } from "./AuthProvider";

import CreateEvent from "./CreateEvent";
import EventDetail from "./EventDetail";
import EventProvider from "./EventProvider";
import Home from "./Home";
import NotFound from "./NotFound";

function AuthenticatedApp() {
  const { isAdmin } = useAuth();

  console.log(isAdmin);

  return (
    <EventProvider>
      <Router>
        <Home path="/" />
        {isAdmin && <CreateEvent path="/create" />}
        <EventDetail path="/event/:eventId" />
        <NotFound default />
      </Router>
    </EventProvider>
  );
}

export default AuthenticatedApp;
