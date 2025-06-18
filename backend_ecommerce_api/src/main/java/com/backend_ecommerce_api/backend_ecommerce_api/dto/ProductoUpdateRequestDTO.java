package com.backend_ecommerce_api.backend_ecommerce_api.dto;

import lombok.Data;

@Data
public class ProductoUpdateRequestDTO {
	private String nombre;
	private double precio;
	private String descripcion;
	private int stock;
	private String imagen;
}
