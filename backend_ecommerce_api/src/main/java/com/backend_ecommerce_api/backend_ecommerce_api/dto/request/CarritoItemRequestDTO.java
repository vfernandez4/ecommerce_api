package com.backend_ecommerce_api.backend_ecommerce_api.dto.request;

import lombok.Data;

@Data
public class CarritoItemRequestDTO {
    private Long productoId;
    private int cantidad;
}
