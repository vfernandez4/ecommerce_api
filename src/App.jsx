import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './modules/home/Home';
import Producto from './modules/producto/Producto';
import Carrito from './modules/carrito/Carrito';
import Login from './modules/login/Login';
import Registro from './modules/registro/Registro';
import Profile from './modules/profile/Profile';
import Pago from './modules/pago/Pago';
import Vender from './modules/vender/Vender';
import ProductoDetalle from './modules/productoDetalle/ProductoDetalle';

function App() {
	return (
		<Router>
			<div className="appContainer">
				<Header />
				<main className="mainGenerico">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/producto" element={<Producto />} />
						<Route path="/carrito" element={<Carrito />} />
						<Route path="/login" element={<Login />} />
						<Route path="/registro" element={<Registro />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/pago" element={<Pago />} />
						<Route path="/vender" element={<Vender />} />
						<Route path="/producto/:id" element={<ProductoDetalle />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
