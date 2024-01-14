import React, { useEffect, useState } from "react";

import { register } from '../../api/registerAndLogin';
import './style.css'

import Button from "../Button/Button";
import Footer from "../layout/Footer";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

function Register(){
  
  const initialFormData = {
    email: '',
    password: '',
    username: '',
    name: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await register(formData);
      setSuccessMessage('Registro exitoso, logueate');
      
    } catch (error) {
      console.error('Error durante el registro mensage:', error);
      if (error.response && error.response.status === 500){
        setError('Hubo un error durante el registro. Por favor, inténtelo de nuevo más tarde.');
      } else {
        console.error('Error durante el registro:', error.response ? error.response.data : error.message);
        setError('La dirección de correo electrónico o el usuario ya están en uso. procede a loggearte');
        // setFormData(initialFormData);
      }    
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        navigate("/login");
      }, 6000);

      return () => clearTimeout(timer);

    } else if (error) {
      const timer = setTimeout(() => {
        setError(null);
        navigate("/login");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, error, navigate]);

  

  return (
    <div className="containerRegisterpage">
      <div className="registerPage">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <label>
            email:
            <input className="controls" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Password:
            <input className="controls" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
          <br />
          <label>
            User Name:
            <input className="controls" type="text" name="username" value={formData.username} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Name:
            <input className="controls" type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <br />
          <div className="regis-login">
            <Button
            type="submit"
            $variant="primary"
            className="loginRegister-submit"
            >
              Registrarse
            </Button>
            <Button>
              <NavLink className="loginRegister-submit" to="/login">Login</NavLink>
            </Button>
          </div>

          <br />
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;