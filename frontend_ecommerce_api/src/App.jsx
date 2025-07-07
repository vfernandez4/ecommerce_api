import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./modules/home/Home";
import Producto from "./modules/producto/Producto";
import Carrito from "./modules/carrito/Carrito";
import Login from "./modules/login/Login";
import Registro from "./modules/registro/Registro";
import Profile from "./modules/profile/Profile";
import Pago from "./modules/pago/Pago";
import Vender from "./modules/vender/Vender";
import ProductoDetalle from "./modules/productoDetalle/ProductoDetalle";
import ProtectedRoute from "./components/ProtectedRoute";
import { CarritoProvider } from "./context/CarritoContext";
import { CategoriaProvider } from "./context/CategoriaContext";

function App() {
	return (
		<Router>
			<CarritoProvider>
				<CategoriaProvider>
					<div className="appContainer">
						<Header />
						<main className="mainGenerico">
							<Routes>
								{/* públicas */}
								<Route path="/" element={<Home />} />
								<Route path="/producto" element={<Producto />} />
								<Route path="/producto/:id" element={<ProductoDetalle />} />
								<Route path="/producto/categoria/:categoria" element={<Producto />} />
								<Route path="/login" element={<Login />} />
								<Route path="/registro" element={<Registro />} />

								{/* RUTAS que requieren estar logueado (USER o ADMIN)
									la idea es que aca despues dividamos entre COMPRADOR, COMPRADOR_VENDEDOR Y ADMIN, por ahora lo dejo asi */}
								<Route path="/profile" element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]}><Profile /></ProtectedRoute>} />
								<Route path="/carrito" element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]}><Carrito /></ProtectedRoute>} />
								<Route path="/pago" element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]}><Pago /></ProtectedRoute>} />
								<Route path="/vender" element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]}><Vender /></ProtectedRoute>} />

								{/* RUTAS solo ADMIN */}


								{/* cualquier otra ruta */}
								<Route path="*" element={<Home />} />

							</Routes>
						</main>
						<Footer />
					</div>
				</CategoriaProvider>
			</CarritoProvider>
		</Router>
	);
}

export default App;
