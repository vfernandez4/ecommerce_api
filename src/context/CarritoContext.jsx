import { createContext, useContext, useEffect, useState } from "react"; // Importa funciones necesarias de React

const CarritoContext = createContext(); // Crea un contexto para el carrito

export const CarritoProvider = ({ children }) => { // Proveedor del contexto del carrito
  const [carrito, setCarrito] = useState(() => { // Estado para almacenar los productos del carrito
    const guardado = localStorage.getItem("carrito"); // Obtiene el carrito guardado en localStorage
    return guardado ? JSON.parse(guardado) : []; // Si existe, lo parsea; si no, inicializa como un array vacío
  });

  useEffect(() => { // Efecto para guardar el carrito en localStorage cada vez que cambia
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito actualizado en localStorage
  }, [carrito]); // Se ejecuta cuando el carrito cambia

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0); // Calcula la cantidad total de productos en el carrito

  const agregarProducto = (nuevoProducto) => { // Función para agregar un producto al carrito
    setCarrito(prevCarrito => { // Actualiza el estado del carrito
      const existente = prevCarrito.find(item => item.id === nuevoProducto.id); // Busca si el producto ya está en el carrito
      if (existente) { // Si el producto ya existe
        return prevCarrito.map(item => // Actualiza la cantidad del producto existente
          item.id === nuevoProducto.id
            ? { ...item, cantidad: item.cantidad + 1 } // Incrementa la cantidad en 1
            : item // Retorna los demás productos sin cambios
        );
      } else { // Si el producto no existe en el carrito
        return [...prevCarrito, { ...nuevoProducto, cantidad: 1 }]; // Agrega el nuevo producto con cantidad inicial de 1
      }
    });
  };

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito, agregarProducto, cantidadTotal }}> {/* Proveedor del contexto con valores */}
      {children} {/* Renderiza los componentes hijos */}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext); // Hook personalizado para usar el contexto del carrito
