package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.CarritoRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.service.VentaService;

@RestController
@RequestMapping("/api/venta")
public class VentaController {

	@Autowired
    private VentaService ventaService;

	@PostMapping("/finalizar")
	@PreAuthorize("hasRole('COMPRADOR_VENDEDOR', 'ADMIN')")
	public ResponseEntity<String> finalizarCompra(Authentication auth, @RequestBody CarritoRequestDTO carritoRequestDTO) {
		String email = auth.getName();
		ventaService.finalizarCompra(email, carritoRequestDTO);
		return ResponseEntity.ok("Compra finalizada con éxito");
	}

	// GET una venta por id
	

	// GET historial de ventas por usuario
	
}
