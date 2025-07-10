import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import HistoryCard from "./components/HistoryCard";

const Profile = () => {
	const [usuarioData, setUsuarioData] = useState(null);
	const [comprados, setComprados] = useState([]);
	const [vendidos, setVendidos] = useState([]);

	useEffect(() => {
		const cargarPerfil = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) throw new Error("No hay token");

				// Obtener usuario
				const resUser = await fetch("http://localhost:8082/api/usuarios/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!resUser.ok) throw new Error("Error al obtener usuario");
				const user = await resUser.json();
				setUsuarioData(user);
				setComprados(user.productosComprados);
				setVendidos(user.productosVendidos);
			} catch (e) {
				console.error("Error al cargar perfil:", e);
			}
		};
		cargarPerfil();
	}, []);

	if (!usuarioData) return <p className={styles.body}>Cargando perfil...</p>;

	return (
		<div className={styles["body"]}>
			<div className={styles["page_container"]}>
				<nav className={styles["profile"]}>
					<img className={styles["profile_img"]} src={usuarioData.avatar} alt="imagen" />
				</nav>
				<div className={styles["data"]}>
					<section className={styles["data_section"]}><h1>Nombre</h1><p>{usuarioData.nombreCompleto}</p></section>
					<section className={styles["data_section"]}><h1>Dirección</h1><p>{usuarioData.direccion}</p></section>
					<section className={styles["data_section"]}><h1>Teléfono</h1><p>{usuarioData.telefono}</p></section>
					<section className={styles["data_section"]}><h1>Email</h1><p>{usuarioData.email}</p></section>
					<section className={styles["data_section"]}><h2>Fecha de nacimiento</h2><p>{usuarioData.fechaNacimiento}</p></section>
				</div>
			</div>

			<section className={styles["history"]}>
				<div className={styles["child_history"]}>
					<h2>Historial de compras</h2>
					{comprados.map((producto) => (
						<HistoryCard key={producto.id} {...producto} />
					))}
				</div>
				<div className={styles["child_history"]}>
					<h2>Historial de ventas</h2>
					{vendidos.map((producto) => (
						<HistoryCard key={producto.id} {...producto} />
					))}
				</div>
			</section>
		</div>
	);
};

export default Profile;
