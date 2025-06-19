package com.backend_ecommerce_api.backend_ecommerce_api.dto.request;

import lombok.Data;

@Data
public class ProductoPublicarRequestDTO {
	private String nombre;
	private double precio;
	private String descripcion;
	private int stockInicial;
	private String imagen;
	private Long categoriaId;
	private Long vendedorId;
}
