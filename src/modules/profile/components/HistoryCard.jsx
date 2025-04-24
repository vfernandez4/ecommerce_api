import React from "react";
import styles from "./HistoryCard.module.css";

const HistoryCard = ({ nombre, precio, fecha, imagen }) => {
  return (
    <div className={styles["history_card"]}>
      <img className={styles["profile_img"]} src={imagen} alt={nombre} />
      <div className={styles["history_card_info"]}>
        <h1>{nombre}</h1>
        <p>Precio: ${precio}</p>
        <p>Fecha de compra: {fecha}</p>
      </div>
    </div>
  );
};

export default HistoryCard;