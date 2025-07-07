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
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/me")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public UsuarioResponseDTO getPerfilUsuarioAutenticado(Authentication auth) {
        String email = auth.getName();
        return usuarioService.getUsuarioPorMail(email)
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con email: " + email));
    }

    @GetMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UsuarioResponseDTO> getTodosLosUsuarios() {
        return usuarioService.getTodosLosUsuarios();
    }
    
    @GetMapping("/buscar")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public UsuarioResponseDTO getUsuarioPorMail(@RequestParam String mail) {
        return usuarioService.getUsuarioPorMail(mail)
                .orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado con email: " + mail));
    }

    @PutMapping("/{id}")

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public UsuarioResponseDTO actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioUpdateRequestDTO usuarioRequest) {
        return usuarioService.actualizarUsuario(id, usuarioRequest);
    }

    @DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return "Usuario eliminado con éxito.";
    }



}   