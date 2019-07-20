import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

function saveTokenForFutureRequests(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isFetchingToken, setIsFetchingToken] = useState(true);
  const [userToken, setUserToken] = useState(null);

  function sign(url) {
    return async function(form) {
      try {
        const { data } = await axios.post(url, form);
        const token = data.token;

        if (token) {
          window.localStorage.setItem("token", data.token);
          setUserToken(token);
          saveTokenForFutureRequests(token);
        }
      } catch (e) {
        console.error(e);
      }
    };
  }

  function signout() {
    delete axios.defaults.headers.common["Authorization"];
    setUserToken(null);
  }

  const signin = sign("http://localhost:3001/signin");
  const signup = sign("http://localhost:3001/signup");

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      saveTokenForFutureRequests(token);
    }

    setIsFetchingToken(false);
  }, []);

  if (isFetchingToken) {
    return <div>Loading</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!userToken,
        userToken,
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
