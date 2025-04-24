import React from "react";
import styles from "./profile.module.css";
import Profile_img from "../../assets/imagenPerfil/perfil.png";
import HistoryCard from "./components/HistoryCard";
import productos from "../../data/productos.json";

const Profile = () => {
  return (
    <div className={styles["body"]}>
        <div className={styles["page_container"]}>
            <nav className={styles["profile"]}>
                <img className={styles["profile_img"]} src={Profile_img} alt="imagen" />
            </nav>
            <div className={styles["data"]}>
              <section className={styles["data_section"]}>
                <h1>Nombre</h1>
                <p>Santino Fosco</p>
              </section>
              <section className={styles["data_section"]}>
                <h1>Direccion</h1>
                <p>Calle falsa 123</p>
              </section>
              <section className={styles["data_section"]}>
                <h1>Telefono</h1>
                <p>11-1234-5678</p>
              </section>
              <section className={styles["data_section"]}>
                <h1>Email</h1>
                <p>santinofosco@gmail.com</p>
              </section>
              <section className={styles["data_section"]}>
              <h2>Fecha de nacimiento</h2>
              <p>01/01/2000</p>
              </section>
            </div>
        </div>
        <section className={styles["history"]}>
          <div className={styles["child_history"]}>
            <h2>Historial de compras</h2>
            {productos.map((producto) => (
              <HistoryCard
                key={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                fecha={producto.fecha}
                imagen={producto.imagen}
              />
            ))}
          </div>
          <div className={styles["child_history"]}>
            <h2>Historial de ventas</h2>
            {productos.map((producto) => (
              <HistoryCard
                key={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                fecha={producto.fecha}
                imagen={producto.imagen}
              />
            ))}
          </div>
        </section>
    </div>
  );
};

export default Profile;