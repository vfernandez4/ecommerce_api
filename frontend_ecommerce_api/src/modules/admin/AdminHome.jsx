import React, { useState, useEffect } from "react";
import styles from "./adminHome.module.css";
import {KPICard, KPICardDelta} from "../../components/admin/KPICard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie } from 'recharts';

export default function AdminHome() {
	const [ventasHoy, setVentasHoy] = useState(0);
	const [ventasDelta, setVentasDelta] = useState(0);
	const [cantTotal, setCantTotal] = useState(0); 
	const [cantTotalCompradores, setCantTotalCompradores] = useState(0); 
	const [cantTotalVendedores, setCantTotalVendedores] = useState(0); 

	useEffect(() => {
		const hoy = new Date();
		const ayer = new Date(hoy);
		ayer.setDate(hoy.getDate() - 1);

		const fechaHoyStr = hoy.toISOString().slice(0, 10);   // "2025-07-10"
		const fechaAyerStr = ayer.toISOString().slice(0, 10);  // "2025-07-09"
		
		Promise.all([
			fetch(`http://localhost:8082/api/venta/cantidad-por-dia/${fechaHoyStr}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			})
				.then(res => {
					if (!res.ok) throw new Error(`Error ${res.status}`);
					return res.text();
				})
				.then(text => parseInt(text, 10)),    // convierte "5" → 5

			fetch(`http://localhost:8082/api/venta/cantidad-por-dia/${fechaAyerStr}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			})
				.then(res => {
					if (!res.ok) throw new Error(`Error ${res.status}`);
					return res.text();
				})
				.then(text => parseInt(text, 10))
		])
			.then(([countHoy, countAyer]) => {
				setVentasHoy(countHoy);
				if (countAyer === 0) setVentasDelta(0);
				else setVentasDelta(Math.round(((countHoy - countAyer) / countAyer) * 100));
			})
			.catch(err => console.error('Error al obtener ventas:', err));
	}, []);

	useEffect(() => {
		const cantidadTotal = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) throw new Error("No hay token");

				const total = await fetch("http://localhost:8082/api/productos/cantidad-total", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!total.ok) throw new Error("Error al cargar el total de productos:");
				const text = await total.text();     // '"123"'
				const totalparse = JSON.parse(text);         // 123
				setCantTotal(totalparse);
			} catch (e) {
				console.error("Error al cargar el total de productos:", e);
			}
		};
		cantidadTotal();
	}, []);

	useEffect(() => {
		const cantUsuariosCompradores = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) throw new Error("No hay token");

				const total = await fetch("http://localhost:8082/api/usuarios/cantidad-total-compradores", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!total.ok) throw new Error("Error al cargar el total de compradores:");
				const text = await total.text();     // '"123"'
				const totalparse = JSON.parse(text);         // 123
				setCantTotalCompradores(totalparse);
			} catch (e) {
				console.error("Error al cargar el total de compradores:", e);
			}
		};
		cantUsuariosCompradores();
	}, []);

	useEffect(() => {
		const cantUsuariosVendedores = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) throw new Error("No hay token");

				const total = await fetch("http://localhost:8082/api/usuarios/cantidad-total-vendedores", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!total.ok) throw new Error("Error al cargar el total de vendedores:");
				const text = await total.text();     // '"123"'
				const totalparse = JSON.parse(text);         // 123
				setCantTotalVendedores(totalparse);
			} catch (e) {
				console.error("Error al cargar el total de vendedores:", e);
			}
		};
		cantUsuariosVendedores();
	}, []);


	return (
		<div className={styles.dashboard}>
			<div className={styles.kpis}>
				<KPICardDelta title="Total Ventas Hoy" value={ventasHoy} delta={ventasDelta} />
				<KPICard title="Total Productos" value={cantTotal} />
				<KPICard title="Total Usuarios Compradores" value={cantTotalCompradores} />
				<KPICard title="Total Usuarios Vendedores" value={cantTotalVendedores} />
			</div>
			{/* 
			<div className={styles.charts}>
				<div className={`${styles.chartContainer} ${styles.large}`}>
					<h2 className={styles.chartTitle}>Ventas por día</h2>
					<ResponsiveContainer width="100%" height={250}>
						<LineChart data={salesData}>
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Line dataKey="sales" stroke="#4a90e2" strokeWidth={2} />
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className={styles.chartContainer}>
					<h2 className={styles.chartTitle}>Top 5 productos</h2>
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={topProductsData}>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="sales" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className={styles.chartContainer}>
					<h2 className={styles.chartTitle}>Estado de pedidos</h2>
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={ordersStatusData}
								dataKey="value"
								nameKey="status"
								cx="50%"
								cy="50%"
								innerRadius={40}
								outerRadius={80}
								label
							/>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className={styles.recentOrders}>
				<h2 className={styles.sectionTitle}>Últimos pedidos</h2>
				<table className={styles.ordersTable}>
					<thead>
						<tr>
							<th>Nº Pedido</th>
							<th>Cliente</th>
							<th>Fecha</th>
							<th>Total</th>
							<th>Estado</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{recentOrders.map(order => (
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{order.customer}</td>
								<td>{order.date}</td>
								<td>{order.total}</td>
								<td><span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>{order.status}</span></td>
								<td><button className={styles.viewBtn}>Ver</button></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			*/}
		</div>
	);
}


