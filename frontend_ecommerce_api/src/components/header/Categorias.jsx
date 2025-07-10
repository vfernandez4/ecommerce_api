import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCategorias } from "../../context/CategoriaContext";
import styles from "./Categorias.module.css";

export default function Categorias() {
	const { categorias } = useCategorias();
	const [abierto, setAbierto] = useState(false);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const location = useLocation();

	const toggleMenu = () => setAbierto(v => !v);

	useEffect(() => {
		const handleClickFuera = e => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setAbierto(false);
				buttonRef.current?.blur();
			}
		};
		document.addEventListener("mousedown", handleClickFuera);
		return () => document.removeEventListener("mousedown", handleClickFuera);
	}, []);

	useEffect(() => {
		setAbierto(false);
		buttonRef.current?.blur();
	}, [location]);

	return (
		<div ref={dropdownRef} className={styles.dropdown}>
			<button
				ref={buttonRef}
				onClick={toggleMenu}
				className={`${styles.boton} ${abierto ? styles.botonAbierto : ""}`}
			>
				Categorías ▾
			</button>

			<ul className={`${styles.menu} ${abierto ? styles.menuOpen : ""}`}>
				{categorias.map(cat => (
					<li key={cat.id}>
						<Link
							to={`/producto/categoria/${encodeURIComponent(cat.nombre)}`}
							onMouseDown={e => e.stopPropagation()}
							onClick={() => setAbierto(false)}
						>
							{cat.nombre}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
