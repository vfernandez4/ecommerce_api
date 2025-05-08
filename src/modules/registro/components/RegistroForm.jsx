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
      setError(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");

    const usuarioARegistrar = {
      nombreCompleto: name,
      direccion,
      telefono,
      email,
      fechaNacimiento,
      avatar,
      productosComprados: [],
      productosVendidos: []
    };

    console.log(usuarioARegistrar);

    try {
      const res = await fetch("http://localhost:4000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioARegistrar),
      });
      if (!res.ok) throw new Error("Error al resgistrar al usuario");

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
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Dirección:
        <input
          type="text"
          name="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </label>
      <br />
      <label>
        Telefono:
        <input
          type="text"
          name="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </label>
      <br />
      <label>
        Fecha de nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </label>
      <br />
      <div className="avatar-section">
        <p className="section-title">Elige tu avatar:</p>
        <div className="avatar-options">
          {opcionesDeAvatar.map((avatarASeleccionar) => (
            <label
              key={avatarASeleccionar}
              className={`avatar-option ${avatar === avatarASeleccionar ? "selected" : ""}`}
            >
              <img src={avatarASeleccionar} alt="avatar" width={60} height={60} />
              <input
                type="radio"
                name="avatar"
                value={avatarASeleccionar}
                checked={avatar === avatarASeleccionar}
                onChange={() => setAvatar(avatarASeleccionar)}
              />
            </label>
          ))}
        </div>
      </div>
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
      <label>
        Confirmar Contraseña:
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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