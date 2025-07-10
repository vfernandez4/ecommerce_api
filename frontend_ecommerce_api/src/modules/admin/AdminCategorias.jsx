import React, { useState, useEffect } from "react";
import styles from "./adminCategorias.module.css";

export default function AdminCategorias() {
	const [categories, setCategories] = useState([]);
	const [newCategory, setNewCategory] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);


	const fetchCategories = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:8082/api/categorias", {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) throw new Error("No se pudieron cargar las categorías");
			const data = await res.json();
			setCategories(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!newCategory.trim()) return;
		try {
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:8082/api/categorias", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ nombre: newCategory.trim() }),
			});
			if (!res.ok) throw new Error("Error al crear la categoría");
			const created = await res.json();
			setCategories((prev) => [...prev, created]);
			setNewCategory("");
		} catch (err) {
			alert(err.message);
		}
	};

	if (loading) return <p className={styles.loading}>Cargando categorías…</p>;
	if (error) return <p className={styles.error}>Error: {error}</p>;

	return (
		<div className={styles.container}>
			<div className={styles.formSection}>
				<h2 className={styles.header}>Crear Categoría</h2>
				<form onSubmit={handleSubmit} className={styles.form}>
					<input
						type="text"
						placeholder="Nombre de la categoría"
						value={newCategory}
						onChange={(e) => setNewCategory(e.target.value)}
						className={styles.input}
					/>
					<button type="submit" className={styles.button}>
						Crear
					</button>
				</form>
			</div>

			<div className={styles.listSection}>
				<h2 className={styles.header}>Categorías Existentes</h2>
				{categories.length === 0 ? (
					<p>No hay categorías aún.</p>
				) : (
					<ul className={styles.list}>
						{categories.map((cat) => (
							<li key={cat.id} className={styles.listItem}>
								{cat.nombre}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
