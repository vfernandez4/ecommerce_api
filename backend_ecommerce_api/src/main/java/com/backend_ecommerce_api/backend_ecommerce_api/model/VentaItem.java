package com.backend_ecommerce_api.backend_ecommerce_api.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "venta_items")

public class VentaItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
    @JoinColumn(name = "producto_id")
    private Producto producto;

	@Column(nullable = false)
    private int cantidad;

	@Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

	@ManyToOne
    @JoinColumn(name = "venta_id", nullable = false)
    private Venta venta;
}
