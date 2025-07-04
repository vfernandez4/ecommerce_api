import { createContext, useContext, useEffect, useState } from "react";

const CategoriaContext = createContext();

export const CategoriaProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const res = await fetch("http://localhost:8082/api/categorias", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!res.ok) throw new Error("Error al obtener categorías");
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      console.error("Error cargando categorías:", err);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <CategoriaContext.Provider value={{ categorias, fetchCategorias }}>
      {children}
    </CategoriaContext.Provider>
  );
};

export const useCategorias = () => useContext(CategoriaContext);
