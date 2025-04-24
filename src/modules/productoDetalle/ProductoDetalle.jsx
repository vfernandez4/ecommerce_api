import React from "react";
import productos from "../../data/productos.json";
import { useParams } from "react-router-dom";
import styles from "./productoDetalle.module.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className={styles.contenedor}>
      <div className={styles.card}>
        <img src={producto.imagen} alt={producto.nombre} className={styles.imagen} />
        <div className={styles.detalles}>
          <h1 className={styles.titulo}>{producto.nombre}</h1>
          <p className={styles.descripcion}>{producto.descripcion}</p>
          <p className={styles.precio}>Precio: ${producto.precio}</p>
          {producto.stock > 0 ? (
            <button className={styles.boton}>Agregar al carrito</button>
          ) : (
            <p className={styles.sinStock}>Sin stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
