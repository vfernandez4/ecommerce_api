import React, { useState } from "react"; // Importa React y el hook useState
import styles from "./vender.module.css"; // Importa los estilos CSS del componente Vender

export default function Vender() { // Componente funcional Vender
	const [nombre, setNombre] = useState(""); // Estado para almacenar el nombre del producto
	const [categoria, setCategoria] = useState(""); // Estado para almacenar la categoría del producto
	const [precio, setPrecio] = useState(0); // Estado para almacenar el precio del producto
	const [descripcion, setDescripcion] = useState(""); // Estado para almacenar la descripción del producto

	const categorias = [ // Lista de categorías disponibles
		{ value: "smartphones", label: "Smartphones" }, // Categoría Smartphones
		{ value: "computadoras", label: "Computadoras" }, // Categoría Computadoras
		{ value: "audio", label: "Audio" }, // Categoría Audio
		{ value: "accesorios", label: "Accesorios" }, // Categoría Accesorios
	];

	const captarNombre = (e) => { // Maneja el cambio en el campo de nombre
		setNombre(e.target.value); // Actualiza el estado con el valor ingresado
	};
	const captarCategoria = (e) => { // Maneja el cambio en el campo de categoría
		setCategoria(e.target.value); // Actualiza el estado con el valor seleccionado
	};
	const captarPrecio = (e) => { // Maneja el cambio en el campo de precio
		setPrecio(e.target.value); // Actualiza el estado con el valor ingresado
	};
	const captarDescripcion = (e) => { // Maneja el cambio en el campo de descripción
		setDescripcion(e.target.value); // Actualiza el estado con el valor ingresado
	};
	const handleSubmit = async (e) => { // Maneja el envío del formulario
		e.preventDefault(); // Previene el comportamiento por defecto del formulario
		const productoAVender = { // Crea un objeto con los datos del producto
			nombre, // Nombre del producto
			categoria, // Categoría del producto
			precio, // Precio del producto
			descripcion, // Descripción del producto
			stock: 1 // Stock inicial del producto
		};

		console.log(productoAVender); // Imprime el producto en la consola

		try {
			const res = await fetch("http://localhost:4000/productos", { // Realiza una solicitud POST para guardar el producto
				method: "POST", // Método HTTP POST
				headers: { "Content-Type": "application/json" }, // Cabecera indicando que el cuerpo es JSON
				body: JSON.stringify(productoAVender), // Convierte el objeto producto a JSON
			});
			if (!res.ok) throw new Error("Error al publicar un producto"); // Lanza un error si la respuesta no es exitosa
		} catch (err) { // Maneja errores en la solicitud
			console.error(err); // Imprime el error en la consola
			setError("No se pudo conectar con el servidor."); // Muestra un mensaje de error
		}
		setNombre(""); // Limpia el campo de nombre
		setCategoria(""); // Limpia el campo de categoría
		setPrecio(0); // Limpia el campo de precio
		setDescripcion(""); // Limpia el campo de descripción
	};

	return (
		<div className={styles.contenedor}> {/* Contenedor principal del formulario */}
			<h1 className={styles.titulo}>¡Vende tu producto!</h1> {/* Título del formulario */}
			<form className={styles.form} onSubmit={handleSubmit}> {/* Formulario con el manejador de envío */}
				<label>
					¿Cómo se llama tu producto?:
					<input type="text" name="nombre" value={nombre} onChange={captarNombre} required /> {/* Campo para ingresar el nombre */}
				</label>
				<label> ¿En qué categoría lo publicás?:
					<select name="categoria" value={categoria} onChange={captarCategoria} required > {/* Campo para seleccionar la categoría */}
						<option value=""></option> {/* Opción vacía */}
						{categorias.map((cat) => ( // Itera sobre las categorías disponibles
							<option key={cat.value} value={cat.value}>
								{cat.label} {/* Muestra la etiqueta de la categoría */}
							</option>
						))}
					</select>
				</label>
				<label>Precio:
					<input type="number" name="precio" min="0" value={precio} onChange={captarPrecio} required /> {/* Campo para ingresar el precio */}
				</label>
				<label> Descripción:
					<textarea name="descripcion" rows="6" value={descripcion} onChange={captarDescripcion} required /> {/* Campo para ingresar la descripción */}
				</label>
				<button type="submit" className={styles.botonPublicar}> Publicar producto </button> {/* Botón para enviar el formulario */}
			</form>
		</div>
	);
}
