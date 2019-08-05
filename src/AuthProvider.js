import React, { useState, useEffect, createContext, useContext } from "react";

import callApi, { TOKEN_NAME } from "./services/callApi";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const { data } = await callApi("/me", {
        method: "GET",
      });
      setUser(data.user);
      setIsFetchingUser(false);
    } catch (e) {
      console.error(e);
      setIsFetchingUser(false);
    }
  }

  function sign(url) {
    return async function(form) {
      const { data } = await callApi(url, {
        method: "POST",
        data: form,
      });
      const token = data.token;

      if (token) {
        window.localStorage.setItem(TOKEN_NAME, data.token);
        getUser(token);
      }
    };
  }

  function signout() {
    window.localStorage.removeItem(TOKEN_NAME);
    setUser(null);
  }

  const signin = sign("/signin");
  const signup = sign("/signup");

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_NAME);
    token ? getUser() : setIsFetchingUser(false);
  }, []);

  if (isFetchingUser) {
    return <div>Loading</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signup,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
