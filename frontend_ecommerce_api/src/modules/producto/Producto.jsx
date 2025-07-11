import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductoLista from "./components/ProductoLista";
import styles from "./producto.module.css";

const Producto = () => {
	const { categoria } = useParams();
	const categorias = {};

	const [productos, setProductos] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8082/api/productos", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				if (!res.ok) throw new Error("Error al cargar productos");
				return res.json();
			})
			.then((data) => setProductos(data))
			.catch((err) => console.error(err));
	}, []);

	productos.forEach((producto) => {
		const nombreCategoria = producto.categoriaNombre || "Sin categoría";
		if (!categorias[nombreCategoria]) {
			categorias[nombreCategoria] = [];
		}
		categorias[nombreCategoria].push(producto);
	});

	const categoriaFiltrada = categoria?.toLowerCase();

	const categoriasAMostrar = categoriaFiltrada
		? Object.entries(categorias).reduce((acc, [nombre, productos]) => {
			if (nombre.toLowerCase() === categoriaFiltrada) {
				acc[nombre] = productos;
			}
			return acc;
		}, {})
		: categorias;

	return (
		<div className={styles.catalogo}>
			<h1 className={styles.titulo}>Catálogo de Productos</h1>

			{Object.entries(categoriasAMostrar).map(([categoria, productos]) => (
				<div key={categoria} className={styles.categoriaGrupo}>
					<h2 className={styles.categoriaTitulo}>{categoria.toUpperCase()}</h2>
					<ProductoLista productos={productos} />
				</div>
			))}
		</div>
	);
};

export default Producto;
