package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;
import com.backend_ecommerce_api.backend_ecommerce_api.service.ProductoService;



@RestController
@RequestMapping("/api/productos")

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
	public Producto guardarProducto(@RequestBody Producto producto) {
		return productoService.guardarProducto(producto);
	}

	// https://localhost:8080/api/productos/1 con metodo get http
	@GetMapping("/{id}")
	public Producto getProductoPorId(@RequestParam Long id) {
		return productoService.getProductoPorId(id);
	} 
	
    @PutMapping
    Producto actualizarProducto(@RequestBody Producto producto){
        return productoService.actualizarProducto(producto);
    }	
}
