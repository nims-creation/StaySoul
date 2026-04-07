package com.nimscreation.projects.StaySoul.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "StaySoul — Hotel Management API",
                version = "1.0.0",
                description = """
                        ## 🏨 StaySoul REST API
                        
                        A comprehensive standalone REST API backend for a hotel management system inspired by Airbnb.
                        
                        ### Features
                        - 🔐 **JWT Authentication** — Secure login, signup, and token refresh
                        - 🌐 **Google OAuth2** — One-click Google login support
                        - 🏨 **Hotel Management** — Full CRUD for hotels (Admin only)
                        - 🛏️ **Room Management** — Create, update, delete hotel rooms (Admin only)
                        - 📦 **Inventory Control** — Manage room availability and surge pricing
                        - 🔍 **Hotel Search** — Search hotels by city and date range
                        - 🛒 **Booking Flow** — Initiate, guest-add, pay, cancel, and track bookings
                        - 💳 **Stripe Payments** — Secure checkout session via Stripe
                        - 📧 **Email Notifications** — Automated booking confirmation emails
                        - 📊 **Reports** — Hotel booking reports by date range
                        - 🚦 **Rate Limiting** — Per-IP request throttling via Bucket4j
                        
                        ### Authentication
                        Most endpoints require a **Bearer JWT token** in the Authorization header.
                        1. Call `POST /auth/signup` or `POST /auth/login` to get a token
                        2. Click **Authorize** (🔒) above and enter: `<your_token>`
                        3. All secured requests will automatically include the token
                        
                        ### Role-Based Access
                        | Role | Access |
                        |------|--------|
                        | `HOTEL_MANAGER` | All `/admin/**` endpoints |
                        | Authenticated User | `/bookings/**`, `/users/**` |
                        | Public | `/auth/**`, `/hotels/**` |
                        """,
                contact = @Contact(
                        name = "Nitesh Mishra — NimsCreation",
                        email = "nimscreation06@gmail.com",
                        url = "https://github.com/nimscreation06"
                ),
                license = @License(
                        name = "MIT License",
                        url = "https://opensource.org/licenses/MIT"
                )
        ),
        servers = {
                @Server(url = "/api/v1", description = "🖥️ Local Development Server (http://localhost:8080/api/v1)"),
        },
        security = @SecurityRequirement(name = "Bearer Authentication"),
        tags = {
                @Tag(name = "Auth",
                        description = "🔐 Authentication endpoints — Signup, Login (email/password & Google OAuth2), and JWT token refresh"),

                @Tag(name = "Browse Hotels",
                        description = "🔍 Public hotel search — Search available hotels by city and date range, and view hotel details"),

                @Tag(name = "Booking Flow",
                        description = "🛒 Guest booking lifecycle — Initiate bookings, add guests, pay via Stripe, check status, and cancel"),

                @Tag(name = "Booking Guests",
                        description = "👥 Guest management — Add, update, and remove guests saved to your profile for quick checkout"),

                @Tag(name = "Profile",
                        description = "👤 User profile — View and update your personal profile, and see all your past bookings"),

                @Tag(name = "Admin Hotel",
                        description = "🏨 [HOTEL_MANAGER] Hotel administration — Create, read, update, delete, and activate hotels"),

                @Tag(name = "Admin Inventory",
                        description = "🛏️ [HOTEL_MANAGER] Room & inventory management — Manage rooms, availability windows, and apply surge pricing"),

                @Tag(name = "Admin Bookings",
                        description = "📊 [HOTEL_MANAGER] Booking oversight — View all bookings for a hotel and generate date-range revenue reports"),

                @Tag(name = "Webhook",
                        description = "🔔 Stripe webhook — Receives Stripe payment events to confirm or fail bookings automatically")
        }
)
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer",
        description = "Enter the JWT access token obtained from **POST /auth/login** or **POST /auth/signup**. " +
                "Do NOT prefix it with 'Bearer ' — Swagger adds that automatically."
)
public class OpenApiConfig {
    // All configuration is annotation-driven. No bean methods needed.
}
