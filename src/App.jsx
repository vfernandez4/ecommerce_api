import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './modules/home/Home';
//import Producto from './modules/producto/Producto';
//import Carrito from './modules/carrito/Carrito';

function App() {
	return (
		<Router>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					{/*<Route path="/producto" element={<Producto />} />*/}
					{/*<Route path="/carrito" element={<Carrito />} />*/}
				</Routes>
			</main>
			<Footer />
		</Router>
	);
}

export default App;