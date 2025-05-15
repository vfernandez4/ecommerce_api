import React, { useState } from "react"; // Importa React y el hook useState
import { Link } from "react-router-dom"; // Importa el componente Link para navegación
import styles from "./carrito.module.css"; // Importa los estilos CSS del componente Carrito

export default function Carrito() { // Componente funcional Carrito
  const [cartItems, setCartItems] = useState(() => { // Estado para almacenar los productos del carrito
    const carritoGuardado = localStorage.getItem("carrito"); // Obtiene el carrito guardado en localStorage
    return carritoGuardado ? JSON.parse(carritoGuardado) : []; // Si existe, lo parsea; si no, inicializa como un array vacío
  });

  const [itemsEliminando, setItemsEliminando] = useState([]); // Estado para manejar los productos que están siendo eliminados

  function cambiarCantidades(id, masOMenos) { // Cambia la cantidad de un producto en el carrito
    modificarVista(id, masOMenos); // Actualiza la vista del carrito
    modificarJson(id, masOMenos); // Actualiza los datos en localStorage
  }

  function modificarVista(id, masOMenos) { // Modifica la cantidad en el estado local
    setCartItems(items =>
      items.map(item => { // Itera sobre los productos del carrito
        if (item.id !== id) return item; // Si no coincide el ID, retorna el producto sin cambios
        const nuevaCantidad = Math.max(1, item.cantidad + masOMenos); // Calcula la nueva cantidad, asegurándose de que sea al menos 1
        return { ...item, cantidad: nuevaCantidad }; // Retorna el producto con la cantidad actualizada
      })
    );
  }

  function modificarJson(id, masOMenos) { // Modifica la cantidad en localStorage
    const carritoGuardado = localStorage.getItem("carrito"); // Obtiene el carrito guardado
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []; // Si existe, lo parsea; si no, inicializa como un array vacío

    const item = carrito.find((producto) => producto.id === id); // Encuentra el producto correspondiente
    const nuevaCantidad = Math.max(1, item.cantidad + masOMenos); // Calcula la nueva cantidad, asegurándose de que sea al menos 1

    const carritoActualizado = carrito.map((producto) => // Actualiza el carrito
      producto.id === id
        ? { ...producto, cantidad: nuevaCantidad } // Si coincide el ID, actualiza la cantidad
        : producto // Si no, retorna el producto sin cambios
    );
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado)); // Guarda el carrito actualizado en localStorage
  }

  const eliminar = (id) => { // Elimina un producto del carrito
    setItemsEliminando(prev => [...prev, id]); // Agrega el ID del producto al estado de eliminación

    setTimeout(() => { // Espera 200ms antes de eliminar el producto
      const nuevoCarrito = cartItems.filter(item => item.id !== id); // Filtra los productos que no coinciden con el ID
      setCartItems(nuevoCarrito); // Actualiza el estado cartItems
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito)); // Guarda el carrito actualizado en localStorage
      setItemsEliminando(prev => prev.filter(itemId => itemId !== id)); // Elimina el ID del estado de eliminación
    }, 200);
  };

  function calcularTotal(items) { // Calcula el total del carrito
    let total = 0; // Inicializa el total en 0
    items.forEach(item => { // Itera sobre los productos del carrito
      total += item.precio * item.cantidad; // Suma el precio total de cada producto
    });
    return total; // Retorna el total calculado
  }

  const total = calcularTotal(cartItems); // Calcula el total del carrito

  return (
    <div className={styles.contenedor}> {/* Contenedor principal del carrito */}
      <h1 className={styles.titulo}>Mi Carrito</h1> {/* Título del carrito */}

      {cartItems.length > 0 ? ( // Verifica si hay productos en el carrito
        <>
          <ul className={styles.listaCarrito}> {/* Lista de productos en el carrito */}
            {cartItems.map((item) => ( // Itera sobre los productos del carrito
              <li
                key={item.id} // Clave única para cada producto
                className={`${styles.cartItem} ${
                  itemsEliminando.includes(item.id) ? styles.eliminando : "" // Aplica estilo si el producto está siendo eliminado
                }`}
              >
                <img
                  src={item.imagen} // Imagen del producto
                  alt={item.nombre} // Texto alternativo con el nombre del producto
                  className={styles.image} // Clase para estilos de la imagen
                />
                <div className={styles.infoItem}> {/* Contenedor de información del producto */}
                  <h2 className={styles.name}>{item.nombre}</h2> {/* Nombre del producto */}
                  <p className={styles.precio}>
                    Precio unitario: ${item.precio.toLocaleString()} {/* Precio unitario */}
                  </p>

                  <div className={styles.cantidadesControles}> {/* Controles para cambiar la cantidad */}
                    <button onClick={() => cambiarCantidades(item.id, -1)}>
                      –
                    </button> {/* Botón para disminuir cantidad */}
                    <span>{item.cantidad}</span> {/* Muestra la cantidad actual */}
                    <button onClick={() => cambiarCantidades(item.id, +1)}>
                      +
                    </button> {/* Botón para aumentar cantidad */}
                  </div>

                  <p className={styles.subtotal}>
                    Subtotal: ${(item.precio * item.cantidad).toLocaleString()} {/* Subtotal del producto */}
                  </p>

                  <button
                    className={styles.eliminar}
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button> {/* Botón para eliminar producto */}
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.total}> {/* Contenedor del total */}
            <p>Total: ${total.toLocaleString()}</p> {/* Muestra el total del carrito */}
            <Link to="/pago" className={styles.botonPagar}>
              Ir a Pagar
            </Link> {/* Enlace para ir a la página de pago */}
          </div>
        </>
      ) : (
        <>
          <p className={styles.mensajeVacio}>
            Aún no has añadido ningún producto{" "}
          </p> {/* Mensaje de carrito vacío */}
          <Link to="/producto" className={styles.link}>
            Ver productos
          </Link> {/* Enlace para ver productos */}
        </>
      )}
    </div>
  );
}
