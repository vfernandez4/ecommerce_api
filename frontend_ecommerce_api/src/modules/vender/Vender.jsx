import React, { useState } from "react";
import styles from "./vender.module.css";
import { useCategorias } from "../../context/CategoriaContext"; // 💡 Importamos el contexto

export default function Vender() {
	const [nombre, setNombre] = useState("");
	const [categoriaId, setCategoriaId] = useState("");
	const [precio, setPrecio] = useState(0);
	const [descripcion, setDescripcion] = useState("");
	const [imagen, setImagen] = useState("");
	const [nuevaCategoria, setNuevaCategoria] = useState(false);
	const [nuevaCategoriaNombre, setNuevaCategoriaNombre] = useState("");
	const [error, setError] = useState("");

	const { categorias, fetchCategorias } = useCategorias(); // 💡 Usamos el contexto

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		let nuevaId = categoriaId;

		if (nuevaCategoria) {
			if (!nuevaCategoriaNombre.trim()) {
				setError("Debe ingresar un nombre para la nueva categoría.");
				return;
			}
			try {
				const res = await fetch("http://localhost:8082/api/categorias", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({ nombre: nuevaCategoriaNombre }),
				});
				if (!res.ok) throw new Error("Error al crear nueva categoría");

				const data = await res.json();
				nuevaId = data.id;

				await fetchCategorias(); // 💡 Actualizamos las categorías globales
			} catch (err) {
				console.error(err);
				setError("No se pudo crear la nueva categoría.");
				return;
			}
		}

		const productoAVender = {
			nombre,
			descripcion,
			precio: Number(precio),
			categoriaId: Number(nuevaId),
			imagen,
			stockInicial: 1,
		};

		try {
			const res = await fetch("http://localhost:8082/api/productos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(productoAVender),
			});
			if (!res.ok) throw new Error("Error al publicar el producto");
			alert("Producto publicado correctamente!");

			setNombre("");
			setDescripcion("");
			setPrecio(0);
			setCategoriaId("");
			setImagen("");
			setNuevaCategoria(false);
			setNuevaCategoriaNombre("");
		} catch (err) {
			console.error(err);
			setError("No se pudo conectar con el servidor.");
		}
	};

	return (
		<div className={styles.contenedor}>
			<h1 className={styles.titulo}>¡Vende tu producto!</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label>Nombre:
					<input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
				</label>

				<label>Categoría:
					<select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required disabled={nuevaCategoria}>
						<option value="">Seleccione</option>
						{categorias.map(cat => (
							<option key={cat.id} value={cat.id}>{cat.nombre}</option>
						))}
					</select>
				</label>

				<div className={styles.checkboxRow}>
					<label htmlFor="crearCategoria" className={styles.checkboxLabel}>
						Crear nueva categoría
					</label>
					<input
						id="crearCategoria"
						type="checkbox"
						checked={nuevaCategoria}
						onChange={(e) => setNuevaCategoria(e.target.checked)}
						className={styles.checkboxInput}
					/>
				</div>

				{nuevaCategoria && (
					<label>Nombre de la nueva categoría:
						<input
							type="text"
							value={nuevaCategoriaNombre}
							onChange={(e) => setNuevaCategoriaNombre(e.target.value)}
							required
						/>
					</label>
				)}

				<label>Precio:
					<input type="number" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
				</label>

				<label>Descripción:
					<textarea rows="6" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
				</label>

				<label>Nombre de la imagen:
					<input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
				</label>

				<button type="submit" className={styles.botonPublicar}>Publicar producto</button>

				{error && <p className={styles.error}>{error}</p>}
			</form>
		</div>
	);
}
