package com.backend_ecommerce_api.backend_ecommerce_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByCategoria_Nombre(String categoria);
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    List<Producto> findByVendedor_Email(String email);
    
    // Metodo que retorna 5 productos aleatorios para mostrar en la seccion de destacados
    @org.springframework.data.jpa.repository.Query(value = "SELECT * FROM producto ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Producto> findDestacados();
}
