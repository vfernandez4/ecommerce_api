import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegistroForm = () => {
  const [name, setName] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const opcionesDeAvatar = [
    "/avatar/avatar1.png",
    "/avatar/avatar2.png"
  ];

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

  const handleSubmit = async (e) => {
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
      setError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");

    const usuarioARegistrar = {
      nombreCompleto: name,
      email,
      password,
      direccion,
      telefono,
      fechaNacimiento,
      avatar,
      rol: "ROLE_USER"
    };

    try {
      const res = await fetch("http://localhost:8082/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioARegistrar),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Error al registrar el usuario.");
        return;
      }

      setSuccess(true);
      const redirectTo = location.state?.from?.pathname || "/";
      setTimeout(() => navigate(redirectTo), 2000);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre completo:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Dirección:
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      </label>
      <br />
      <label>
        Teléfono:
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </label>
      <br />
      <label>
        Fecha de nacimiento:
        <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
      </label>
      <br />
      <div className="avatar-section">
        <p>Elige tu avatar:</p>
        <div className="avatar-options">
          {opcionesDeAvatar.map((avatarOption) => (
            <label key={avatarOption} className={`avatar-option ${avatar === avatarOption ? "selected" : ""}`}>
              <img src={avatarOption} alt="avatar" width={60} height={60} />
              <input
                type="radio"
                value={avatarOption}
                checked={avatar === avatarOption}
                onChange={() => setAvatar(avatarOption)}
              />
            </label>
          ))}
        </div>
      </div>
      <br />
      <label>
        Correo Electrónico:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Confirmar Contraseña:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registro exitoso. Redirigiendo...</p>}
      <button type="submit">Registrarse</button>
      <p>
        ¿Ya tienes cuenta?{" "}
        <a href="/login" style={{ color: "#5c9aff", textDecoration: "underline" }}>
          Sign In
        </a>
      </p>
    </form>
  );
};

export default RegistroForm;
