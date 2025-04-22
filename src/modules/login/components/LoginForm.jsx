import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redirigir
  const location = useLocation(); // Hook para obtener la ubicación actual

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial."
      );
      return;
    }
    setError("");

    // Guardar la información del usuario en localStorage
    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    onSubmit(userData); // Llama a la función pasada como prop

    // Redirigir a la página previa o a la página principal si no hay una previa
    const redirectTo = location.state?.from?.pathname || "/";
    navigate(redirectTo);
  };

  const handleRegisterRedirect = () => {
    navigate("/registro"); // Redirige a la página de registro
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Correo Electrónico:
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Ingresar</button>
      <button type="button" onClick={handleRegisterRedirect}>
        Registrarse
      </button>
    </form>
  );
};

export default LoginForm;