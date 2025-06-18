package com.backend_ecommerce_api.backend_ecommerce_api.dto;

import lombok.Data;
import java.util.List;

@Data
public class CarritoResponseDTO {
    private Long usuarioId;
    private List<CarritoItemResponseDTO> items;
    private double total;
}
