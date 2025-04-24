import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./carrito.module.css";

export default function Carrito() {
	const [cartItems, setCartItems] = useState([
		{
			id: 1,
			nombre: "iPhone 14 Pro",
			precio: 1399000,
			imagen: "/assets/images/iphone14pro.jpg",
			cantidad: 1,
		},
		{
			id: 2,
			nombre: "Samsung Galaxy S23",
			precio: 1199000,
			imagen: "/assets/images/samsungGalaxyS23.jpg",
			cantidad: 2,
		},
	]);

	function cambiarCantidades(id, masOMenos) {
		setCartItems(items =>
			items.map(item => {
				if (item.id !== id) return item;
				const nuevaCantidad = Math.max(1, item.cantidad + masOMenos);
				return { ...item, cantidad: nuevaCantidad };
			})
		);
	}

	const eliminar = (id) => {
		return;
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
							<li key={item.id} className={styles.cartItem}>
								<img src={item.imagen} alt={item.nombre} className={styles.image} />
								<div className={styles.infoItem}>
									<h2 className={styles.name}>{item.nombre}</h2>
									<p className={styles.precio}> Precio unitario: ${item.precio.toLocaleString()} </p>

									<div className={styles.cantidadesControles}>
										<button onClick={() => cambiarCantidades(item.id, -1)} > – </button>
										<span>{item.cantidad}</span>
										<button onClick={() => cambiarCantidades(item.id, +1)} > + </button>
									</div>

									<p className={styles.subtotal}> Subtotal: $ {(item.precio * item.cantidad).toLocaleString()} </p>

									<button className={styles.eliminar} onClick={() => eliminar(item.id)} > Eliminar </button>
								</div>
							</li>
						))}
					</ul>

					<div className={styles.total}>
						<p> Total: ${total.toLocaleString()} </p>
						<Link to="/pago" className={styles.botonPagar}> Ir a Pagar </Link>
					</div>
				</>
			) : (
				<>
					<p className={styles.mensajeVacio}> Aún no has añadido ningún producto{" "} </p>
					<Link to="/productos" className={styles.link}> Ver productos </Link>
				</>
			)}
		</div>
	);
}
