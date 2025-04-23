import React from "react";
import RegistroForm from "./components/RegistroForm";
import RegistroHeader from "./components/RegistroHeader";
import styles from "./registro.module.css";

const Registro = () => {
  return (
    <div className={styles["registro-container"]}>
      <div className={styles["registro-welcome"]}>
        <h1>¡Bienvenido!</h1>
        <p>Por favor, crea una cuenta para comenzar.</p>
      </div>
      <div className={styles["registro-form-container"]}>
      <RegistroHeader />
      <RegistroForm />
      </div>
    </div>
  );
};

export default Registro;