package com.backend_ecommerce_api.backend_ecommerce_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Buscar productos por nombre de la categoría
    List<Producto> findByCategoriaNombre(String categoria);

    // Buscar productos cuyo nombre contenga una palabra (ignorando mayúsculas/minúsculas)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    // Buscar productos por el email del vendedor
    List<Producto> findByVendedorEmail(String email);

    // Obtener 5 productos aleatorios (destacados)
    @Query(value = "SELECT * FROM productos ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Producto> findDestacados();

    // Buscar productos vendidos por el vendedor (stock actual menor al inicial)
    @Query("""
        SELECT p 
        FROM Producto p
        WHERE p.vendedor.email = :email
        AND p.stockActual < p.stockInicial
    """)
    List<Producto> findVendidosByVendedorEmail(@Param("email") String email);
}
