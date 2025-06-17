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
    @GetMapping("/{usuarioId}")
    public Carrito getCarritoPorUsuario(@RequestParam Long usuarioId) {
        return carritoService.obtenerCarritoPorUsuario(usuarioId);
    }

    // POST /api/carrito/{usuarioId}/{productoId}/{cantidad}
    @PostMapping("/{usuarioId}/{productoId}/{cantidad}")
    public Carrito setCarrito(@RequestParam Long usuarioId, @RequestParam Long productoId, @RequestParam int cantidad) {
        return carritoService.setCarrito(usuarioId, productoId, cantidad);
    }

    // DELETE /api/carrito//1
    @DeleteMapping("/{usuarioId}")
    public void vaciarCarrito(@RequestParam Long usuarioId) {
        carritoService.vaciarCarrito(usuarioId);
    }

    @GetMapping("/precio/{usuarioId}")
    public double getPrecioTotal(@RequestParam Long usuarioId) {
        return carritoService.getPrecioTotal(usuarioId);
    }

    // POST /api/carrito/finalizar/{usuarioId}
    @PostMapping("/finalizar/{usuarioId}")
    public String finalizarCompra(@RequestParam Long usuarioId) {
        boolean exito = carritoService.finalizarCompra(usuarioId);
        if (exito) {
            return "Compra finalizada con éxito";
        } else {
            return "No se pudo finalizar la compra";
        }
    }
}
