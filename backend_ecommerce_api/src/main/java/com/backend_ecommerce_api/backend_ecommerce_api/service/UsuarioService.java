package com.backend_ecommerce_api.backend_ecommerce_api.service;

import com.backend_ecommerce_api.backend_ecommerce_api.dto.response.UsuarioResponseDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.request.UsuarioUpdateRequestDTO;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<UsuarioResponseDTO> getTodosLosUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }
    
    
    public Optional<UsuarioResponseDTO> getUsuarioPorMail(String mail) {
        return usuarioRepository.findByEmail(mail)
                .map(this::mapToResponseDTO);
    }

    public UsuarioResponseDTO actualizarUsuario(Long id, UsuarioUpdateRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    
        usuario.setNombreCompleto(dto.getNombreCompleto());
        usuario.setDireccion(dto.getDireccion());
        usuario.setTelefono(dto.getTelefono());
        usuario.setFechaNacimiento(dto.getFechaNacimiento());
        usuario.setAvatar(dto.getAvatar());
    
        return mapToResponseDTO(usuarioRepository.save(usuario));
    }
    

    public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    private UsuarioResponseDTO mapToResponseDTO(Usuario usuario) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setNombreCompleto(usuario.getNombreCompleto());
        dto.setDireccion(usuario.getDireccion());
        dto.setTelefono(usuario.getTelefono());
        dto.setFechaNacimiento(usuario.getFechaNacimiento());
        dto.setAvatar(usuario.getAvatar());
        dto.setEmail(usuario.getEmail());
        return dto;
    }
}