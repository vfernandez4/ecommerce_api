package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.backend_ecommerce_api.backend_ecommerce_api.repository.CategoriaRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.ProductoRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.ProductoPublicarRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.ProductoResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.ProductoUpdateRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.CategoriaNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.ProductoNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.UsuarioNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Categoria;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;

import java.util.List;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductoService {
	private final ProductoRepository productoRepository;
	private final UsuarioRepository usuarioRepository;
	private final CategoriaRepository categoriaRepository;

	@Autowired
	public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository, UsuarioRepository usuarioRepository) {
		this.productoRepository = productoRepository;
		this.categoriaRepository = categoriaRepository;
		this.usuarioRepository = usuarioRepository;
	}

	public List<ProductoResponseDTO> getTodosProductos() {
		return this.productoRepository.findAll().stream()
				   .map(p -> toProductoResponseDTO(p))
				   .toList();
	}

    public ProductoResponseDTO getProductoPorId(Long id) {
		return toProductoResponseDTO(
			this.productoRepository.findById(id)
			.orElseThrow(() -> new ProductoNotFoundException("Producto no encontrado con el id: " + id)));
    }

	public ProductoResponseDTO publicarProducto(String email, ProductoPublicarRequestDTO productoDTO) {
		Usuario vendedor = usuarioRepository.findByEmail(email)
        					.orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con ese email: " + email));

    	Categoria categoria = categoriaRepository.findById(productoDTO.getCategoriaId())
        						.orElseThrow(() -> new CategoriaNotFoundException("Categoría no encontrada con ese id: " + productoDTO.getCategoriaId()));
		
		Producto producto = publicarToProducto(productoDTO, categoria, vendedor);

		// agregar validaciones de que el precio sea positivo
		// que la descripcion, path imagen y el nombre no sean nulos o vacíos
		return toProductoResponseDTO(this.productoRepository.save(producto));
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
        return this.productoRepository.findByCategoriaNombre(categoria);
    }

    public List<Producto> getProductosPorNombre(String nombre) {
        return this.productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public List<Producto> getProductosPublicados(String email) {
        return this.productoRepository.findByVendedorEmail(email);
    }

    public List<Producto> getProductosDestacados() {
        return this.productoRepository.findDestacados();
    }

	private ProductoResponseDTO toProductoResponseDTO(Producto producto) {
		ProductoResponseDTO dto = new ProductoResponseDTO();
		dto.setId(producto.getId());
		dto.setNombre(producto.getNombre());
		dto.setPrecio(producto.getPrecio());
		dto.setDescripcion(producto.getDescripcion());
		dto.setStock(producto.getStock());
		dto.setImagen(producto.getImagen());
		if (producto.getCategoria() != null) {
			dto.setCategoriaId(producto.getCategoria().getId());
			dto.setCategoriaNombre(producto.getCategoria().getNombre());
		}
		if (producto.getVendedor() != null) {
			dto.setVendedorId(producto.getVendedor().getId());
			dto.setVendedorNombre(producto.getVendedor().getNombreCompleto());
		}
		return dto;
 	}

	private Producto publicarToProducto(ProductoPublicarRequestDTO productoRequest, Categoria categoria, Usuario vendedor) {
		Producto producto = new Producto();

		producto.setNombre(productoRequest.getNombre());
		producto.setPrecio(productoRequest.getPrecio());
		producto.setDescripcion(productoRequest.getDescripcion());
		producto.setStock(productoRequest.getStock());
		producto.setImagen(productoRequest.getImagen());
		producto.setCategoria(categoria);
		producto.setVendedor(vendedor);

		return producto;
	}

	private Producto updateToProducto(ProductoUpdateRequestDTO productoUpdate, Long id) {
		Producto producto = new Producto();
		producto.setId(id);
		producto.setNombre(productoUpdate.getNombre());
		producto.setPrecio(productoUpdate.getPrecio());
		producto.setDescripcion(productoUpdate.getDescripcion());
		producto.setStock(productoUpdate.getStock());
		producto.setImagen(productoUpdate.getImagen());
		return producto;
	}

}
