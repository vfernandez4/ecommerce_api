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

    public Carrito crearCarritoParaUsuario(Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();

        Carrito carrito = new Carrito();
        carrito.setUsuario(usuario);

        return carritoRepository.save(carrito);
    }

    public Carrito obtenerCarritoPorUsuarioId(Long usuarioId) {
        return carritoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado para el usuario"));
    }

    public Carrito agregarProductoAlCarrito(Long usuarioId, Long productoId, int cantidad) {
        Carrito carrito = obtenerCarritoPorUsuarioId(usuarioId);
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Buscar si el producto ya está en el carrito
        Optional<CarritoItem> itemExistente = carrito.getItems().stream()
            .filter(item -> item.getProducto().getId().equals(productoId))
            .findFirst();

        if (itemExistente.isPresent()) {
            CarritoItem item = itemExistente.get();
            item.setCantidad(item.getCantidad() + cantidad);
        } else {
            CarritoItem nuevoItem = new CarritoItem();
            nuevoItem.setProducto(producto);
            nuevoItem.setCantidad(cantidad);
            nuevoItem.setCarrito(carrito);
            carrito.getItems().add(nuevoItem);
        }

        return carritoRepository.save(carrito);
    }

    public Carrito eliminarProductoDelCarrito(Long usuarioId, Long productoId) {
        Carrito carrito = obtenerCarritoPorUsuarioId(usuarioId);
    
        carrito.getItems().removeIf(item -> item.getProducto().getId().equals(productoId));
    
        return carritoRepository.save(carrito);
    }
    
    public Carrito vaciarCarrito(Long usuarioId) {
        Carrito carrito = obtenerCarritoPorUsuarioId(usuarioId);
    
        carrito.getItems().clear();
    
        return carritoRepository.save(carrito);
    }
    
}
