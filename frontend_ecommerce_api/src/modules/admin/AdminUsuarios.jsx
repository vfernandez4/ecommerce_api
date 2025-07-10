import React, { useState, useEffect } from "react";
import styles from "./adminUsuarios.module.css";

export default function AdminUsuarios() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRequests = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await fetch(
					"http://localhost:8082/api/usuarios/pendiente-aprobacion",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (!res.ok) throw new Error("No se pudieron cargar las solicitudes");
				const data = await res.json();
				setUsers(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchRequests();
	}, []);

	const handleApprove = async (userId) => {
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(
				`http://localhost:8082/api/usuarios/${userId}/aprobar-solicitud`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!res.ok) throw new Error("Error al aprobar la solicitud");
			setUsers((prev) => prev.filter((u) => u.id !== userId));
		} catch (err) {
			alert(err.message);
		}
	};

	if (loading)
		return <div className={styles.loading}>Cargando solicitudes…</div>;
	if (error)
		return <div className={styles.error}>Error: {error}</div>;

	return (
		<div className={styles.container}>
			<h2 className={styles.header}>Solicitudes para ser VENDEDOR</h2>
			{users.length === 0 ? (
				<p>No hay solicitudes pendientes.</p>
			) : (
				<table className={styles.userList}>
					<thead>
						<tr>
							<th>Nombre Completo</th>
							<th>Email</th>
							<th>Fecha Nacimiento</th>
							<th>Direccion</th>
							<th>Telefono</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td>{user.nombreCompleto}</td>
								<td>{user.email}</td>
								<td>{user.fechaNacimiento}</td>
								<td>{user.direccion}</td>
								<td>{user.telefono}</td>
								<td>
									<button
										className={styles.approveButton}
										onClick={() => handleApprove(user.id)}
									>
										Aprobar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
