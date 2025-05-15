import React, { useState, useEffect } from "react"; // Importa React y los hooks useState y useEffect
import { useParams } from "react-router-dom"; // Importa el hook useParams para obtener parámetros de la URL
import ProductoLista from "./components/ProductoLista"; // Importa el componente ProductoLista
import styles from "./producto.module.css"; // Importa los estilos CSS del componente Producto

const Producto = () => { // Componente funcional Producto
  const { categoria } = useParams(); // Obtiene el parámetro "categoria" de la URL
  const categorias = {}; // Objeto para agrupar productos por categoría

  const [productos, setProductos] = useState([]); // Estado para almacenar la lista de productos
  useEffect(() => { // Hook para ejecutar código al montar el componente
    fetch("http://localhost:4000/productos") // Realiza una solicitud a la API para obtener los productos
      .then((res) => { // Maneja la respuesta de la API
        if (!res.ok) throw new Error("Error al cargar productos"); // Lanza un error si la respuesta no es exitosa
        return res.json(); // Convierte la respuesta a JSON
      })
      .then((data) => setProductos(data)) // Actualiza el estado con los datos obtenidos
      .catch((err) => console.error(err)); // Maneja errores en la solicitud
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar

  productos.forEach((producto) => { // Itera sobre los productos obtenidos
    if (!categorias[producto.categoria]) { // Si la categoría no existe en el objeto
      categorias[producto.categoria] = []; // Inicializa un array para la categoría
    }
    categorias[producto.categoria].push(producto); // Agrega el producto a la categoría correspondiente
  });

  const categoriasAMostrar = categoria && categorias[categoria] // Determina las categorías a mostrar
    ? { [categoria]: categorias[categoria] } // Si hay una categoría en la URL, muestra solo esa
    : categorias; // Si no, muestra todas las categorías

  return (
    <div className={styles.catalogo}> {/* Contenedor principal del catálogo */}
      <h1 className={styles.titulo}>Catálogo de Productos</h1> {/* Título del catálogo */}

      {Object.entries(categoriasAMostrar).map(([categoria, productos]) => ( // Itera sobre las categorías a mostrar
        <div key={categoria} className={styles.categoriaGrupo}> {/* Contenedor de cada grupo de categoría */}
          <h2 className={styles.categoriaTitulo}>{categoria.toUpperCase()}</h2> {/* Título de la categoría en mayúsculas */}
          <ProductoLista productos={productos} /> {/* Componente que muestra la lista de productos */}
        </div>
      ))}
    </div>
  );
};

export default Producto; // Exporta el componente Producto como predeterminado
