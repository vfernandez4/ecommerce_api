package com.backend_ecommerce_api.backend_ecommerce_api.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Venta;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
	long countByFechaBetween(LocalDateTime inicio, LocalDateTime fin);
}
