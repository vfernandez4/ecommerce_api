package com.backend_ecommerce_api.backend_ecommerce_api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Carrito;
import com.backend_ecommerce_api.backend_ecommerce_api.model.CarritoItem;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.CarritoItemRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.CarritoRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.ProductoRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CarritoItemRepository carritoItemRepository;

    public Carrito setCarrito(Long usuarioId, Long productoId, int cantidad) {
        if(!carritoRepository.existsByUsuario_Id(usuarioId)) {
            return crearCarritoParaUsuario(usuarioId);
        }
        else {
            Carrito carrito = obtenerCarritoPorUsuario(usuarioId);
            Producto producto = productoRepository.findById(productoId)
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            // Buscar si el producto ya está en el carrito
            Optional<CarritoItem> itemExistente = carrito.getItems().stream()
                .filter(item -> item.getProducto().getId().equals(productoId))
                .findFirst();

            if (itemExistente.isPresent() && cantidad > 0) {
                CarritoItem item = itemExistente.get();
                item.setCantidad(cantidad);
            } else if (itemExistente.isPresent() && cantidad == 0) {
                carrito.getItems().remove(itemExistente.get());
                carritoItemRepository.delete(itemExistente.get());
            } else {
                CarritoItem nuevoItem = new CarritoItem();
                nuevoItem.setProducto(producto);
                nuevoItem.setCantidad(cantidad);
                nuevoItem.setCarrito(carrito);
                carrito.getItems().add(nuevoItem);
            }

            return carritoRepository.save(carrito);
        }
    }

    public Carrito crearCarritoParaUsuario(Long usuarioId) {
        Usuario usuario = null;

        if(usuarioRepository.existsById(usuarioId)) {
            usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        }
        else {
            return null;
        }

        Carrito carrito = new Carrito();
        carrito.setUsuario(usuario);

        return carritoRepository.save(carrito);
    }

    public Carrito obtenerCarritoPorUsuario(long usuarioId) {
        return carritoRepository.findByUsuario_Id(usuarioId);
    }

    public void vaciarCarrito(Long usuarioId) {
        if (carritoRepository.existsByUsuario_Id(usuarioId)) {
            carritoRepository.deleteByUsuario_Id(usuarioId);
        } else {
            throw new RuntimeException("Producto no encontrado con el id:" + usuarioId);
        }
    }

    public double getPrecioTotal(Long usuarioId) {
        Carrito carrito = obtenerCarritoPorUsuario(usuarioId);
        return carrito.getItems().stream()
                .mapToDouble(item -> item.getProducto().getPrecio() * item.getCantidad())
                .sum();
    }

    public boolean finalizarCompra(Long usuarioId) {
        Carrito carrito = obtenerCarritoPorUsuario(usuarioId);
        if (carrito == null || carrito.getItems().isEmpty()) {
            return false; // No hay productos en el carrito
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Agregar productos del carrito a productosComprados
        for (CarritoItem item : carrito.getItems()) {
            Producto producto = item.getProducto();
            if (!usuario.getProductosComprados().contains(producto)) {
                usuario.getProductosComprados().add(producto);
            }
        }
        usuarioRepository.save(usuario);

        vaciarCarrito(usuarioId);
        return true;
    }
}
