import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./carrito.module.css";
import { useCarrito } from "../../context/CarritoContext";

export default function Carrito() {
	const { carrito, eliminarProducto, cambiarCantidad } = useCarrito();
	const cartItems = carrito;

	const [itemsEliminando, setItemsEliminando] = useState([]);

	function cambiarCantidades(id, masOMenos) {
		const producto = carrito.find(item => item.id === id);
		if (!producto) return;

		const nuevaCantidad = producto.cantidad + masOMenos;
		if (nuevaCantidad < 1) {
			alert("La cantidad mínima es 1.");
			return;
		}
		if (nuevaCantidad >= 1) {
			cambiarCantidad(id, nuevaCantidad);
		}
	}

	const eliminar = (id) => {
		setItemsEliminando(prev => [...prev, id]);

		setTimeout(() => {
			eliminarProducto(id);
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
								className={`${styles.cartItem} ${itemsEliminando.includes(item.id) ? styles.eliminando : ""
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
