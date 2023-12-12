import { useState } from "react";
import { login } from "../../api/registerAndLogin";
import './style.css'
import Button from "../Button/Button";

function LoginPage({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    await login({
      email,
      password,
    });
    onLogin();
  };

  const handleMailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const disabled = !(email && password)


  return (
    <div className="containerLoginPage">
      <div className="loginPage">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input className="control" type="email" name="email" onChange={handleMailChange} required/>
          </label>
          <label>
            Password
            <input className="control" type="password" name="password" onChange={handlePasswordChange} required/>
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
