package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.CarritoRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.response.CarritoResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @GetMapping
    public CarritoResponseDTO getCarrito(@RequestParam Long usuarioId) {
        return carritoService.obtenerCarritoPorUsuario(usuarioId);
    }

    @PostMapping
    public CarritoResponseDTO setCarrito(@RequestBody CarritoRequestDTO request) {
        return carritoService.setCarrito(request);
    }

    @DeleteMapping
    public void vaciarCarrito(@RequestParam Long usuarioId) {
        carritoService.vaciarCarrito(usuarioId);
    }

    @GetMapping("/precio-total")
    public double getPrecioTotal(@RequestParam Long usuarioId) {
        return carritoService.getPrecioTotal(usuarioId);
    }

    @PostMapping("/finalizar")
    public String finalizarCompra(@RequestParam Long usuarioId) {
        boolean exito = carritoService.finalizarCompra(usuarioId);
        return exito ? "Compra finalizada con éxito" : "No se pudo finalizar la compra";
    }
}
