package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.ProductoPublicarRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.ProductoResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.ProductoUpdateRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;
import com.backend_ecommerce_api.backend_ecommerce_api.service.ProductoService;



@RestController
@RequestMapping("/api/productos")

public class ProductoController {
	@Autowired
	private ProductoService productoService;

	// https://localhost:8080/api/productos con metodo get http
	@GetMapping 
	public List<ProductoResponseDTO> getTodosProductos() {
		return productoService.getTodosProductos();
	}
	
	// https://localhost:8080/api/productos con metodo post http
	@PostMapping
	public ProductoResponseDTO publicarProducto(@RequestBody ProductoPublicarRequestDTO producto) {
		return productoService.guardarProducto(producto);
	}

	// https://localhost:8080/api/productos/1 con metodo get http
	@GetMapping("/{id}")
	public ProductoResponseDTO getProductoPorId(@RequestParam Long id) {
		return productoService.getProductoPorId(id);
	} 
	
    @PutMapping
    public ProductoResponseDTO actualizarProducto(@RequestBody ProductoUpdateRequestDTO producto) {
        return productoService.actualizarProducto(producto);
    }

	@DeleteMapping("/{id}")
	public void eliminarProducto(@RequestParam Long id) {
		productoService.eliminarProducto(id);
	}

	@GetMapping("/{categoria}")
	public List<ProductoResponseDTO> getProductosPorCategoria(@RequestParam String categoria) {
		return productoService.getProductosPorCategoria(categoria);
	}

	@GetMapping("/{nombre}")
	public List<ProductoResponseDTO> getProductosPorNombre(@RequestParam String nombre) {
		return productoService.getProductosPorNombre(nombre);
	}

	@GetMapping("/{id}") //publicados por un usuario (pueden haberse vendido aun o no)
	public List<ProductoResponseDTO> getProductosPublicados(@RequestParam Long id) {
		return productoService.getProductosPublicados(id);
	}

	@GetMapping("/{id}") //historial vendidos por un usuario
	public List<ProductoResponseDTO> getProductosVendidos(@RequestParam Long id) {
		return productoService.getProductosVendidos(id);
	}

	@GetMapping("/{id}") //historial comprados por un usuario
	public List<ProductoResponseDTO> getProductosComprados(@RequestParam Long id) {
		return productoService.getProductosComprados(id);
	}

	@GetMapping
	public List<ProductoResponseDTO> getProductosDestacados() {
		return productoService.getProductosDestacados();
	}
}
