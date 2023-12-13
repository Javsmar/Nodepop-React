import React, { useState, useEffect } from "react";
import ShowProducts from "./components/products/ShowProducts";
import LoginPage from "./components/LoginPage/LoginPage";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";


function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const accessToken = storage.get("auth");
    if (accessToken) {
      setAuthorizationHeader(accessToken);
      setIsLogged(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div className="App">
      <h1>NodePop</h1>
      {isLogged ? (
      <> 
        <ShowProducts onLogout={handleLogout} isLogged={ isLogged }/>
      </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
