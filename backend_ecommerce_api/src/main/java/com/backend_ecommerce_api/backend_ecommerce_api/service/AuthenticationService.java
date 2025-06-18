package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.JwtResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.LoginRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.security.JwtUtil;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public JwtResponseDTO authenticate(LoginRequestDTO request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );

            Usuario usuario = (Usuario) authentication.getPrincipal();
            String jwt = jwtUtil.generateToken(usuario.getUsername());

            return new JwtResponseDTO(jwt);

        } catch (AuthenticationException ex) {
            throw new RuntimeException("Credenciales inválidas");
        }
    }
}
