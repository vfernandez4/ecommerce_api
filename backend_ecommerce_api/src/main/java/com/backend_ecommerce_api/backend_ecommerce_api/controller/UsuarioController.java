package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.RegistroRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import com.backend_ecommerce_api.backend_ecommerce_api.service.UsuarioService;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public Usuario registrar(@RequestBody RegistroRequestDTO request) {
        return usuarioService.registrarUsuario(request);
    }
}
