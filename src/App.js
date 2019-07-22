import React from "react";

import { useAuth } from "./AuthProvider";

import AdminApp from "./AdminApp";
import UserApp from "./UserApp";
import VisitorApp from "./VisitorApp";

function App() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <VisitorApp />;
  }

  return user.permissions.includes("ADMIN") ? <AdminApp /> : <UserApp />;
}

export default App;
