import { useState } from "react";
import { login } from "../../api/registerAndLogin";
import "./style.css";
import Button from "../Button/Button";
import { handleChange } from "../credentials";
import storage from "../../utils/storage";
import { useAuth } from "../auth/context";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

function LoginPage() {
  const { onLogin } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFetching(true);
      const token = await login(credentials);

      if (credentials.remember && token) {
        storage.set("auth", token);
      } else {
        storage.remove("auth");
      }
      setIsFetching(false);
      onLogin();

      const to = location?.state?.from || "/";
      navigate(to, { replace: true });
    } catch (error) {
      setIsFetching(false);
      console.error("Error al iniciar sesión:", error);
      setError(
        "Herror al hacer login revisa Email y Password si no estas resgistrado procede a registrarte"
      );
    }
  };

  const handleInputChange = (event) => {
    handleChange(event, setCredentials);
  };

  const { email, password } = credentials;
  const disabled = !(email && password) || isFetching;

  return (
    <div className="containerLoginPage">
      <h1>NodePop</h1>
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
              {isFetching ? 'Connecting...' : 'log in'}
            </Button>
            <Button>
              <NavLink className="loginRegister-submit" to="/register">
                Register
              </NavLink>
            </Button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default LoginPage;
