import { useState } from "react";
import { login } from "../../api/registerAndLogin";
import './style.css'
import Button from "../Button/Button";
import { handleChange } from "../credentials";

function LoginPage({ onLogin }) {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    await login(credentials);
    onLogin();
  };

  const handleInputChange = (event) => {
    handleChange(event, setCredentials);
  };

  const {email, password} = credentials
  const disabled = !(email && password)


  return (
    <div className="containerLoginPage">
      <div className="loginPage">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input className="control" type="email" name="email" onChange={handleInputChange} required/>
          </label>
          <label>
            Password
            <input className="control" type="password" name="password" onChange={handleInputChange} required/>
          </label>
          <Button
            type="submit"
            $variant="primary"
            className="loginForm-submit"
            disabled={disabled}
            >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
