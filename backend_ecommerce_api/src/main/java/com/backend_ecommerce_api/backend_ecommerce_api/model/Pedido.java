package com.backend_ecommerce_api.backend_ecommerce_api.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name = "pedidos")
public class Pedido {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String detalle;    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
