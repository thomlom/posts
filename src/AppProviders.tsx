import React from "react";

import AuthProvider from "./AuthProvider";
import PostProvider from "./PostProvider";

const AppProviders: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <PostProvider>{children}</PostProvider>
    </AuthProvider>
  );
};

export default AppProviders;
