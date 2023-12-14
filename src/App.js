import React, { useState, useEffect } from "react";
import ShowProducts from "./components/products/ShowProducts";
import LoginPage from "./components/LoginPage/LoginPage";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import { AuthContext } from "./components/auth/context";


function App() {
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

  return (
    <AuthContext.Provider value={authValue}>
      <div className="App">
        {isLogged ? (
          <> 
            <ShowProducts />
          </>
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
