import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
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

    try {
      const userResponse = await fetch("http://localhost:4000/usuarios?email=" + email);
      if (!userResponse.ok) throw new Error("Error al verificar el usuario");

      const [user] = await userResponse.json();
      if (!user) {
        setError("El usuario no existe. Por favor, regístrate primero.");
        return;
      }
      
      if (user.password !== password) {
      setError("La contraseña es incorrecta.");
      return;
      }

      const userData = { email };
      localStorage.setItem("user", JSON.stringify(userData));

      onSubmit(userData);

      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo);
    } catch (err) {
      console.error(err);
      setError("Error al verificar el usuario. Inténtalo de nuevo más tarde.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/registro");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Correo electrónico:
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
      <p>
        ¿Todavía no tienes cuenta?{" "}
        <a href="/registro" style={{ color: "blue", textDecoration: "underline" }}>
          Sign Up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;