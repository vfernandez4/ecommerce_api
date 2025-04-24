import React from "react";
import styles from "./productoCard.module.css";

const ProductoCard = ({ producto }) => {
  const { nombre, precio, imagen, stock } = producto;

  return (
    <div className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.imagen} />
      <div className={styles.info}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.precio}>Precio: ${precio}</p>

        {stock > 0 ? (
          <button className={styles.boton}>Ver detalle</button>
        ) : (
          <p className={styles.sinStock}>Sin stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductoCard;
