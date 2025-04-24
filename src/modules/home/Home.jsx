import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import productosData from "../../data/productos.json";

export default function Home() {
	const productosDestacados = productosData.slice(0, 4);

	return (
		<div className={styles.home}>
			<div className={styles.banner}>
				<p>¡12 cuotas sin interés en todos los productos!</p>
				<p>¡Solo por este mes!</p>
			</div>

			<section className={styles.productosDestacadosSection}>
				<h2 className={styles.tituloSeccionDestacados}>Productos destacados</h2>
				<div className={styles.grillaDestacados}>
					{productosDestacados.map((prod) => (
						<div key={prod.id} className={styles.card}>
							<img
								src={prod.imagen}
								alt={prod.nombre}
								className={styles.cardImg}
							/>
							<h3 className={styles.cardTitulo}>{prod.nombre}</h3>
							<p className={styles.cardPrecio}>${prod.precio}</p>
						</div>
					))}
				</div>
				<Link to="/producto" className={styles.botonVerTodos}>
					Ver todos los productos
				</Link>
			</section>
		</div>
	);
}
