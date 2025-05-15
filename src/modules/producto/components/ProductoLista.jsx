import React from "react"; 
import ProductoCard from "./ProductoCard"; 
import styles from "./productoLista.module.css"; 

const ProductoLista = ({ productos }) => { 
  return (
    <div className={styles.grid}> 
      {productos.map((producto) => ( 
        <ProductoCard key={producto.id} producto={producto} /> 
      ))}
    </div>
  );
};

export default ProductoLista; 