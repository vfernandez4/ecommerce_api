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
import AdminHome from "./modules/admin/AdminHome";
import AdminUsuarios from "./modules/admin/AdminUsuarios";
import AdminProductos from "./modules/admin/AdminProductos";
import AdminCategorias from "./modules/admin/AdminCategorias";

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

								{/* RUTAS protegidas por roles */}
								<Route path="/profile" element={
									<ProtectedRoute allowedRoles={["COMPRADOR", "COMPRADOR_VENDEDOR", "ADMIN"]}>
										<Profile />
									</ProtectedRoute>
								} />
								<Route path="/carrito" element={
									<ProtectedRoute allowedRoles={["COMPRADOR", "COMPRADOR_VENDEDOR"]}>
										<Carrito />
									</ProtectedRoute>
								} />
								<Route path="/pago" element={
									<ProtectedRoute allowedRoles={["COMPRADOR", "COMPRADOR_VENDEDOR"]}>
										<Pago />
									</ProtectedRoute>
								} />
								<Route path="/vender" element={
									<ProtectedRoute allowedRoles={["COMPRADOR", "COMPRADOR_VENDEDOR", "ADMIN"]}>
										<Vender />
									</ProtectedRoute>
								} />

								{/* RUTAS solo ADMIN */}
								<Route path="/admin" element={
									<ProtectedRoute allowedRoles={["ADMIN"]}>
										<AdminHome />
									</ProtectedRoute>
								} />

								<Route path="/admin/usuarios" element={
									<ProtectedRoute allowedRoles={["ADMIN"]}>
										<AdminUsuarios />
									</ProtectedRoute>
								} />

								<Route path="/admin/productos" element={
									<ProtectedRoute allowedRoles={["ADMIN"]}>
										<AdminProductos />
									</ProtectedRoute>
								} />

								<Route path="/admin/categorias" element={
									<ProtectedRoute allowedRoles={["ADMIN"]}>
										<AdminCategorias />
									</ProtectedRoute>
								} />

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
