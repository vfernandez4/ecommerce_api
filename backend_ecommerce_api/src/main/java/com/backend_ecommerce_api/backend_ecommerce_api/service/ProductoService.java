package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend_ecommerce_api.backend_ecommerce_api.repository.CategoriaRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.ProductoRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.ProductoPublicarRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.ProductoResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.ProductoUpdateRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.BadRequestException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.CategoriaNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.ProductoNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.UsuarioNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Categoria;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;

import java.util.List;

@Service
@Transactional(readOnly = true)
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

		if (producto.getPrecio() <= 0) {
			throw new BadRequestException("El precio del producto debe ser mayor a cero.");
		}
		if (producto.getDescripcion() == null || producto.getDescripcion().isEmpty()) {
			throw new BadRequestException("La descripción del producto no puede estar vacía.");
		}
		if (producto.getImagen() == null || producto.getImagen().isEmpty()) {
			throw new BadRequestException("La imagen del producto no puede estar vacía.");
		}
		if (producto.getNombre() == null || producto.getNombre().isEmpty()) {
			throw new BadRequestException("El nombre del producto no puede estar vacío.");
		}
		if (producto.getStockInicial() < 1) {
			throw new BadRequestException("El stock del producto no puede ser negativo o cero.");
		}

		return toProductoResponseDTO(this.productoRepository.save(producto));
	}

    public ProductoResponseDTO actualizarProducto(ProductoUpdateRequestDTO productoDTO, Long id) {
		Producto producto = updateToProducto(productoDTO, id);

        if (this.productoRepository.existsById(producto.getId())) {
            return toProductoResponseDTO(this.productoRepository.save(producto));
        }
		throw new ProductoNotFoundException("Producto no encontrado con el id: " + id);
    }

    public void eliminarProducto(Long id) {
        if (this.productoRepository.existsById(id)) {
            this.productoRepository.deleteById(id);
		}
        throw new ProductoNotFoundException("Producto no encontrado con el id: " + id);
    }

    public List<ProductoResponseDTO> getProductosPorCategoria(String categoria) {
        return this.productoRepository.findByCategoriaNombre(categoria).stream()
						.map(producto -> toProductoResponseDTO(producto))
						.toList();
	}

    public List<ProductoResponseDTO> getProductosPorNombre(String nombre) {
		return this.productoRepository.findByNombreContainingIgnoreCase(nombre).stream()
						.map(producto -> toProductoResponseDTO(producto))
						.toList();
    }

    public List<ProductoResponseDTO> getProductosPublicados(String email) {
		return this.productoRepository.findByVendedorEmail(email).stream()
						.map(producto -> toProductoResponseDTO(producto))
						.toList();
    }

    public List<ProductoResponseDTO> getProductosVendidos(String email) {
		return this.productoRepository.findVendidosByVendedorEmail(email).stream()
						.map(producto -> toProductoResponseDTO(producto))
						.toList();
    }

    public List<ProductoResponseDTO> getProductosComprados(String email) {
		Usuario usuario = usuarioRepository.findByEmail(email)
											.orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado"));

		// estr getProductosComprados() hace un get de la la tabla intermedia q se creo en Producto
		return usuario.getProductosComprados().stream()
				.map(producto -> toProductoResponseDTO(producto))
				.toList();
    }	

    public List<ProductoResponseDTO> getProductosDestacados() {
        return this.productoRepository.findDestacados().stream()
					.map(producto -> toProductoResponseDTO(producto))
					.toList();
    }

	/*
		metodos privados para convertir entidades a DTOs y viceversa
	*/

	private ProductoResponseDTO toProductoResponseDTO(Producto producto) {
		ProductoResponseDTO dto = new ProductoResponseDTO();
		dto.setId(producto.getId());
		dto.setNombre(producto.getNombre());
		dto.setPrecio(producto.getPrecio());
		dto.setDescripcion(producto.getDescripcion());
		dto.setStockInicial(producto.getStockInicial());
		dto.setStockActual(producto.getStockActual());
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
		producto.setStockInicial(productoRequest.getStockInicial());
		//el stock actual va a ser igual al stock inicial al momento de publicar
		producto.setStockActual(productoRequest.getStockInicial());
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
		producto.setStockActual(productoUpdate.getStockActual());
		producto.setImagen(productoUpdate.getImagen());
		return producto;
	}

}
