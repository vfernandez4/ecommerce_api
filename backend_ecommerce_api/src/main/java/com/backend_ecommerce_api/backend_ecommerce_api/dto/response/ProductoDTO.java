package com.backend_ecommerce_api.backend_ecommerce_api.dto.response;

import lombok.Data;

@Data
public class ProductoDTO {
	private String nombre;
	private double precio;
	private String imagen;
	private String descripcion;

	public ProductoDTO(String nombre, double precio, String imagen, String descripcion) {
		this.nombre = nombre;
		this.precio = precio;
		this.imagen = imagen;
		this.descripcion = descripcion;
	}
}
