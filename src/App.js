import React from "react";
import { Router } from "@reach/router";
import { createGlobalStyle } from "styled-components";

import { useAuth } from "./AuthProvider";

import CreateEvent from "./CreateEvent";
import DialogAuth from "./DialogAuth";
import EventDetail from "./EventDetail";
import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";

const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');

  html { font-family: 'Inter', sans-serif; }

  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
`;

function App() {
  const { isAdmin, isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <Router>
        <Home path="/" />
        {isAdmin && <CreateEvent path="/create" />}
        {isAuthenticated && <EventDetail path="/event/:eventId" />}
        <NotFound default />
      </Router>
      <GlobalStyle />
      <DialogAuth />
    </>
  );
}

export default App;
