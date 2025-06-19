package com.backend_ecommerce_api.backend_ecommerce_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByCategoriaNombre(String categoria);
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    List<Producto> findByVendedorEmail(String email);
    
    // Metodo que retorna 5 productos aleatorios para mostrar en la seccion de destacados
    @Query(value = "SELECT * FROM productos ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Producto> findDestacados();

	@Query("""
		SELECT p 
		FROM Producto 
		WHERE p.vendedor.email = :email
		AND p.stockActual < p.stockInicial
	""")
  	List<Producto> findVendidosByVendedorEmail(@Param("email") String email);
}