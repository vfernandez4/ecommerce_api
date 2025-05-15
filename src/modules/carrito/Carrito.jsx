import React, { useState } from "react"; // Importa React y el hook useState
import { Link } from "react-router-dom"; // Importa el componente Link para navegación
import styles from "./carrito.module.css"; // Importa los estilos CSS del componente Carrito

export default function Carrito() {
  const [cartItems, setCartItems] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [itemsEliminando, setItemsEliminando] = useState([]);

  function cambiarCantidades(id, masOMenos) {
    modificarVista(id, masOMenos);
    modificarJson(id, masOMenos);
  }

  function modificarVista(id, masOMenos) {
    setCartItems(items =>
      items.map(item => {
        if (item.id !== id) return item;
        const nuevaCantidad = Math.max(1, item.cantidad + masOMenos);
        return { ...item, cantidad: nuevaCantidad };
      })
    );
  }

  function modificarJson(id, masOMenos) {
    const carritoGuardado = localStorage.getItem("carrito");
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const item = carrito.find((producto) => producto.id === id);
    const nuevaCantidad = Math.max(1, item.cantidad + masOMenos);

    const carritoActualizado = carrito.map((producto) =>
      producto.id === id
        ? { ...producto, cantidad: nuevaCantidad }
        : producto
    );
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  }

  const eliminar = (id) => {
    setItemsEliminando(prev => [...prev, id]);

    setTimeout(() => {
      const nuevoCarrito = cartItems.filter(item => item.id !== id);
      setCartItems(nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      setItemsEliminando(prev => prev.filter(itemId => itemId !== id));
    }, 200);
  };

  function calcularTotal(items) {
    let total = 0;
    items.forEach(item => {
      total += item.precio * item.cantidad;
    });
    return total;
  }

  const total = calcularTotal(cartItems);

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>Mi Carrito</h1>

      {cartItems.length > 0 ? (
        <>
          <ul className={styles.listaCarrito}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className={`${styles.cartItem} ${
                  itemsEliminando.includes(item.id) ? styles.eliminando : ""
                }`}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className={styles.image}
                />
                <div className={styles.infoItem}>
                  <h2 className={styles.name}>{item.nombre}</h2>
                  <p className={styles.precio}>
                    Precio unitario: ${item.precio.toLocaleString()}
                  </p>

                  <div className={styles.cantidadesControles}>
                    <button onClick={() => cambiarCantidades(item.id, -1)}>
                      –
                    </button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidades(item.id, +1)}>
                      +
                    </button>
                  </div>

                  <p className={styles.subtotal}>
                    Subtotal: ${(item.precio * item.cantidad).toLocaleString()}
                  </p>

                  <button
                    className={styles.eliminar}
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <p>Total: ${total.toLocaleString()}</p>
            <Link to="/pago" className={styles.botonPagar}>
              Ir a Pagar
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className={styles.mensajeVacio}>
            Aún no has añadido ningún producto{" "}
          </p>
          <Link to="/producto" className={styles.link}>
            Ver productos
          </Link>
        </>
      )}
    </div>
  );
}
