import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./productoDetalle.module.css";
import { useCarrito } from "../../context/CarritoContext";

const ProductoDetalle = () => {
	const { id } = useParams();
	const [producto, setProducto] = useState(null);
	const { agregarProducto } = useCarrito();

	useEffect(() => {
		fetch(`http://localhost:8082/api/productos/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				if (!res.ok) throw new Error("Error al cargar producto");
				return res.json();
			})
			.then((data) => setProducto(data))
			.catch((err) => console.error(err));
	}, [id]);

	if (!producto) {
		return <p>Producto no encontrado</p>;
	}

	const agregarAlCarrito = () => {
		agregarProducto(producto);
	};

	return (
		<div className={styles.contenedor}>
			<div className={styles.card}>
				<img src={producto.imagen} alt={producto.nombre} className={styles.imagen} />
				<div className={styles.detalles}>
					{producto.categoriaNombre === "Originales ClickCo" && (
						<span className={styles.badgeOriginal}>
							Producto Original ClickCo
						</span>
					)}
					{producto.categoriaNombre !== "Originales ClickCo" && (
						<span className={styles.badgeOriginal}>
							Producto de Vendedor
						</span>
					)}
					<h1 className={styles.titulo}>{producto.nombre}</h1>
					<p className={styles.descripcion}>{producto.descripcion}</p>
					<p className={styles.precio}>Precio: ${producto.precio}</p>
					<p className={styles.descripcion}>Quedan: {producto.stockActual} disponibles</p>
					<p className={styles.descripcion}>Se vendieron: {producto.stockInicial} productos</p>
					{producto.stockActual > 0 ? (
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
