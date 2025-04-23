import React from "react";
import productos from "../../data/productos.json";
import ProductoLista from "./components/ProductoLista";
import styles from "./producto.module.css";

const Producto = () => {
  const categorias = {};

  productos.forEach((producto) => {
    if (!categorias[producto.categoria]) {
      categorias[producto.categoria] = [];
    }
    categorias[producto.categoria].push(producto);
  });

  return (
    <div className={styles.catalogo}>
      <h1 className={styles.titulo}>Catálogo de Productos</h1>

      {Object.entries(categorias).map(([categoria, productos]) => (
        <div key={categoria} className={styles.categoriaGrupo}>
          <h2 className={styles.categoriaTitulo}>{categoria.toUpperCase()}</h2>
          <ProductoLista productos={productos} />
        </div>
      ))}
    </div>
  );
};

export default Producto;
