import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Mi E-commerce</h1>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/productos">Productos</a></li>
          <li><a href="/carrito">Carrito</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;