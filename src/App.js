import Register from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import ShowProducts from "./components/ShowProducts";
import { useState } from "react";

function App() {
  //const [isRegister, setIsRegister] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const  handleLogin = () => {
    //setIsRegister(false);
    setIsLogged(true);
  };
  return (
    <div className="App">
      <h1>NodePop</h1>
      {isLogged ? <ShowProducts /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
}

export default App;
