package com.backend_ecommerce_api.backend_ecommerce_api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.backend_ecommerce_api.backend_ecommerce_api.model.Rol;
import com.backend_ecommerce_api.backend_ecommerce_api.model.Usuario;
import com.backend_ecommerce_api.backend_ecommerce_api.repository.UsuarioRepository;

@Component
public class DataInitializer implements CommandLineRunner{
	
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@clicko.com";
        if (!usuarioRepository.existsByEmail(adminEmail)) {
            Usuario admin = new Usuario();
            admin.setNombreCompleto("Administrador");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("Admin123!"));
            admin.setRol(Rol.ROLE_ADMIN);
            usuarioRepository.save(admin);
            System.out.println("Usuario ADMIN creado: " + adminEmail + " / Admin123!");
        }
    }
}
