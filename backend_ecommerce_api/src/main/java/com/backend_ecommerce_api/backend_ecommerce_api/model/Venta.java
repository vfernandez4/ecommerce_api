package com.backend_ecommerce_api.backend_ecommerce_api.model;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ventas")

public class Venta {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id")
	private Usuario comprador;

	@Column(nullable = false)
	private LocalDateTime fecha;

	@Column(nullable = false)
	private double total;

	@OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VentaItem> items = new ArrayList<>();

	public void agregarItem(VentaItem item) {
		items.add(item);
	}

}
