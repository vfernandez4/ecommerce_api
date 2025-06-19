package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;
import com.backend_ecommerce_api.backend_ecommerce_api.service.ProductoService;



@RestController
@RequestMapping("/api/productos")
@PreAuthorize("hasRole('ADMIN')")

public class ProductoController {
	@Autowired
	 private ProductoService productoService;

	// https://localhost:8080/api/productos con metodo get http
	@GetMapping 
	public List<Producto> getTodosProductos() {
		return productoService.getTodosProductos();
	}
	
	// https://localhost:8080/api/productos con metodo post http
	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Producto guardarProducto(@RequestBody Producto producto) {
		return productoService.guardarProducto(producto);
	}

	// https://localhost:8080/api/productos/1 con metodo get http
	@GetMapping("/{id}")
	public Producto getProductoPorId(@RequestParam Long id) {
		return productoService.getProductoPorId(id);
	} 
	
    @PutMapping
    Producto actualizarProducto(@RequestBody Producto producto) {
        return productoService.actualizarProducto(producto);
    }

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void eliminarProducto(@RequestParam Long id) {
		productoService.eliminarProducto(id);
	}

	@GetMapping("/{categoria}")
	public List<Producto> getProductosPorCategoria(@RequestParam String categoria) {
		return productoService.getProductosPorCategoria(categoria);
	}

	@GetMapping("/{nombre}")
	public List<Producto> getProductosPorNombre(@RequestParam String nombre) {
		return productoService.getProductosPorNombre(nombre);
	}

	@GetMapping("/{email}")
	public List<Producto> getProductosPublicados(@RequestParam String email) {
		return productoService.getProductosPublicados(email);
	}

	@GetMapping
	public List<Producto> getProductosDestacados() {
		return productoService.getProductosDestacados();
	}
}
