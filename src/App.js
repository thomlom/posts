import React from "react";

import { useAuth } from "./AuthProvider";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";

function App() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
