import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./modules/login/Login";
import Registro from "./modules/registro/Registro"; // Importa el componente de registro
import Producto from "./modules/producto/Producto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} /> {/* Ruta de registro */}
        <Route path="/productos" element={<Producto />} />
      </Routes>
    </Router>
  );
}

export default App;
