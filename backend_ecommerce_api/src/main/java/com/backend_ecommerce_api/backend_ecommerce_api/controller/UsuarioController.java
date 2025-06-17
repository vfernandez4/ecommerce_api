package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.RegistroRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import com.backend_ecommerce_api.backend_ecommerce_api.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")

public class UsuarioController {
	@Autowired
	 private UsuarioService usuarioService;

    // https://localhost:8080/api/usuario con metodo post http
	@PostMapping("/register")
    public Usuario registrar(@RequestBody RegistroRequestDTO request) {
        return usuarioService.registrarUsuario(request);
    }

	// https://localhost:8080/api/usuarios/mail con metodo get http
	@GetMapping("/{mail}")
	public Optional<Usuario> getUsuarioPorMail(@RequestParam String mail) {
        return usuarioService.getUsuarioPorMail(mail);
	} 
	
    @PutMapping
    Usuario actualizarUsuario(@RequestBody Usuario usuario){
        return usuarioService.actualizarUsuario(usuario);
    }
}
