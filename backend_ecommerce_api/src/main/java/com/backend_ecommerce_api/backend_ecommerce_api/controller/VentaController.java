package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.CarritoRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.service.UsuarioService;
import com.backend_ecommerce_api.backend_ecommerce_api.service.VentaService;

@RestController
@RequestMapping("/api/venta")
@PreAuthorize("hasAnyRole('COMPRADOR', 'COMPRADOR_VENDEDOR')")
public class VentaController {

	@Autowired
    private VentaService ventaService;

	// POST para finalizar compra (guardar venta)
	// Este endpoint debería recibir el carrito del usuario y crear una venta
	// asociada al usuario autenticado, vaciando el carrito en el proceso.
	@PostMapping("/finalizar")
	public String finalizarCompra(Authentication auth, @RequestBody CarritoRequestDTO carritoRequestDTO) {
		String email = auth.getName();
		ventaService.finalizarCompra(email, carritoRequestDTO);
		return "Compra finalizada con éxito";
	}

	// GET una venta por id
	

	// GET historial de ventas por usuario
	
}
