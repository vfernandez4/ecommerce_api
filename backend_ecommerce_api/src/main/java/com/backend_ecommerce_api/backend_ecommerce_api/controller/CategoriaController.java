package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.CategoriaRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.CategoriaResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.service.CategoriaService;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/categorias")
@PreAuthorize("hasRole('ADMIN')")
public class CategoriaController {
	
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<CategoriaResponseDTO> getTodasCategorias() {
        return categoriaService.getTodasCategorias();
    }

    @PostMapping
    public CategoriaResponseDTO crearCategoria(@RequestBody CategoriaRequestDTO categoriaDTO) {
        return categoriaService.crearCategoria(categoriaDTO);
    }

    @GetMapping("/{id}")
    public CategoriaResponseDTO getCategoriaPorId(@PathVariable Long id) {
        return categoriaService.getCategoriaPorId(id);
    }

    @PutMapping("/{id}")
    public CategoriaResponseDTO actualizarCategoria(Long id, @RequestBody CategoriaRequestDTO categoriaDTO) {
        return categoriaService.actualizarCategoria(id, categoriaDTO);
    }

    @DeleteMapping("/{id}")
    public void eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
    }
}