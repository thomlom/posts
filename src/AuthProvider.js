import React, { useState, useEffect, createContext, useContext } from "react";

import callApi, { TOKEN_NAME } from "./services/callApi";

import Loading from "./Loading";

const AuthContext = createContext();

function AuthProvider(props) {
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
    return <Loading />;
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
      {...props}
    />
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
