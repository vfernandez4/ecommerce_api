package com.backend_ecommerce_api.backend_ecommerce_api.dto.request;

import java.util.List;

import lombok.Data;

@Data
public class CarritoRequestDTO {
    private List<CarritoItemRequestDTO> items;
}
