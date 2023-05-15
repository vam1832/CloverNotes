import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import "./SignUpPage.css";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(email, password);
      setLoggedIn(true);
      navigate("/", { replace: true });
    } catch (error) {
      setLoggedIn(false);
      setError(
        `Error al iniciar sesión. Por favor, intenta de nuevo. ${error.message}`
      );
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/login", { replace: true });
  };
  if (loggedIn) {
    return <Navigate to="/home" replace />;
  } else {
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h2 className="login-form__title">Registrarse</h2>
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
            <button className="register-form__button-lg" type="submit">
              Registrarse
            </button>
            <button className="login-form__button-lg" onClick={handleLogin}>
              Ya tengo cuenta
            </button>
          </div>
          {error && <p className="login-form__error">{error}</p>}
        </form>
      </div>
    );
  }
}

export default SignUpPage;
