package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Carrito;
import com.backend_ecommerce_api.backend_ecommerce_api.service.CarritoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    // GET /api/carrito/usuario/1
    @GetMapping("/usuario/{usuarioId}")
    public Carrito getCarritoPorUsuarioId(@PathVariable Long usuarioId) {
        return carritoService.obtenerCarritoPorUsuarioId(usuarioId);
    }

    // POST /api/carrito/agregar?usuarioId=1&productoId=5&cantidad=2
    @PostMapping("/agregar")
    public Carrito agregarProductoAlCarrito(
            @RequestParam Long usuarioId,
            @RequestParam Long productoId,
            @RequestParam int cantidad) {

        return carritoService.agregarProductoAlCarrito(usuarioId, productoId, cantidad);
    }

    // DELETE /api/carrito/eliminar?usuarioId=1&productoId=5
    @DeleteMapping("/eliminar")
    public Carrito eliminarProductoDelCarrito(
            @RequestParam Long usuarioId,
            @RequestParam Long productoId) {

        return carritoService.eliminarProductoDelCarrito(usuarioId, productoId);
    }

    // DELETE /api/carrito/vaciar/1
    @DeleteMapping("/vaciar/{usuarioId}")
    public Carrito vaciarCarrito(@PathVariable Long usuarioId) {
        return carritoService.vaciarCarrito(usuarioId);
    }
}
