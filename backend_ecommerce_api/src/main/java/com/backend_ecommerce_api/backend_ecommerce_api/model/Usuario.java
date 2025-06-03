package com.backend_ecommerce_api.backend_ecommerce_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name = "usuarios")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String nombre;
    private String apellido;    
     
}
