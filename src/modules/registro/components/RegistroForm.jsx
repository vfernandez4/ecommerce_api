import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegistroForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{1,30}$/;
    return nameRegex.test(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateName(name)) {
      setError("Ingrese un nombre válido.");
      return;
    }
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
    const userData = { name, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(userData));

    setSuccess(true);

    // Redirigir a la página previa o a la principal
    const redirectTo = location.state?.from?.pathname || "/";
    setTimeout(() => navigate(redirectTo), 2000); // Redirige después de 2 segundos
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre completo:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
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
      {success && <p style={{ color: "green" }}>Registro exitoso. Redirigiendo...</p>}
      <button type="submit">Registrarse</button>
      <p>
        ¿Ya tienes cuenta?{" "}
        <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Sign In
        </a>
      </p>
    </form>
  );
};

export default RegistroForm;