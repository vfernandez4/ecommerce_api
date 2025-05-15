import React, { useState } from "react"; // Importa React y el hook useState
import { useNavigate, useLocation } from "react-router-dom"; // Importa hooks para navegación y ubicación

const RegistroForm = () => { // Componente funcional RegistroForm
  const [name, setName] = useState(""); // Estado para almacenar el nombre del usuario
  const [direccion, setDireccion] = useState(""); // Estado para almacenar la dirección
  const [telefono, setTelefono] = useState(""); // Estado para almacenar el teléfono
  const [fechaNacimiento, setFechaNacimiento] = useState(""); // Estado para almacenar la fecha de nacimiento
  const [avatar, setAvatar] = useState(""); // Estado para almacenar el avatar seleccionado
  const [email, setEmail] = useState(""); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar la contraseña
  const [error, setError] = useState(""); // Estado para almacenar mensajes de error
  const [success, setSuccess] = useState(false); // Estado para indicar si el registro fue exitoso
  const navigate = useNavigate(); // Hook para redirigir a otras rutas
  const location = useLocation(); // Hook para obtener la ubicación actual

  const opcionesDeAvatar = [ // Opciones de avatar disponibles
    "/avatar/avatar1.png", // Ruta del primer avatar
    "/avatar/avatar2.png" // Ruta del segundo avatar
  ];

  const validateEmail = (email) => { // Valida el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para correos válidos
    return emailRegex.test(email); // Retorna true si el correo es válido
  };

  const validatePassword = (password) => { // Valida el formato de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; // Expresión regular para contraseñas válidas
    return passwordRegex.test(password); // Retorna true si la contraseña es válida
  };

  const validateName = (name) => { // Valida el formato del nombre
    const nameRegex = /^[A-Za-z\s]{1,30}$/; // Expresión regular para nombres válidos
    return nameRegex.test(name); // Retorna true si el nombre es válido
  };

  const handleSubmit = async (e) => { // Maneja el envío del formulario
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      const existingUsersResponse = await fetch("http://localhost:4000/usuarios"); // Solicita la lista de usuarios existentes
      if (!existingUsersResponse.ok) throw new Error("Error al obtener usuarios existentes"); // Lanza un error si la respuesta no es exitosa

      const existingUsers = await existingUsersResponse.json(); // Convierte la respuesta a JSON
      const emailExists = existingUsers.some((user) => user.email === email); // Verifica si el correo ya está registrado

      if (emailExists) { // Si el correo ya existe
        setError("El correo electrónico ya está registrado."); // Muestra un mensaje de error
        return; // Detiene la ejecución
      }
    } catch (err) { // Maneja errores en la solicitud
      console.error(err); // Imprime el error en la consola
      setError("No se pudo verificar la existencia del correo electrónico."); // Muestra un mensaje de error
      return; // Detiene la ejecución
    }

    if (!validateName(name)) { // Verifica si el nombre es inválido
      setError("Ingrese un nombre válido."); // Muestra un mensaje de error
      return; // Detiene la ejecución
    }
    if (!validateEmail(email)) { // Verifica si el correo es inválido
      setError("Por favor, ingresa un correo electrónico válido."); // Muestra un mensaje de error
      return; // Detiene la ejecución
    }
    if (!validatePassword(password)) { // Verifica si la contraseña es inválida
      setError( // Muestra un mensaje de error
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial."
      );
      return; // Detiene la ejecución
    }
    if (password !== confirmPassword) { // Verifica si las contraseñas no coinciden
      setError("Las contraseñas no coinciden."); // Muestra un mensaje de error
      return; // Detiene la ejecución
    }
    
    setError("");

    const usuarioARegistrar = {
      nombreCompleto: name,
      password,
      direccion,
      telefono,
      email,
      fechaNacimiento,
      avatar,
      productosComprados: [],
      productosVendidos: []
    };

    console.log(usuarioARegistrar); // Imprime el usuario en la consola

    try {
      const res = await fetch("http://localhost:4000/usuarios", { // Realiza una solicitud POST para registrar al usuario
        method: "POST", // Método HTTP POST
        headers: { "Content-Type": "application/json" }, // Cabecera indicando que el cuerpo es JSON
        body: JSON.stringify(usuarioARegistrar), // Convierte el objeto usuario a JSON
      });
      if (!res.ok) throw new Error("Error al resgistrar al usuario"); // Lanza un error si la respuesta no es exitosa

      setSuccess(true); // Indica que el registro fue exitoso
      const redirectTo = location.state?.from?.pathname || "/"; // Obtiene la ruta de redirección o la raíz
      setTimeout(() => navigate(redirectTo), 2000); // Redirige después de 2 segundos
    } catch (err) { // Maneja errores en la solicitud
      console.error(err); // Imprime el error en la consola
      setError("No se pudo conectar con el servidor."); // Muestra un mensaje de error
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* Formulario con el manejador de envío */}
      <label>
        Nombre completo:
        <input
          type="text" // Campo de texto para el nombre
          name="name" // Nombre del campo
          value={name} // Valor actual del estado name
          onChange={(e) => setName(e.target.value)} // Actualiza el estado name al cambiar el valor
        />
      </label>
      <br />
      <label>
        Dirección:
        <input
          type="text" // Campo de texto para la dirección
          name="direccion" // Nombre del campo
          value={direccion} // Valor actual del estado direccion
          onChange={(e) => setDireccion(e.target.value)} // Actualiza el estado direccion al cambiar el valor
        />
      </label>
      <br />
      <label>
        Telefono:
        <input
          type="text" // Campo de texto para el teléfono
          name="telefono" // Nombre del campo
          value={telefono} // Valor actual del estado telefono
          onChange={(e) => setTelefono(e.target.value)} // Actualiza el estado telefono al cambiar el valor
        />
      </label>
      <br />
      <label>
        Fecha de nacimiento:
        <input
          type="date" // Campo de fecha para la fecha de nacimiento
          name="fechaNacimiento" // Nombre del campo
          value={fechaNacimiento} // Valor actual del estado fechaNacimiento
          onChange={(e) => setFechaNacimiento(e.target.value)} // Actualiza el estado fechaNacimiento al cambiar el valor
        />
      </label>
      <br />
      <div className="avatar-section"> {/* Sección para seleccionar el avatar */}
        <p className="section-title">Elige tu avatar:</p>
        <div className="avatar-options"> {/* Opciones de avatar */}
          {opcionesDeAvatar.map((avatarASeleccionar) => ( // Mapea las opciones de avatar
            <label
              key={avatarASeleccionar} // Clave única para cada opción
              className={`avatar-option ${avatar === avatarASeleccionar ? "selected" : ""}`} // Clase dinámica según selección
            >
              <img src={avatarASeleccionar} alt="avatar" width={60} height={60} /> {/* Imagen del avatar */}
              <input
                type="radio" // Campo de tipo radio para seleccionar el avatar
                name="avatar" // Nombre del campo
                value={avatarASeleccionar} // Valor del avatar
                checked={avatar === avatarASeleccionar} // Marca el avatar seleccionado
                onChange={() => setAvatar(avatarASeleccionar)} // Actualiza el estado avatar al cambiar la selección
              />
            </label>
          ))}
        </div>
      </div>
      <br />
      <label>
        Correo Electrónico:
        <input
          type="text" // Campo de texto para el correo electrónico
          name="email" // Nombre del campo
          value={email} // Valor actual del estado email
          onChange={(e) => setEmail(e.target.value)} // Actualiza el estado email al cambiar el valor
        />
      </label>
      <br />
      <label>
        Contraseña:
        <input
          type="password" // Campo de contraseña
          name="password" // Nombre del campo
          value={password} // Valor actual del estado password
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado password al cambiar el valor
        />
      </label>
      <br />
      <label>
        Confirmar Contraseña:
        <input
          type="password" // Campo de contraseña para confirmar
          name="confirmPassword" // Nombre del campo
          value={confirmPassword} // Valor actual del estado confirmPassword
          onChange={(e) => setConfirmPassword(e.target.value)} // Actualiza el estado confirmPassword al cambiar el valor
        />
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra el mensaje de error si existe */}
      {success && <p style={{ color: "green" }}>Registro exitoso. Redirigiendo...</p>} {/* Muestra un mensaje de éxito si el registro fue exitoso */}
      <button type="submit">Registrarse</button> {/* Botón para enviar el formulario */}
      <p>
        ¿Ya tienes cuenta?{" "}
        <a href="/login" style={{ color: "#5c9aff", textDecoration: "underline" }}> {/* Enlace a la página de inicio de sesión */}
          Sign In
        </a>
      </p>
    </form>
  );
};

export default RegistroForm; // Exporta el componente RegistroForm como predeterminado