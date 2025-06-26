package com.backend_ecommerce_api.backend_ecommerce_api.dto.request;

import lombok.Data;

@Data
public class ProductoUpdateRequestDTO {
	private Long id;
	private String nombre;
	private double precio;
	private String descripcion;
	private int stockActual;
	private String imagen;
}
