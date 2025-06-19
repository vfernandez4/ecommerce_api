package com.backend_ecommerce_api.backend_ecommerce_api.model;

import java.util.ArrayList;
import java.util.List;

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
	//po rejemplo tengo 5 de estos celulares para vender
	// no se actualiza.
	@Column(nullable = false)
	private int stockInicial;

	// este es el stock que se va actualizandp cuando haya ventas
	@Column(nullable = false)
	private int stockActual;

	@Column(nullable = false)
	private String imagen;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "categoria_id", nullable = false)
	private Categoria categoria;

	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "productos_carritos",
        joinColumns = @JoinColumn(name = "producto_id"),
        inverseJoinColumns = @JoinColumn(name = "carrito_id")
    )
    private List<Carrito> carritos = new ArrayList<>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vendedor_id")
	private Usuario vendedor;
	
}
