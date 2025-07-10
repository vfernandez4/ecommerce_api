package com.backend_ecommerce_api.backend_ecommerce_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	// Método para encontrar un usuario por su email
	Optional<Usuario> findByEmail(String email);
	
	// Método para verificar si un usuario existe por su email
	boolean existsByEmail(String email);
	
	// Método para eliminar un usuario por su id
	void deleteById(Long id);

	@Query("SELECT COUNT(*) FROM Usuario WHERE rol='COMPRADOR' or rol='COMPRADOR_VENDEDOR'")
	long countTotalCompradores();

	@Query("SELECT COUNT(*) FROM Usuario WHERE rol='COMPRADOR_VENDEDOR'")
	long countTotalVendedores();
}
