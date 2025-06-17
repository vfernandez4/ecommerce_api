package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.repository.ProductoRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;
import java.util.List;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductoService {
	private final ProductoRepository productoRepository;

	@Autowired
	public ProductoService(ProductoRepository productoRepository) {
		this.productoRepository = productoRepository;
	}

	public List<Producto> getTodosProductos() {
		return this.productoRepository.findAll();
	}

	public Producto getProductoPorId(Long id) {
		return this.productoRepository.findById(id).orElseThrow(
				() -> new RuntimeException("Producto no encontrado con el id:" + id));
	}

	public Producto guardarProducto(Producto producto) {
		// agregar validaciones de que el precio sea positivo
		// que la descripcion, path imagen y el nombre no sean nulos o vacíos
		return this.productoRepository.save(producto);
	}

	public Producto actualizarProducto(Producto producto) {
		if (this.productoRepository.existsById(producto.getId())) {
			return this.productoRepository.save(producto);
		} else {
			throw new RuntimeException("Producto no encontrado, no se puede actualizar con el id:" + producto.getId());
		}
	}

	// crear metodo para eliminar un producto

	public Producto venderProducto(Long id, int cantidad) {
		Producto producto = productoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Producto no encontrado, no se puede vender con el id: " + id));

		if (producto.getStock() < cantidad) {
			throw new RuntimeException("Stock insuficiente del producto " + id + ". Quedan " + producto.getStock() + " unidades.");
		}

		producto.setStock(producto.getStock() - cantidad);
		return productoRepository.save(producto);
	}
}
