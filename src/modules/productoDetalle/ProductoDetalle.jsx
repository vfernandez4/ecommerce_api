import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./productoDetalle.module.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => console.error(err));
  }, []);

  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) return <p>Producto no encontrado</p>;

  const agregarAlCarrito = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    } else {
      const nuevoProducto = { ...producto, cantidad: 1 };
      localStorage.setItem("carrito", JSON.stringify([...carrito, nuevoProducto]));
    }

    alert("Producto agregado al carrito");
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.card}>
        <img src={producto.imagen} alt={producto.nombre} className={styles.imagen} />
        <div className={styles.detalles}>
          <h1 className={styles.titulo}>{producto.nombre}</h1>
          <p className={styles.descripcion}>{producto.descripcion}</p>
          <p className={styles.precio}>Precio: ${producto.precio}</p>
          {producto.stock > 0 ? (
            <button className={styles.boton} onClick={agregarAlCarrito}>
              Agregar al carrito
            </button>
          ) : (
            <p className={styles.sinStock}>Sin stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
