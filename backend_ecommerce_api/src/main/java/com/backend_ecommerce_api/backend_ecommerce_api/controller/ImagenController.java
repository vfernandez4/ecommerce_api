package com.backend_ecommerce_api.backend_ecommerce_api.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/images")
public class ImagenController {

    @GetMapping("/**")
    public ResponseEntity<Resource> serveImage(HttpServletRequest request) throws Exception {
        String path = request.getRequestURI().replace("/api/images/", "");
        Path imagePath = Paths.get("uploads/productos").resolve(path).normalize();

        Resource resource = new UrlResource(imagePath.toUri());
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String contentType = Files.probeContentType(imagePath);
        if (contentType == null) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .body(resource);
    }
}
