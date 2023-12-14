import { useState } from "react";
import { login } from "../../api/registerAndLogin";
import './style.css';
import Button from "../Button/Button";
import { handleChange } from "../credentials";
import storage from "../../utils/storage";
import { useContext } from "react";
import { AuthContext } from "../auth/context";

function LoginPage() {
  const { onLogin } =  useContext(AuthContext);
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const token = await login(credentials);
    
    if (credentials.remember && token) {
      storage.set('auth', token);
    }else{
      storage.remove('auth');
    }
    
    onLogin();
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
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
