package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.ProductoPublicarRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.ProductoUpdateRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.response.ProductoResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;
import com.backend_ecommerce_api.backend_ecommerce_api.service.ProductoService;
import com.backend_ecommerce_api.backend_ecommerce_api.service.UsuarioService;



@RestController
@RequestMapping("/api/productos")

public class ProductoController {
	@Autowired
	private ProductoService productoService;
	private UsuarioService usuarioService;

	@GetMapping 
	public List<ProductoResponseDTO> getTodosProductos() {
		return productoService.getTodosProductos();
	}
	
	@PostMapping
	public ProductoResponseDTO publicarProducto(@RequestBody ProductoPublicarRequestDTO producto, Authentication auth) {
		String email = auth.getName();
		return productoService.publicarProducto(email, producto);
	}

	@GetMapping("/{id}")
	public ProductoResponseDTO getProductoPorId(@PathVariable Long id) {
		return productoService.getProductoPorId(id);
	} 
	
	@PutMapping("/{id}")
	public ProductoResponseDTO actualizarProducto(@RequestBody ProductoUpdateRequestDTO producto, @PathVariable Long id) {

        return productoService.actualizarProducto(producto, id);
    }

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public void eliminarProducto(@PathVariable Long id) {
		productoService.eliminarProducto(id);
	}

	@GetMapping("/categoria")
	public List<ProductoResponseDTO> getProductosPorCategoria(@RequestParam String categoria) {
		return productoService.getProductosPorCategoria(categoria);
	}

	@GetMapping("/buscar-por-nombre")
	public List<ProductoResponseDTO> getProductosPorNombre(@RequestParam String nombre) {
		return productoService.getProductosPorNombre(nombre);
	}

	@GetMapping("/publicados")
	public List<ProductoResponseDTO> getProductosPublicados(Authentication auth) {
		String email = auth.getName();
		return productoService.getProductosPublicados(email);
	}

	@GetMapping("/vendidos")
	public List<ProductoResponseDTO> getProductosVendidos(Authentication auth) {
		String email = auth.getName();
		return productoService.getProductosVendidos(email);
	}

	@GetMapping("/comprados")
	public List<ProductoResponseDTO> getProductosComprados(Authentication auth) {
		String email = auth.getName();
		return productoService.getProductosComprados(email);
	}

	@GetMapping("/destacados")
	public List<ProductoResponseDTO> getProductosDestacados() {
		return productoService.getProductosDestacados();
	}

	@PostMapping("/pago")
	public void pagarProductos(@RequestBody List<ProductoUpdateRequestDTO> productosDTO, Authentication auth) {
		String email = auth.getName();
		for (ProductoUpdateRequestDTO prod : productosDTO) {
			productoService.actualizarProductoPago(prod);
			usuarioService.agregarCompra(email, prod);
		}
	}
}
