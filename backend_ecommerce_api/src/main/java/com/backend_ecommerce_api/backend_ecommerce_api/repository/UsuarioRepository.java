package com.backend_ecommerce_api.backend_ecommerce_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Buscar usuario por email
    Optional<Usuario> findByEmail(String email);

    // Verificar existencia por email
    boolean existsByEmail(String email);

    // Eliminar por ID
    void deleteById(Long id);
}
