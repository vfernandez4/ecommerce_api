import React, { useState } from "react";
import styles from "./vender.module.css";

export default function Vender() {
	const [nombre, setNombre] = useState("");
	const [categoria, setCategoria] = useState("");
	const [precio, setPrecio] = useState(0);
	const [descripcion, setDescripcion] = useState("");

	const categorias = [
		{ value: "smartphones", label: "Smartphones" },
		{ value: "computadoras", label: "Computadoras" },
		{ value: "audio", label: "Audio" },
		{ value: "accesorios", label: "Accesorios" },
	];

	const captarNombre = (e) => {
		setNombre(e.target.value);
	};
	const captarCategoria = (e) => {
		setCategoria(e.target.value);
	};
	const captarPrecio = (e) => {
		setPrecio(e.target.value);
	};
	const captarDescripcion = (e) => {
		setDescripcion(e.target.value);
	};
	const handleSubmit = (e) => {
		setNombre("");
		setCategoria("");
		setPrecio(0);
		setDescripcion("");
	};

	return (
		<div className={styles.contenedor}>
			<h1 className={styles.titulo}>¡Vende tu producto!</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label>
					¿Cómo se llama tu producto?:
					<input type="text" name="nombre" value={nombre} onChange={captarNombre} required />
				</label>
				<label> ¿En qué categoría lo publicás?:
					<select name="categoria" value={categoria} onChange={captarCategoria} required >
						<option value=""></option>
						{categorias.map((cat) => (
							<option key={cat.value} value={cat.value}>
								{cat.label}
							</option>
						))}
					</select>
				</label>
				<label>Precio:
					<input type="number" name="precio" min="0" value={precio} onChange={captarPrecio} required />
				</label>
				<label> Descripción:
					<textarea name="descripcion" rows="6" value={descripcion} onChange={captarDescripcion} required />
				</label>
				<button type="submit" className={styles.botonPublicar}> Publicar producto </button>
			</form>
		</div>
	);
}
