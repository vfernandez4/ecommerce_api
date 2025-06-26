package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.response.UsuarioResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.UsuarioNotFoundException;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.UsuarioUpdateRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.service.ProductoService;
import com.backend_ecommerce_api.backend_ecommerce_api.service.UsuarioService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;


@RestController
@RequestMapping("/api/usuarios")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<UsuarioResponseDTO> getTodosLosUsuarios() {
        return usuarioService.getTodosLosUsuarios();
    }
    
    @GetMapping("/buscar")
    public UsuarioResponseDTO getUsuarioPorMail(@RequestParam String mail) {
        return usuarioService.getUsuarioPorMail(mail)
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con email: " + mail));
    }

    @PutMapping("/{id}")
    public UsuarioResponseDTO actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioUpdateRequestDTO usuarioRequest) {
        return usuarioService.actualizarUsuario(id, usuarioRequest);
    }


    @DeleteMapping("/{id}")
    public String eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return "Usuario eliminado con éxito.";
    }



}   