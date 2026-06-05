package com.nimscreation.projects.StaySoul.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Public health check endpoint — used by Render/Railway keep-alive pings
 * and monitoring systems. No authentication required.
 */
@RestController
@RequestMapping("/health")
@Tag(name = "Health", description = "Application health and status endpoints")
public class HealthController {

    @Value("${spring.profiles.active:default}")
    private String activeProfile;

    @GetMapping
    @Operation(summary = "Health check", description = "Returns application status, environment, and runtime metadata")
    public ResponseEntity<Map<String, Object>> health() {
        long uptimeMillis = ManagementFactory.getRuntimeMXBean().getUptime();

        // LinkedHashMap preserves insertion order in the JSON response
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "UP");
        body.put("application", "StaySoul");
        body.put("version", "1.2.0");
        body.put("environment", activeProfile);
        body.put("javaVersion", System.getProperty("java.version"));
        body.put("uptimeSeconds", uptimeMillis / 1000);
        body.put("timestamp", LocalDateTime.now().toString());

        return ResponseEntity.ok(body);
    }

    @GetMapping("/ping")
    @Operation(summary = "Simple ping", description = "Lightweight ping endpoint for keep-alive")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }
}

