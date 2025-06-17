package com.backend_ecommerce_api.backend_ecommerce_api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.exception.CarritoNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.ProductoNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.ResourceNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.UsuarioNotFoundException;
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
        if(!carritoRepository.existsByUsuarioId(usuarioId)) {
            return crearCarritoParaUsuario(usuarioId);
        }
        else {
            Carrito carrito = obtenerCarritoPorUsuario(usuarioId)
                    .orElseThrow(() -> new CarritoNotFoundException("Carrito no encontrado para el usuario con id: " + usuarioId));
            Producto producto = productoRepository.findById(productoId)
                    .orElseThrow(() -> new ProductoNotFoundException("Producto no encontrado con el id: " + productoId));

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
                    .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con el id: " + usuarioId));
        }
        else {
            return null;
        }

        Carrito carrito = new Carrito();
        carrito.setUsuario(usuario);

        return carritoRepository.save(carrito);
    }

    public Optional<Carrito> obtenerCarritoPorUsuario(long usuarioId) {
        return carritoRepository.findByUsuarioId(usuarioId);
    }

    public void vaciarCarrito(Long usuarioId) {
        if (carritoRepository.existsByUsuarioId(usuarioId)) {
            carritoRepository.deleteByUsuarioId(usuarioId);
        } else {
            throw new CarritoNotFoundException("Carrito no encontrado para el usuario con id: " + usuarioId);
        }
    }

    public double getPrecioTotal(Long usuarioId) {
        Carrito carrito = obtenerCarritoPorUsuario(usuarioId)
                .orElseThrow(() -> new CarritoNotFoundException("Carrito no encontrado para el usuario con id: " + usuarioId));
        return carrito.getItems().stream()
                .mapToDouble(item -> item.getProducto().getPrecio() * item.getCantidad())
                .sum();
    }

    public boolean finalizarCompra(Long usuarioId) {
        Optional<Carrito> carritoOpt = obtenerCarritoPorUsuario(usuarioId);
        if (!carritoOpt.isPresent() || carritoOpt.get().getItems().isEmpty()) {
            return false; // No hay productos en el carrito
        }
        Carrito carrito = carritoOpt.get();

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con el id: " + usuarioId));

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
