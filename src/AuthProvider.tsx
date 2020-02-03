import React, { useState, useEffect, createContext, useContext } from "react";

import callApi, { TOKEN_NAME } from "./services/callApi";

import Loading from "./Loading";

interface SignFormData {
  email: string;
  password: string;
  name?: string;
}

interface User {
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signin: (form: SignFormData) => Promise<void>;
  signup: (form: SignFormData) => Promise<void>;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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

  function sign(url: string) {
    return async function(form: SignFormData) {
      const { data } = await callApi(url, {
        method: "POST",
        data: form,
      });

      const token: string = data.token;

      if (token) {
        window.localStorage.setItem(TOKEN_NAME, data.token);
        getUser();
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
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
