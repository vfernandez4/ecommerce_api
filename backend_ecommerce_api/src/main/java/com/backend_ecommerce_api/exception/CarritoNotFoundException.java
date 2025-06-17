package com.backend_ecommerce_api.exception;

public class CarritoNotFoundException extends RuntimeException {
    public CarritoNotFoundException(String message) {
        super(message);
    }
}
