import React from "react";
import styles from "./profile.module.css";
import Profile_img from "../../assets/imagenPerfil/perfil.png";

const Profile = () => {
  return (
    <body className={styles["body"]}>
        <div className={styles["page_container"]}>
            <nav className={styles["profile"]}>
                <img className={styles["profile_img"]} src={Profile_img} alt="imagen" />
            </nav>
            <div className={styles["data"]}>
                <h1>Nombre</h1>
                <p>Santino Fosco</p>
                <h2>Direccion</h2>
                <p>Calle falsa 123</p>
                <h2>Telefono</h2>
                <p>11-1234-5678</p>
                <h2>Email</h2>
                <p>santinofosco@gmail.com</p>
                <h2>Fecha de nacimiento</h2>
                <p>01/01/2000</p>
            </div>
        </div>
    </body>
  );
};

export default Profile;