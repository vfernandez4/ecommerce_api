import React, { useState, useEffect, useMemo } from "react";
import styles from "./adminHome.module.css";
import { KPICard, KPICardDelta } from "../../components/admin/KPICard";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

export default function AdminHome() {
	const [ventasHoy, setVentasHoy] = useState(0);
	const [ventasDelta, setVentasDelta] = useState(0);
	const [cantTotal, setCantTotal] = useState(0);
	const [cantTotalCompradores, setCantTotalCompradores] = useState(0);
	const [cantTotalVendedores, setCantTotalVendedores] = useState(0);
	const [todasLasVentas, setTodasLasVentas] = useState([]);

	const currencyFmt = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	});

	useEffect(() => {
		const hoy = new Date();
		const ayer = new Date(hoy);
		ayer.setDate(hoy.getDate() - 1);

		const fechaHoyStr = hoy.toISOString().slice(0, 10);
		const fechaAyerStr = ayer.toISOString().slice(0, 10);

		Promise.all([
			fetch(`http://localhost:8082/api/venta/cantidad-por-dia/${fechaHoyStr}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
				.then((res) => {
					if (!res.ok) throw new Error(res.status);
					return res.text();
				})
				.then((text) => parseInt(text, 10)),
			fetch(`http://localhost:8082/api/venta/cantidad-por-dia/${fechaAyerStr}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
				.then((res) => {
					if (!res.ok) throw new Error(res.status);
					return res.text();
				})
				.then((text) => parseInt(text, 10)),
		])
			.then(([countHoy, countAyer]) => {
				setVentasHoy(countHoy);
				setVentasDelta(
					countAyer === 0 ? 0 : Math.round(((countHoy - countAyer) / countAyer) * 100)
				);
			})
			.catch((err) => console.error("Error al obtener ventas:", err));
	}, []);

	useEffect(() => {
		const fetchTotalProductos = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) throw new Error("No hay token");
				const res = await fetch("http://localhost:8082/api/productos/cantidad-total", {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (!res.ok) throw new Error("Error al cargar total productos");
				const text = await res.text();
				setCantTotal(JSON.parse(text));
			} catch (e) {
				console.error(e);
			}
		};
		fetchTotalProductos();
	}, []);

	useEffect(() => {
		const fetchCompradores = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) throw new Error("No hay token");
				const res = await fetch(
					"http://localhost:8082/api/usuarios/cantidad-total-compradores",
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				if (!res.ok) throw new Error("Error al cargar total compradores");
				const text = await res.text();
				setCantTotalCompradores(JSON.parse(text));
			} catch (e) {
				console.error(e);
			}
		};
		fetchCompradores();
	}, []);

	useEffect(() => {
		const fetchVendedores = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) throw new Error("No hay token");
				const res = await fetch(
					"http://localhost:8082/api/usuarios/cantidad-total-vendedores",
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				if (!res.ok) throw new Error("Error al cargar total vendedores");
				const text = await res.text();
				setCantTotalVendedores(JSON.parse(text));
			} catch (e) {
				console.error(e);
			}
		};
		fetchVendedores();
	}, []);

	useEffect(() => {
		fetch("http://localhost:8082/api/venta", {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		})
			.then((res) => {
				if (!res.ok) throw new Error("Error al cargar ventas");
				return res.json();
			})
			.then((data) => setTodasLasVentas(data))
			.catch((err) => console.error(err));
	}, []);

	const ventasOrdenadas = useMemo(() => {
		return [...todasLasVentas].sort(
			(a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
		);
	}, [todasLasVentas]);

	return (
		<div className={styles.dashboard}>
			<div className={styles.kpis}>
				<KPICardDelta title="Ventas Hoy" value={ventasHoy} delta={ventasDelta} />
				<KPICard title="Total Productos" value={cantTotal} />
				<KPICard title="Compradores" value={cantTotalCompradores} />
				<KPICard title="Vendedores" value={cantTotalVendedores} />
			</div>

			<div className={styles.charts}>
				<div className={styles.chartContainer}>
					<h2 className={styles.chartTitle}>Monto total de ventas por día</h2>
					<ResponsiveContainer width="100%" height={250}>
						<LineChart data={todasLasVentas}>
							<XAxis dataKey="fecha" />
							<YAxis />
							<Tooltip formatter={(value) => currencyFmt.format(value)} />
							<Line dataKey="total" stroke="#4a90e2" strokeWidth={2} />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className={styles.salesListContainer}>
				<h2 className={styles.listTitle}>Listado de todas las Ventas</h2>
				{ventasOrdenadas.length === 0 ? (
					<p className={styles.noSales}>No hay ventas aún.</p>
				) : (
					<div className={styles.salesGrid}>
						{ventasOrdenadas.map((v) => (
							<div key={v.id} className={styles.saleCard}>
								<div className={styles.saleHeader}>
									<div className={styles.saleDate}>
										{new Date(v.fecha).toLocaleString("es-AR", {
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
									<div className={styles.saleTotal}>{currencyFmt.format(v.total)}</div>
									<div className={styles.saleBuyer}>User #{v.comprador_id}</div>
								</div>
								<div className={styles.itemsList}>
									{v.items.map((it) => (
										<div key={it.id} className={styles.item}>
											<span>ID: {it.productoId}</span>
											<span>Cant: {it.cantidad}</span>
											<span>{currencyFmt.format(it.subtotal)}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
