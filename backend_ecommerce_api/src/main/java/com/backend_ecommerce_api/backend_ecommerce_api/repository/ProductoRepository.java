package com.backend_ecommerce_api.backend_ecommerce_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

}
