package com.nimscreation.projects.StaySoul.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Public health check endpoint — used by Render/Railway keep-alive pings
 * and monitoring systems. No authentication required.
 */
@RestController
@RequestMapping("/health")
@Tag(name = "Health", description = "Application health and status endpoints")
public class HealthController {

    @GetMapping
    @Operation(summary = "Health check", description = "Returns application status and current timestamp")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "application", "StaySoul",
                "timestamp", LocalDateTime.now().toString(),
                "version", "1.0.0"
        ));
    }

    @GetMapping("/ping")
    @Operation(summary = "Simple ping", description = "Lightweight ping endpoint for keep-alive")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }
}
