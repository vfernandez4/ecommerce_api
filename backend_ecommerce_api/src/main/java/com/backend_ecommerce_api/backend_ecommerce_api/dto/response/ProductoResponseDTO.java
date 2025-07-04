package com.backend_ecommerce_api.backend_ecommerce_api.dto.response;

import lombok.Data;

@Data
public class ProductoResponseDTO {
	private Long id;
	private String nombre;
	private double precio;
	private String descripcion;
 	private int stockInicial;
	private int stockActual;
	private String imagen;
	private Long categoriaId;
	private String categoriaNombre;
	private Long vendedorId;
	private String vendedorNombre;
}
