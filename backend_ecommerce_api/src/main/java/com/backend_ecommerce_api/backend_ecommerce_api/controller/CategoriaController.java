package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.CategoriaRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.response.CategoriaResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.service.CategoriaService;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<CategoriaResponseDTO> getTodasCategorias() {
        return categoriaService.getTodasCategorias();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'COMPRADOR_VENDEDOR')")
    public CategoriaResponseDTO crearCategoria(@RequestBody CategoriaRequestDTO categoriaDTO) {
        return categoriaService.crearCategoria(categoriaDTO);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public CategoriaResponseDTO getCategoriaPorId(@PathVariable Long id) {
        return categoriaService.getCategoriaPorId(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public CategoriaResponseDTO actualizarCategoria(@PathVariable Long id, @RequestBody CategoriaRequestDTO categoriaDTO) {
        return categoriaService.actualizarCategoria(id, categoriaDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
    }
}
