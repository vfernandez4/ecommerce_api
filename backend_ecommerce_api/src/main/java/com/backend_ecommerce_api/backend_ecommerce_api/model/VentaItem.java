package com.backend_ecommerce_api.backend_ecommerce_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "venta_items")

public class VentaItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

	@Column(nullable = false)
    private int cantidad;

	@Column(nullable = false)
    private double subtotal;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "venta_id", nullable = false)
    private Venta venta;
}
