package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.CarritoRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.response.VentaResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.service.VentaService;

@RestController
@RequestMapping("/api/venta")
public class VentaController {

	@Autowired
    private VentaService ventaService;

	@PostMapping("/finalizar")
	@PreAuthorize("hasAnyRole('COMPRADOR_VENDEDOR', 'ADMIN')")
	public ResponseEntity<String> finalizarCompra(Authentication auth, @RequestBody CarritoRequestDTO carritoRequestDTO) {
		String email = auth.getName();
		ventaService.finalizarCompra(email, carritoRequestDTO);
		return ResponseEntity.ok("Compra finalizada con éxito");
	}
	
    @GetMapping("/cantidad-por-dia/{dia}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> getCantidadVentasPorDia(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dia) {
		return ResponseEntity.ok(ventaService.getCantidadVentasPorDia(dia));
	}

	@GetMapping
	public List<VentaResponseDTO> getTodasLasVentas() {
		return ventaService.getTodasLasVentas();
	}
	

	
}
