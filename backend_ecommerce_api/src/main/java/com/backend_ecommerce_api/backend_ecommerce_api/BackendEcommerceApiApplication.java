package com.backend_ecommerce_api.backend_ecommerce_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = { SystemMetricsAutoConfiguration.class })
public class BackendEcommerceApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendEcommerceApiApplication.class, args);
	}

}
