package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.ProductoPublicarRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.ProductoUpdateRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.response.ProductoResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.service.ProductoService;



@RestController
@RequestMapping("/api/productos")
public class ProductoController {

	@Autowired
	private ProductoService productoService;

	@GetMapping
	public List<ProductoResponseDTO> getTodosProductos() {
		return productoService.getTodosProductos();
	}

	@GetMapping("/{id:\\d+}")
	public ProductoResponseDTO getProductoPorId(@PathVariable Long id) {
		return productoService.getProductoPorId(id);
	}

	@GetMapping("/categoria")
	public List<ProductoResponseDTO> getProductosPorCategoria(@RequestParam String categoria) {
		return productoService.getProductosPorCategoria(categoria);
	}

	@GetMapping("/buscar-por-nombre")
	public List<ProductoResponseDTO> getProductosPorNombre(@RequestParam String nombre) {
		return productoService.getProductosPorNombre(nombre);
	}

	@GetMapping("/destacados")
	public List<ProductoResponseDTO> getProductosDestacados() {
		return productoService.getProductosDestacados();
	}

	@PostMapping
	@PreAuthorize("hasRole('COMPRADOR_VENDEDOR', 'ADMIN')")
	public ProductoResponseDTO publicarProducto(@RequestBody ProductoPublicarRequestDTO producto, Authentication auth) {
		String email = auth.getName();
		return productoService.publicarProducto(email, producto);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('COMPRADOR_VENDEDOR', 'ADMIN')")
	public ProductoResponseDTO actualizarProducto(@RequestBody ProductoUpdateRequestDTO producto, @PathVariable Long id) {
		return productoService.actualizarProducto(producto, id);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void eliminarProducto(@PathVariable Long id) {
		productoService.eliminarProducto(id);
	}
	
    @GetMapping("/cantidad-total")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> getCantidadProductosTotal() {
		return ResponseEntity.ok(productoService.getCantidadProductosTotal());
	}

}

