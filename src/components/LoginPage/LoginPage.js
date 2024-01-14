import { useState } from "react";
import { login } from "../../api/registerAndLogin";
import "./style.css";
import Button from "../Button/Button";
import { handleChange } from "../credentials";
import storage from "../../utils/storage";
import { useAuth } from "../auth/context";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const { onLogin } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const token = await login(credentials);
  
      if (credentials.remember && token) {
        storage.set("auth", token);
      } else {
        storage.remove("auth");
      }
  
      onLogin();
  
      const to = location?.state?.from || "/";
      navigate(to, { replace: true });
    } catch (error) {
      // Manejar el error, por ejemplo, mostrar un mensaje o redirigir a la página de registro
      console.error("Error al iniciar sesión:", error);
      setError('La dirección de correo electrónico o el usuario no están registrados. procede a registrarte');
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
          <div className="login-regis">
            <Button
              type="submit"
              $variant="primary"
              className="loginForm-submit"
              disabled={disabled}
            >
              Login
            </Button>
            <Button>
                <NavLink className="loginRegister-submit" to="/register">Register</NavLink>
            </Button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
