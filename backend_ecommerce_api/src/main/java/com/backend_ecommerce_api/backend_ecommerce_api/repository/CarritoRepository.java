package com.backend_ecommerce_api.backend_ecommerce_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Carrito;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    Optional<Carrito> findByUsuarioId(Long usuarioId);
    boolean existsByUsuario_Id(Long usuarioId);
    Carrito findByUsuario_Id(Long usuarioId);
    void deleteByUsuario_Id(Long usuarioId);
}
