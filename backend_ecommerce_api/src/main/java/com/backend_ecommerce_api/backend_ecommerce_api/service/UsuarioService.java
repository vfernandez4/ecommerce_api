package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import java.util.List;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class UsuarioService {
	private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario getUsuarioPorMail(String mail) {
        return this.usuarioRepository.findByMail(mail).orElseThrow(
                () -> new RuntimeException("Usuario no encontrado por el mail:" + mail)
        );
    }

    public Usuario guardarUsuario(Usuario usuario) {
        return this.usuarioRepository.save(usuario);
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        if (this.usuarioRepository.existsById(usuario.getMail())) {
            return this.usuarioRepository.save(usuario);
        }
        return null;
    }
}
