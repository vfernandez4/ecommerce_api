package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.repository.CategoriaRepository;
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

    public List<Categoria> getTodasCategorias() {
        return this.categoriaRepository.findAll();
    }

    public Categoria getCategoriaPorId(Long id) {
        return this.categoriaRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Categoria no encontrada con el id:" + id)
        );
    }

    public Categoria guardarCategoria(Categoria categoria) {
        return this.categoriaRepository.save(categoria);
    }

    public Categoria actualizarCategoria(Categoria categoria) {
        if (this.categoriaRepository.existsById(categoria.getId())) {
            return this.categoriaRepository.save(categoria);
        }
        return null;
    }
}