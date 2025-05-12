import React, { useState, useEffect } from "react"; // Importa React y los hooks useState y useEffect
import { useParams } from "react-router-dom"; // Importa el hook useParams para obtener parámetros de la URL
import styles from "./productoDetalle.module.css"; // Importa los estilos CSS del componente ProductoDetalle

const ProductoDetalle = () => { // Componente funcional ProductoDetalle
  const { id } = useParams(); // Obtiene el parámetro "id" de la URL
  const [productos, setProductos] = useState([]); // Estado para almacenar la lista de productos

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

  const agregarAlCarrito = () => { // Función para agregar el producto al carrito
    const carritoGuardado = localStorage.getItem("carrito"); // Obtiene el carrito guardado en localStorage
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []; // Si existe, lo parsea; si no, inicializa como un array vacío

    const productoExistente = carrito.find((item) => item.id === producto.id); // Busca si el producto ya está en el carrito

    if (productoExistente) { // Si el producto ya está en el carrito
      const carritoActualizado = carrito.map((item) => // Actualiza la cantidad del producto
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 } // Incrementa la cantidad en 1
          : item // Retorna los demás productos sin cambios
      );
      localStorage.setItem("carrito", JSON.stringify(carritoActualizado)); // Guarda el carrito actualizado en localStorage
    } else { // Si el producto no está en el carrito
      const nuevoProducto = { ...producto, cantidad: 1 }; // Crea un nuevo producto con cantidad inicial de 1
      localStorage.setItem("carrito", JSON.stringify([...carrito, nuevoProducto])); // Agrega el nuevo producto al carrito y lo guarda
    }

    alert("Producto agregado al carrito"); // Muestra una alerta indicando que el producto fue agregado
  };

  return (
    <div className={styles.contenedor}> {/* Contenedor principal del detalle del producto */}
      <div className={styles.card}> {/* Contenedor de la tarjeta del producto */}
        <img src={producto.imagen} alt={producto.nombre} className={styles.imagen} /> {/* Imagen del producto */}
        <div className={styles.detalles}> {/* Contenedor de los detalles del producto */}
          <h1 className={styles.titulo}>{producto.nombre}</h1> {/* Nombre del producto */}
          <p className={styles.descripcion}>{producto.descripcion}</p> {/* Descripción del producto */}
          <p className={styles.precio}>Precio: ${producto.precio}</p> {/* Precio del producto */}
          {producto.stock > 0 ? ( // Verifica si el producto tiene stock disponible
            <button className={styles.boton} onClick={agregarAlCarrito}> {/* Botón para agregar al carrito */}
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
