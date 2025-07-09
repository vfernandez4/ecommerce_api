package com.backend_ecommerce_api.backend_ecommerce_api.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.CarritoItemRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.CarritoRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.ProductoNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.UsuarioNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Venta;
import com.backend_ecommerce_api.backend_ecommerce_api.model.VentaItem;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.ProductoRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.VentaItemRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.VentaRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class VentaService {
	private final VentaRepository ventaRepository;
	private final UsuarioRepository usuarioRepository;
	private final ProductoRepository productoRepository;
	private final VentaItemRepository ventaItemRepository;

	@Autowired
	public VentaService(VentaRepository ventaRepository, UsuarioRepository usuarioRepository, ProductoRepository productoRepository, VentaItemRepository ventaItemRepository) {
		this.ventaRepository = ventaRepository;
		this.usuarioRepository = usuarioRepository;
		this.productoRepository = productoRepository;
		this.ventaItemRepository = ventaItemRepository;
	}

	public void finalizarCompra(String email, CarritoRequestDTO carritoRequestDTO) {
		Usuario comprador  = usuarioRepository.findByEmail(email)
        				.orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con ese email: " + email));

		Venta venta = new Venta();
		venta.setComprador(comprador);
		venta.setFecha(LocalDateTime.now());

		for (CarritoItemRequestDTO item : carritoRequestDTO.getItems()) {
			VentaItem ventaItem = new VentaItem();
			Producto producto = productoRepository.findById(item.getProductoId())
								.orElseThrow(() -> new ProductoNotFoundException("Producto no encontrado con el id: " + item.getProductoId()));		
			ventaItem.setProducto(producto);
			ventaItem.setCantidad(item.getCantidad());
			ventaItem.setVenta(venta);
			ventaItem.setSubtotal(producto.getPrecio() * item.getCantidad());
			
			producto.disminuirStock(item.getCantidad());
			
			comprador.addProductoComprado(producto);
			producto.getVendedor().addProductoVendido(producto);

			productoRepository.save(producto);

			venta.agregarItem(ventaItem);
			ventaItemRepository.save(ventaItem);

			usuarioRepository.save(comprador);
			usuarioRepository.save(producto.getVendedor());
		}

		venta.setTotal(venta.getItems().stream()
				.mapToDouble(item -> item.getSubtotal())
				.sum());
		
		ventaRepository.save(venta);

	}

	
}
