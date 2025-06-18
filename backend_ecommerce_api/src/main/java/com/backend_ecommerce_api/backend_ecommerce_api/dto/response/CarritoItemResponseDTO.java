package com.backend_ecommerce_api.backend_ecommerce_api.dto.response;

import lombok.Data;

@Data
public class CarritoItemResponseDTO {
    private Long productoId;
    private String nombreProducto;
    private double precioUnitario;
    private int cantidad;
    private double subtotal;
}
