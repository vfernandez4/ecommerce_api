package com.backend_ecommerce_api.backend_ecommerce_api.service;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.*;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.CarritoNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.UsuarioNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.model.*;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public CarritoResponseDTO setCarrito(CarritoRequestDTO request) {
        Long usuarioId = request.getUsuarioId();
        Long productoId = request.getProductoId();
        int cantidad = request.getCantidad();

        Carrito carrito = carritoRepository.findByUsuarioId(usuarioId)
                .orElseGet(() -> crearCarritoParaUsuario(usuarioId));

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Optional<CarritoItem> itemExistente = carrito.getItems().stream()
                .filter(item -> item.getProducto().getId().equals(productoId))
                .findFirst();

        if (itemExistente.isPresent()) {
            if (cantidad > 0) {
                itemExistente.get().setCantidad(cantidad);
            } else {
                carrito.getItems().remove(itemExistente.get());
                carritoItemRepository.delete(itemExistente.get());
            }
        } else if (cantidad > 0) {
            CarritoItem nuevoItem = new CarritoItem();
            nuevoItem.setProducto(producto);
            nuevoItem.setCantidad(cantidad);
            nuevoItem.setCarrito(carrito);
            carrito.getItems().add(nuevoItem);
        }

        carritoRepository.save(carrito);
        return construirResponseDTO(carrito);
    }

    public Carrito crearCarritoParaUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Carrito carrito = new Carrito();
        carrito.setUsuario(usuario);
        return carritoRepository.save(carrito);
    }

    public CarritoResponseDTO obtenerCarritoPorUsuario(long usuarioId) {
        Carrito carrito = carritoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado para el usuario"));
        return construirResponseDTO(carrito);
    }

    public void vaciarCarrito(Long usuarioId) {
        if (carritoRepository.existsByUsuarioId(usuarioId)) {
            carritoRepository.deleteByUsuarioId(usuarioId);
        } else {
            throw new CarritoNotFoundException("Carrito no encontrado para el usuario con id: " + usuarioId);
        }
    }

    public double getPrecioTotal(Long usuarioId) {
        Carrito carrito = carritoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new CarritoNotFoundException("Carrito no encontrado para el usuario con id: " + usuarioId));
        return carrito.getItems().stream()
                .mapToDouble(item -> item.getProducto().getPrecio() * item.getCantidad())
                .sum();
    }

    public boolean finalizarCompra(Long usuarioId) {
        Carrito carrito = carritoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new CarritoNotFoundException("Carrito no encontrado para el usuario con id: " + usuarioId));

        if (carrito.getItems().isEmpty()) {
            return false;
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con el id: " + usuarioId));

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

    private CarritoResponseDTO construirResponseDTO(Carrito carrito) {
        CarritoResponseDTO response = new CarritoResponseDTO();
        response.setUsuarioId(carrito.getUsuario().getId());
        double total = 0;

        List<CarritoItemResponseDTO> items = carrito.getItems().stream().map(item -> {
            CarritoItemResponseDTO dto = new CarritoItemResponseDTO();
            dto.setProductoId(item.getProducto().getId());
            dto.setNombreProducto(item.getProducto().getNombre());
            dto.setPrecioUnitario(item.getProducto().getPrecio());
            dto.setCantidad(item.getCantidad());
            dto.setSubtotal(item.getProducto().getPrecio() * item.getCantidad());
            return dto;
        }).collect(Collectors.toList());

        total = items.stream().mapToDouble(CarritoItemResponseDTO::getSubtotal).sum();
        response.setItems(items);
        response.setTotal(total);
        return response;
    }
}
