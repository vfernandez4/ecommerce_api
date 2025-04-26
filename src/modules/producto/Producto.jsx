import React from "react";
import { useParams } from "react-router-dom";
import productos from "../../data/productos.json";
import ProductoLista from "./components/ProductoLista";
import styles from "./producto.module.css";

const Producto = () => {
  const { categoria } = useParams(); 
  const categorias = {};

  productos.forEach((producto) => {
    if (!categorias[producto.categoria]) {
      categorias[producto.categoria] = [];
    }
    categorias[producto.categoria].push(producto);
  });

  const categoriasAMostrar = categoria
    ? { [categoria]: categorias[categoria] }
    : categorias;

  return (
    <div className={styles.catalogo}>
      <h1 className={styles.titulo}>Catálogo de Productos</h1>

      {Object.entries(categoriasAMostrar).map(([categoria, productos]) => (
        <div key={categoria} className={styles.categoriaGrupo}>
          <h2 className={styles.categoriaTitulo}>{categoria.toUpperCase()}</h2>
          <ProductoLista productos={productos} />
        </div>
      ))}
    </div>
  );
};

export default Producto;
