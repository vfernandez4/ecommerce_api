package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.backend_ecommerce_api.backend_ecommerce_api.repository.ProductoRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.ProductoNotFoundException;
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
                () -> new ProductoNotFoundException("Producto no encontrado con el id: " + id)
        );
    }

	public Producto guardarProducto(Producto producto) {
		// agregar validaciones de que el precio sea positivo
		// que la descripcion, path imagen y el nombre no sean nulos o vacíos
		return this.productoRepository.save(producto);
	}
	
	public Producto venderProducto(Long id, int cantidad) {
		Producto producto = productoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Producto no encontrado, no se puede vender con el id: " + id));

		if (producto.getStock() < cantidad) {
			throw new RuntimeException("Stock insuficiente del producto " + id + ". Quedan " + producto.getStock() + " unidades.");
		}

		producto.setStock(producto.getStock() - cantidad);
		return productoRepository.save(producto);
	}

    public Producto actualizarProducto(Producto producto) {
        if (this.productoRepository.existsById(producto.getId())) {
            return this.productoRepository.save(producto);
        }
        return null;
    }

    public void eliminarProducto(Long id) {
        if (this.productoRepository.existsById(id)) {
            this.productoRepository.deleteById(id);
        } else {
            throw new ProductoNotFoundException("Producto no encontrado con el id: " + id);
        }
    }

    public List<Producto> getProductosPorCategoria(String categoria) {
        return this.productoRepository.findByCategoria_Nombre(categoria);
    }

    public List<Producto> getProductosPorNombre(String nombre) {
        return this.productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public List<Producto> getProductosPublicados(String email) {
        return this.productoRepository.findByVendedor_Email(email);
    }

    public List<Producto> getProductosDestacados() {
        return this.productoRepository.findDestacados();
    }

}
