package com.backend_ecommerce_api.backend_ecommerce_api.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.backend_ecommerce_api.backend_ecommerce_api.dto.LoginRequest;
import com.backend_ecommerce_api.backend_ecommerce_api.service.AutenticadorService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/autenticacion")
@RequiredArgsConstructor

public class AutenticadorController {
	private final AutenticadorService autenticadorService;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
		return ResponseEntity.ok(autenticadorService.register(request));
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest request) {
		return ResponseEntity.ok(autenticadorService.login(request));
	}
	
}
