import React from "react";
import styles from "./Header.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import Categorias from "./Categorias";
import { jwtDecode } from "jwt-decode";

function NavLogeado({ cerrarSesion }) {
	const { cantidadTotal } = useCarrito();

	return (
		<ul className={`${styles.flex_horizontal} ${styles.margen_horizontal} ${styles.items_centro} ${styles.barrita_navegacion} ${styles.fondo_circular}`}>
			<li><Link to="/producto">Todos Los Productos</Link></li>
			<li><Link to="/producto/categoria/Originales ClickCo">Originales ClickCo</Link></li>
			<li><Categorias /></li>
			<li><Link to="/vender">¡Vender!</Link></li>
			<li><Link to="/profile">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
			</Link></li>
			<li className={styles.carritoIcono}>
				<Link to="/carrito">
					<div className={styles.carritoContenedor}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
						{cantidadTotal > 0 && (
							<span className={styles.carritoBadge}>{cantidadTotal}</span>
						)}
					</div>
				</Link>
			</li>
			<li>
				<button
					onClick={cerrarSesion}
					style={{
						background: "transparent",
						border: "none",
						cursor: "pointer",
						color: "#fff",
						fontSize: "1rem",
						padding: "0.5rem 1rem"
					}}
				>
					Cerrar Sesión
				</button>
			</li>
		</ul>
	);
}

function NavSinLog() {
	return (
		<ul className={`${styles.flex_horizontal} ${styles.margen_horizontal} ${styles.items_centro} ${styles.barrita_navegacion} ${styles.fondo_circular}`}>
			<li><Link to="/producto">Todos Los Productos</Link></li>
			<li><Categorias /></li>
			<li><Link to="/registro">Registrarse</Link></li>
			<li><Link to="/login">Iniciar Sesión</Link></li>
		</ul>
	);
}

function NavAdmin({ cerrarSesion }) {
	return (
		<ul className={`${styles.flex_horizontal} ${styles.margen_horizontal} ${styles.items_centro} ${styles.barrita_navegacion} ${styles.fondo_circular}`}>
			<li><Link to="/admin/productos">Crear productos ClickCo</Link></li>
			<li><Link to="/admin/categorias">Crear categorías</Link></li>
			<li><Link to="/admin/usuarios">Gestionar usuarios</Link></li>
			<li>
				<button
					onClick={cerrarSesion}
					style={{
						background: "transparent",
						border: "none",
						cursor: "pointer",
						color: "#fff",
						fontSize: "1rem",
						padding: "0.5rem 1rem"
					}}
				>
					Cerrar Sesión
				</button>
			</li>
		</ul>
	);
}

export default function Header() {
	const location = useLocation();
	const navigate = useNavigate();

	const token = localStorage.getItem("token");
	const estaLogeado = Boolean(token);

	let rol = null;

	if (estaLogeado) {
		try {
			const payload = jwtDecode(token);
			rol = payload.rol;
			console.log("Rol extraído del token:", rol);
		} catch (error) {
			console.error("Token inválido:", error);
			localStorage.removeItem("token");
		}
	}

	const cerrarSesion = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		localStorage.removeItem("carrito");
		navigate("/");
		window.location.reload();
	};

	return (
		<header className={`${styles.encabezado} ${styles.display_flex} ${styles.items_centro}`}>
			<div className={styles.logo}>
				<Link to="/">
					<img src="/logo.png" alt="Logo ClickCo" />
				</Link>
			</div>

			<nav className={styles.width_completo}>
				{!rol && <NavSinLog />}
				{rol === "ADMIN" && <NavAdmin cerrarSesion={cerrarSesion} />}
				{(rol === "COMPRADOR" || rol === "COMPRADOR_VENDEDOR") && (
					<NavLogeado cerrarSesion={cerrarSesion} />
				)}
			</nav>
		</header>
	);
}
