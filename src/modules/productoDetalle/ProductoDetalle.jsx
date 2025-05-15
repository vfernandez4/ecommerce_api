
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./productoDetalle.module.css";
import { useCarrito } from "../../context/CarritoContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const { actualizarCantidadTotal } = useCarrito();

  useEffect(() => { // Hook para ejecutar código al montar el componente
    fetch("http://localhost:4000/productos") // Realiza una solicitud a la API para obtener los productos
      .then((res) => { // Maneja la respuesta de la API
        if (!res.ok) throw new Error("Error al cargar productos"); // Lanza un error si la respuesta no es exitosa
        return res.json(); // Convierte la respuesta a JSON
      })
      .then((data) => setProductos(data)) // Actualiza el estado con los datos obtenidos
      .catch((err) => console.error(err)); // Maneja errores en la solicitud
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar

  const producto = productos.find((p) => p.id.toString() === id); // Busca el producto con el ID correspondiente

  if (!producto) { // Verifica si el producto no fue encontrado
    return <p>Producto no encontrado</p>; // Muestra un mensaje de error
  }
  
  const { agregarProducto } = useCarrito();

  const agregarAlCarrito = () => {
    agregarProducto(producto);
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
          <p className={styles.infoExtra}>💳 12 cuotas sin interés</p>
          <p className={styles.infoExtra}>🚚 Envío GRATIS a todo el país</p>
          <p className={styles.infoExtra}>🏬 Retiro GRATIS en sucursal</p>
          {producto.stock > 0 ? (
            <button className={styles.boton} onClick={agregarAlCarrito}>

              Agregar al carrito
            </button>
          ) : (
            <p className={styles.sinStock}>Sin stock</p> // Muestra un mensaje si no hay stock
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle; // Exporta el componente ProductoDetalle como predeterminado
