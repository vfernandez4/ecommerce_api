package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Categoria;
import com.backend_ecommerce_api.backend_ecommerce_api.service.CategoriaService;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
	

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<Categoria> getTodasCategorias() {
        return categoriaService.getTodasCategorias();
    }

    @PostMapping
    public Categoria guardarCategoria(@RequestBody Categoria categoria) {
        return categoriaService.guardarCategoria(categoria);
    }

    @GetMapping("/{id}")
    public Categoria getCategoriaPorId(@RequestParam Long id) {
        return categoriaService.getCategoriaPorId(id);
    }

    @PutMapping
    public Categoria actualizarCategoria(@RequestBody Categoria categoria) {
        return categoriaService.actualizarCategoria(categoria);
    }

    @DeleteMapping("/{id}")
    public void eliminarCategoria(@RequestParam Long id) {
        categoriaService.eliminarCategoria(id);
    }
}