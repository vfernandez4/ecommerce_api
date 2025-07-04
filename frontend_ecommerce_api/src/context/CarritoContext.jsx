import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  const agregarProducto = (nuevoProducto) => {
    setCarrito(prevCarrito => {
      const existente = prevCarrito.find(item => item.id === nuevoProducto.id);
      if (existente) {
        return prevCarrito.map(item =>
          item.id === nuevoProducto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...nuevoProducto, cantidad: 1 }];
      }
    });
  };

  const cambiarCantidad = (id, cantidadNueva) => {
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, cantidadNueva) } 
          : item
      )
    );
  };

  const eliminarProducto = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };
  

  return (
    <CarritoContext.Provider 
        value={{ 
            carrito, 
            setCarrito, 
            agregarProducto,
            cambiarCantidad, 
            eliminarProducto,
            vaciarCarrito,
            cantidadTotal 
            }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
