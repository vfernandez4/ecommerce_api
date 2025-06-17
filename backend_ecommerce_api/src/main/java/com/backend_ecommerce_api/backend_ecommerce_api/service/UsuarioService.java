package com.backend_ecommerce_api.backend_ecommerce_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.RegistroRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.exception.EmailYaRegistradoException;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Rol;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import java.util.Optional;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UsuarioService {
	  private final UsuarioRepository usuarioRepository;
  
    @Autowired
    private PasswordEncoder passwordEncoder;
  
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

    public Usuario getUsuarioPorMail(String mail) {
        return this.usuarioRepository.findByEmail(mail)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + mail));
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        if (this.usuarioRepository.existsByEmail(usuario.getEmail())) {
            return this.usuarioRepository.save(usuario);
        }
        return null;
    }
}
