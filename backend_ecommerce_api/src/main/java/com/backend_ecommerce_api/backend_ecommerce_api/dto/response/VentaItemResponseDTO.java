package com.backend_ecommerce_api.backend_ecommerce_api.dto.response;

import lombok.Data;

@Data
public class VentaItemResponseDTO {
	private Long id;
	private Long productoId;
	private int cantidad;
	private double subtotal;
	private Long ventaId;
}
