import React from "react";
import styles from "./HistoryCard.module.css";

const HistoryCard = ({ nombre, precio, imagen, descripcion }) => {
	const imagenPath = "http://localhost:8082/api/images/" + imagen
	return (
		<div className={styles["history_card"]}>
			<img className={styles["profile_img"]} src={imagenPath} alt={nombre} />
			<div className={styles["history_card_info"]}>
				<h1>{nombre}</h1>
				<p>Precio: ${precio}</p>
				<p>{descripcion}</p>
			</div>
		</div>
	);
};

export default HistoryCard;