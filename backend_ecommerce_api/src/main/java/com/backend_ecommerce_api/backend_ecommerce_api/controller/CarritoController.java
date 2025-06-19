package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.CarritoRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.response.CarritoResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/carrito")
@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
//@PreAuthorize("permitAll()")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

	@PostMapping
    public CarritoResponseDTO setCarrito(@RequestBody CarritoRequestDTO request, Authentication auth) {
		String email = auth.getName();
        return carritoService.setCarrito(request, email);
    }

    @GetMapping
    public CarritoResponseDTO getCarritoPorUsuario(Authentication auth) {
		String email = auth.getName();
        return carritoService.getCarritoPorUsuario(email);
    }

    @DeleteMapping
    public void vaciarCarrito(Authentication auth) {
		String email = auth.getName();
        carritoService.vaciarCarrito(email);
    }

    @GetMapping("/precio-total")
    public double getPrecioTotal(Authentication auth) {
		String email = auth.getName();
        return carritoService.getPrecioTotal(email);
    }

    @PostMapping("/finalizar")
    public boolean finalizarCompra(Authentication auth) {
		String email = auth.getName();
        return carritoService.finalizarCompra(email);    
	}
}
