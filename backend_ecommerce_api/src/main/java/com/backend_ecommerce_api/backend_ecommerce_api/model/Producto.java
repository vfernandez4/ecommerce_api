package com.backend_ecommerce_api.backend_ecommerce_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "productos")

public class Producto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private double precio;

	@Column(nullable = false)
	private String descripcion;

	// aca iria el stock que carga el usuario cuando publica un producto
	//por ejemplo tengo 5 de estos celulares para vender
	// no se actualiza.
	@Column(nullable = false)
	private int stockInicial;

	// este es el stock que se va actualizando cuando haya ventas
	@Column(nullable = false)
	private int stockActual;

	@Column(nullable = false)
	private String imagen;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "categoria_id", nullable = false)
	private Categoria categoria;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vendedor_id")
	private Usuario vendedor;

	public void disminuirStock(int cantidad) {
		this.stockActual -= cantidad;
	}
	
}
