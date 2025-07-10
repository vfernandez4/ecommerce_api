import React from "react";
import styles from "./productoCard.module.css";
import { Link } from "react-router-dom";

const ProductoCard = ({ producto }) => {
	const { nombre, precio, imagen, stockActual } = producto;

	return (
		<div className={styles.card}>
			<img src={imagen} alt={nombre} className={styles.imagen} />
			<div className={styles.info}>
				<h3 className={styles.nombre}>{nombre}</h3>
				<p className={styles.precio}>Precio: ${precio}</p>
				<p className={styles.precio}>Quedan: {stockActual} disponibles</p>
				<Link to={`/producto/${producto.id}`} className={styles.boton}>
					Ver detalle
				</Link>
			</div>
		</div>
	);
};

export default ProductoCard;
