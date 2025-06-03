import React from "react";
import LoginForm from "./components/LoginForm";
import LoginHeader from "./components/LoginHeader";
import styles from "./login.module.css"; 

const Login = () => {
  const handleLogin = (formData) => {
    console.log("Formulario enviado:", formData);
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-welcome"]}>
        <h1>¡Welcome Back!</h1>
        <p>Para seguir conectado, por favor inicia sesion</p>
      </div>
      <div className={styles["login-form-container"]}>
        <LoginHeader />
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;