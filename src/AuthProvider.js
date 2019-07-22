import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

function saveTokenForFutureRequests(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const { data } = await axios.get("http://localhost:3001/me");
      setUser(data.user);
      setIsFetchingUser(false);
    } catch (e) {
      console.error(e);
      setIsFetchingUser(false);
    }
  }

  function sign(url) {
    return async function(form) {
      try {
        const { data } = await axios.post(url, form);
        const token = data.token;

        if (token) {
          window.localStorage.setItem("token", data.token);
          saveTokenForFutureRequests(token);
          await getUser();
        }
      } catch (e) {
        console.error(e);
      }
    };
  }

  function signout() {
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("token");
    setUser(null);
  }

  const signin = sign("http://localhost:3001/signin");
  const signup = sign("http://localhost:3001/signup");

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      saveTokenForFutureRequests(token);
      getUser();
    } else {
      setIsFetchingUser(false);
    }
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
