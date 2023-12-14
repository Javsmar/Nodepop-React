import { createContext, useContext, useEffect, useState } from "react";
import storage from "../../utils/storage";
import { setAuthorizationHeader } from "../../api/client";

export const AuthContext = createContext(false);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export  const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const accessToken = storage.get("auth");
    if (accessToken) {
      setAuthorizationHeader(accessToken);
      setIsLogged(true);
    }
  }, []);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  const authValue = {
    isLogged,
    onLogout: handleLogout,
    onLogin: handleLogin
  };

  return <AuthContext.Provider value={authValue}>{ children }</AuthContext.Provider>

};