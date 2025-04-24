import React from "react";
import styles from "./productoCard.module.css";
import { Link } from "react-router-dom";

const ProductoCard = ({ producto }) => {
  const { nombre, precio, imagen, stock } = producto;

  return (
    <div className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.imagen} />
      <div className={styles.info}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.precio}>Precio: ${precio}</p>

        {stock > 0 ? (
          <Link to={`/producto/${producto.id}`} className={styles.boton}>
            Ver detalle
          </Link>
        ) : (
          <p className={styles.sinStock}>Sin stock</p>
)}

      </div>
    </div>
  );
};

export default ProductoCard;
