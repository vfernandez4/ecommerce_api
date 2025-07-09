import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./adminHome.module.css";
import KPICard from "../../components/admin/KPICard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie } from 'recharts';

export default function AdminHome() {

	const salesData = [
		{ date: '2025-06-09', sales: 400 },
		{ date: '2025-06-10', sales: 750 },
		// ... más datos
	];

	const topProductsData = [
		{ name: 'Producto A', sales: 240 },
		{ name: 'Producto B', sales: 190 },
		// ...
	];

	const ordersStatusData = [
		{ status: 'Pendiente', value: 40 },
		{ status: 'Enviado', value: 80 },
		{ status: 'Completado', value: 160 }
	];

	const recentOrders = [
		{ id: 1021, customer: 'Ana López', date: '2025-07-07', total: '$120', status: 'Pendiente' },
		{ id: 1020, customer: 'Luis Pérez', date: '2025-07-07', total: '$85', status: 'Enviado' },
		// ...
	];

	return (
		<div className={styles.dashboard}>
			<div className={styles.kpis}>
				<KPICard title="Total Ventas Hoy" value="$1.200" delta={5} />
				<KPICard title="Total Vendidos" value="35" delta={-2} />
				<KPICard title="Total No Vendidos" value="35" delta={-2} />
				<KPICard title="Total Productos" value="35" delta={-2} />
				<KPICard title="Total Usuarios Compradores" value="35" delta={-2} />
				<KPICard title="Total Usuarios Vendedores" value="35" delta={-2} />
			</div>

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
		</div>
	);
}


