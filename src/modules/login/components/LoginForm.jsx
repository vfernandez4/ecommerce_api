import React, { useState } from "react"; // Importa React y el hook useState
import { useNavigate, useLocation } from "react-router-dom"; // Importa hooks para navegación y ubicación

const LoginForm = ({ onSubmit }) => { // Componente funcional LoginForm que recibe una función onSubmit como prop
  const [email, setEmail] = useState(""); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [error, setError] = useState(""); // Estado para almacenar mensajes de error
  const navigate = useNavigate(); // Hook para redirigir a otras rutas
  const location = useLocation(); // Hook para obtener la ubicación actual

  const validateEmail = (email) => { // Valida el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para correos válidos
    return emailRegex.test(email); // Retorna true si el correo es válido
  };

  const validatePassword = (password) => { // Valida el formato de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; // Expresión regular para contraseñas válidas
    return passwordRegex.test(password); // Retorna true si la contraseña es válida
  };

  const handleSubmit = async (e) => { // Maneja el envío del formulario
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
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
    setError(""); // Limpia los mensajes de error

    try {
      const userResponse = await fetch("http://localhost:4000/usuarios?email=" + email); // Solicita al servidor el usuario con el correo ingresado
      if (!userResponse.ok) throw new Error("Error al verificar el usuario"); // Lanza un error si la respuesta no es exitosa

      const [user] = await userResponse.json(); // Obtiene el primer usuario de la respuesta
      if (!user) { // Verifica si no existe el usuario
        setError("El usuario no existe. Por favor, regístrate primero."); // Muestra un mensaje de error
        return; // Detiene la ejecución
      }
      
      if (user.password !== password) {
      setError("La contraseña es incorrecta.");
      return;
      }

      const userData = { email };
      localStorage.setItem("user", JSON.stringify(userData));

      onSubmit(userData); // Llama a la función onSubmit con los datos del usuario

      const redirectTo = location.state?.from?.pathname || "/"; // Obtiene la ruta de redirección o la raíz
      navigate(redirectTo); // Redirige a la ruta correspondiente
    } catch (err) { // Maneja errores en la solicitud
      console.error(err); // Imprime el error en la consola
      setError("Error al verificar el usuario. Inténtalo de nuevo más tarde."); // Muestra un mensaje de error
    }
  };

  const handleRegisterRedirect = () => { // Redirige a la página de registro
    navigate("/registro"); // Cambia la ruta a "/registro"
  };

  return (
    <form onSubmit={handleSubmit}> {/* Formulario con el manejador de envío */}
      <label>
        Correo electrónico:
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
          type="password" // Campo de texto para la contraseña
          name="password" // Nombre del campo
          value={password} // Valor actual del estado password
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado password al cambiar el valor
        />
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra el mensaje de error si existe */}
      <button type="submit">Ingresar</button> {/* Botón para enviar el formulario */}
      <p>
        ¿Todavía no tienes cuenta?{" "}
        <a href="/registro" style={{ color: "blue", textDecoration: "underline" }}> {/* Enlace a la página de registro */}
          Sign Up
        </a>
      </p>
    </form>
  );
};

export default LoginForm; // Exporta el componente LoginForm como predeterminado