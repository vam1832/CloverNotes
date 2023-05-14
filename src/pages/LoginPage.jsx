import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate("/home", { replace: true });
    } catch (error) {
      setError(
        `Error al iniciar sesión. Por favor, intenta de nuevo. ${error.message}`
      );
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/register", { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h2 className="login-form__title">Iniciar sesión</h2>
          <div className="login-form__input-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="tucorreo@gmail.com"
              required
            />
          </div>
          <div className="login-form__input-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="********"
              required
            />
          </div>
          <div className="buttons-container">
            <button className="login-form__button" type="submit">
              Iniciar sesión
            </button>
            <button className="register-form__button" onClick={handleRegister}>
              Registrarse
            </button>
          </div>
        </form>
      </div>
      {error && <p className="login-form__error">{error}</p>}
    </div>
  );
}

export default LoginPage;
