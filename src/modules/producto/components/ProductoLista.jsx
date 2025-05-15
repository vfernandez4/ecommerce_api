import React from "react"; // Importa React
import ProductoCard from "./ProductoCard"; // Importa el componente ProductoCard
import styles from "./productoLista.module.css"; // Importa los estilos CSS del componente ProductoLista

const ProductoLista = ({ productos }) => { // Componente funcional ProductoLista que recibe una lista de productos como prop
  return (
    <div className={styles.grid}> {/* Contenedor con estilo de grilla */}
      {productos.map((producto) => ( // Itera sobre la lista de productos
        <ProductoCard key={producto.id} producto={producto} /> // Renderiza un ProductoCard para cada producto, pasando el producto como prop
      ))}
    </div>
  );
};

export default ProductoLista; // Exporta el componente ProductoLista como predeterminado
