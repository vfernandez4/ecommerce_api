package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.repository.CategoriaRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.CategoriaRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.CategoriaResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.BadRequestException;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.CategoriaNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Categoria;

import java.util.List;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoriaService {
	
    private final CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<CategoriaResponseDTO> getTodasCategorias() {
        return this.categoriaRepository.findAll().stream()
				.map(categoria -> toCategoriaResponseDTO(categoria))
				.toList();
    }

    public CategoriaResponseDTO crearCategoria(CategoriaRequestDTO categoriaDTO) {
		if(categoriaDTO.getNombre() == null) {
			throw new BadRequestException("El nombre de la categoría no puede estar vacío");
		}
        return toCategoriaResponseDTO(this.categoriaRepository.save(toCategoria(categoriaDTO)));
    }

	public CategoriaResponseDTO getCategoriaPorId(Long id) {
        return toCategoriaResponseDTO(this.categoriaRepository.findById(id)
				.orElseThrow(() -> new CategoriaNotFoundException("Categoria no encontrada con el id: " + id)));
    }

    public CategoriaResponseDTO actualizarCategoria(Long id, CategoriaRequestDTO categoriaDTO) {
		Categoria categoria = this.categoriaRepository.findById(id)
										.orElseThrow(() -> new CategoriaNotFoundException("Categoria no encontrada con el id: " + id));		

		categoria.setNombre(categoriaDTO.getNombre());

		return toCategoriaResponseDTO(this.categoriaRepository.save(categoria));
    }

    public void eliminarCategoria(Long id) {
		if(!categoriaRepository.existsById(id)) {
			throw new CategoriaNotFoundException("Categoria no encontrada con el id: " + id);
		}
		
		categoriaRepository.deleteById(id);
    }

	//metodos para convertir DTO en entidad y viceversa
	public CategoriaResponseDTO toCategoriaResponseDTO(Categoria categoria) {
		CategoriaResponseDTO categoriaDTO = new CategoriaResponseDTO();
		categoriaDTO.setId(categoria.getId());
		categoriaDTO.setNombre(categoria.getNombre());
		return categoriaDTO;
	}

	public Categoria toCategoria(CategoriaRequestDTO categoriaDTO) {
		Categoria categoria = new Categoria();
		categoria.setNombre(categoriaDTO.getNombre());
		return categoria;
	}
}