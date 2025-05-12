import React, { useState, useEffect } from "react"; // Importa React y los hooks useState y useEffect
import { Link } from "react-router-dom"; // Importa el componente Link para navegación
import styles from "./home.module.css"; // Importa los estilos CSS del componente Home

export default function Home() { // Componente funcional Home
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

	const productosDestacados = productos.filter((p) => p.stock > 0).slice(0, 4); // Filtra productos con stock y toma los primeros 4

	return (
		<div className={styles.home}> {/* Contenedor principal de la página Home */}
			<div className={styles.banner}> {/* Sección del banner promocional */}
				<p>¡12 cuotas sin interés en todos los productos!</p> {/* Mensaje promocional */}
				<p>¡Solo por este mes!</p> {/* Mensaje adicional */}
			</div>

			<section className={styles.productosDestacadosSection}> {/* Sección de productos destacados */}
				<h2 className={styles.tituloSeccionDestacados}>Productos destacados</h2> {/* Título de la sección */}
				<div className={styles.grillaDestacados}> {/* Contenedor de la grilla de productos */}
					{productosDestacados.map((prod) => ( // Itera sobre los productos destacados
						<div key={prod.id} className={styles.card}> {/* Tarjeta de producto */}
							<img
								src={prod.imagen} // Imagen del producto
								alt={prod.nombre} // Texto alternativo con el nombre del producto
								className={styles.cardImg} // Clase para estilos de la imagen
							/>
							<h3 className={styles.cardTitulo}>{prod.nombre}</h3> {/* Nombre del producto */}
							<p className={styles.cardPrecio}>${prod.precio}</p> {/* Precio del producto */}
						</div>
					))}
				</div>
				<Link to="/producto" className={styles.botonVerTodos}> {/* Enlace para ver todos los productos */}
					Ver todos los productos
				</Link>
			</section>
		</div>
	);
}
