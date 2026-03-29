package com.nimscreation.projects.StaySoul.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "StaySoul — Hotel Management API",
                version = "1.0.0",
                description = "A comprehensive hotel management backend system inspired by Airbnb. " +
                        "Features dynamic pricing, secure JWT authentication, OAuth2 Google login, " +
                        "Stripe payment integration, and real-time inventory management.",
                contact = @Contact(
                        name = "Nitesh Mishra",
                        email = "nitesh@nimscreation.com",
                        url = "https://github.com/nitesh-mishra"
                ),
                license = @License(
                        name = "MIT License",
                        url = "https://opensource.org/licenses/MIT"
                )
        ),
        servers = {
                @Server(url = "/api/v1", description = "Local Development Server")
        },
        security = @SecurityRequirement(name = "Bearer Authentication")
)
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer",
        description = "Enter your JWT access token obtained from /auth/login or /auth/signup"
)
public class OpenApiConfig {
    // All configuration is annotation-driven
}
