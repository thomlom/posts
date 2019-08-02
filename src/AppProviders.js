import React from "react";

import AuthProvider from "./AuthProvider";
import DialogProvider from "./DialogProvider";
import EventProvider from "./EventProvider";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <DialogProvider>
        <EventProvider>{children}</EventProvider>
      </DialogProvider>
    </AuthProvider>
  );
};

export default AppProviders;
