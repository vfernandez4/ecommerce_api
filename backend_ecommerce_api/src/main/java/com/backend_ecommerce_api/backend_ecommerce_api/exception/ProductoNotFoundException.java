package com.backend_ecommerce_api.backend_ecommerce_api.exception;

public class ProductoNotFoundException extends RuntimeException {
    public ProductoNotFoundException(String message) {
        super(message);
    }
}
