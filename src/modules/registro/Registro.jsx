import React from "react";
import RegistroForm from "./components/RegistroForm";
import RegistroHeader from "./components/RegistroHeader";
import styles from "./registro.module.css";

const Registro = () => {
  return (
    <div className={styles["registro-container"]}>
      <RegistroHeader />
      <div className={styles["registro-form-container"]}>
        <RegistroForm />
      </div>
    </div>
  );
};

export default Registro;