import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/api/productos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        const mezclados = [...data].sort(() => 0.5 - Math.random());
        setProductos(mezclados.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.banner}>
        <p>¡12 cuotas sin interés en todos los productos!</p>
        <p>¡Solo por este mes!</p>
      </div>

      <section className={styles.productosDestacadosSection}>
        <h2 className={styles.tituloSeccionDestacados}>Productos destacados</h2>
        <div className={styles.grillaDestacados}>
          {productos.map((prod) => (
            <div key={prod.id} className={styles.card}>
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className={styles.cardImg}
              />
              <h3 className={styles.cardTitulo}>{prod.nombre}</h3>
              <p className={styles.cardPrecio}>${prod.precio}</p>
            </div>
          ))}
        </div>
        <Link to="/producto" className={styles.botonVerTodos}>
          Ver todos los productos
        </Link>
      </section>
    </div>
  );
}
