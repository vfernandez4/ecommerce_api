package com.backend_ecommerce_api.backend_ecommerce_api.dto;

import lombok.Data;

@Data
public class ProductoResponseDTO {
	private Long id;
	private String nombre;
	private double precio;
	private String descripcion;
 	private int stock;
	private String imagen;
	private Long categoriaId;
	private String categoriaNombre;
	private Long vendedorId;
	private String vendedorNombre;
}
