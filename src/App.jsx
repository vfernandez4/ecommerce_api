import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./modules/login/Login";
import Registro from "./modules/registro/Registro"; 
import Producto from "./modules/producto/Producto";
import ProductoDetalle from "./modules/productoDetalle/ProductoDetalle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} /> 
        <Route path="/productos" element={<Producto />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
