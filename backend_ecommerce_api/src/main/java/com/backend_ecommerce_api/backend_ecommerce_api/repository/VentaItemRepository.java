package com.backend_ecommerce_api.backend_ecommerce_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend_ecommerce_api.backend_ecommerce_api.model.VentaItem;

@Repository
public interface VentaItemRepository extends JpaRepository<VentaItem, Long>{
	
}
