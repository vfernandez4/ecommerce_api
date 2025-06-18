package com.backend_ecommerce_api.backend_ecommerce_api.dto;

import lombok.Data;

@Data
public class CarritoItemRequestDTO {
    private Long productoId;
    private int cantidad;
}
