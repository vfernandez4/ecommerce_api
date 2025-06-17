package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import java.util.Optional;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UsuarioService {
	private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Optional<Usuario> getUsuarioPorMail(String mail) {
        try {
            return this.usuarioRepository.findByEmail(mail);
        }
        catch (Exception e) {
            return null;
        }
    }

    public Usuario guardarUsuario(Usuario usuario) {
        return this.usuarioRepository.save(usuario);
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        if (this.usuarioRepository.existsByEmail(usuario.getEmail())) {
            return this.usuarioRepository.save(usuario);
        }
        return null;
    }
}
