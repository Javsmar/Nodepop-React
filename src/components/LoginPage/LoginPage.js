import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../../api/registerAndLogin";
import './style.css';
import Button from "../Button/Button";
import { handleChange } from "../credentials";
import storage from "../../utils/storage";
import { useAuth } from "../auth/context";

function LoginPage() {
  const { onLogin } =  useAuth();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await login(credentials);

      if (credentials.remember && token) {
        storage.set('auth', token);
      } else {
        storage.remove('auth');
      }

      onLogin();
    } catch (error) {
      setErrorMessage('Credenciales no válidas vuelva a intentarlo o Registrarte');
    }
  };

  const handleInputChange = (event) => {
    handleChange(event, setCredentials);
  };

  const { email, password } = credentials;
  const disabled = !(email && password);

  return (
    <div className="containerLoginPage">
      <div className="loginPage">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              className="control"
              type="email"
              name="email"
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Password
            <input
              className="control"
              type="password"
              name="password"
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Recordar session
            <input
              className="control-session"
              type="checkbox"
              name="remember"
              checked={credentials.remember}
              onChange={handleInputChange}
            />
          </label>
          <Button
            type="submit"
            $variant="primary"
            className="loginForm-submit"
            disabled={disabled}
          >
            Login
          </Button>
          <div className="errorLogin">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <Link to="/register">
            <p className="registerLink">Register</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
