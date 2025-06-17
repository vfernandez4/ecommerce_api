package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.RegistroRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.EmailYaRegistradoException;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Rol;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(RegistroRequestDTO request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailYaRegistradoException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombreCompleto(request.getNombreCompleto());
        usuario.setDireccion(request.getDireccion());
        usuario.setTelefono(request.getTelefono());
        usuario.setFechaNacimiento(request.getFechaNacimiento());
        usuario.setAvatar(request.getAvatar());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRol(Rol.USER);

        return usuarioRepository.save(usuario);
    }
}
