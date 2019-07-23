import React from "react";

import { useAuth } from "./AuthProvider";

import UserApp from "./UserApp";
import VisitorApp from "./VisitorApp";

function App() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <UserApp /> : <VisitorApp />;
}

export default App;
