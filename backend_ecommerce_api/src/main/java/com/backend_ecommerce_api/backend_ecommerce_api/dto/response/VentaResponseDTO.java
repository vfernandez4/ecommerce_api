package com.backend_ecommerce_api.backend_ecommerce_api.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class VentaResponseDTO {
	private Long id;
	private Long comprador_id;
	private LocalDateTime fecha;
	private double total;
	private List<VentaItemResponseDTO> items;

	public VentaResponseDTO() {
		this.items = new ArrayList<>();
	}

	public void agregarItemDTO(VentaItemResponseDTO item) {
		this.items.add(item);
	}
}
