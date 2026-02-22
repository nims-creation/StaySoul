# 🏨 StaySoul - Hotel Management System

<p align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-4.0.1-brightgreen?style=for-the-badge&logo=spring-boot" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Java-21-blue?style=for-the-badge&logo=java" alt="Java">
  <img src="https://img.shields.io/badge/PostgreSQL-SELECT-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge&logo=json-webtokens" alt="JWT">
  <img src="https://img.shields.io/badge/Stripe-Payment-blueviolet?style=for-the-badge&logo=stripe" alt="Stripe">
  <img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge" alt="License">
</p>

> A comprehensive hotel management backend system inspired by Airbnb, built with Spring Boot, featuring dynamic pricing, secure authentication, and seamless payment integration.

---

## 📖 About the Project

StaySoul is a robust hotel management backend system designed to facilitate seamless hotel booking operations. Just as Airbnb revolutionized the way people find unique accommodations around the world, StaySoul aims to provide a modern, scalable architecture for property management and booking services. The system enables hotel owners to list their properties, manage rooms, track inventory in real-time, and implement dynamic pricing strategies to maximize revenue. Guests can search for hotels, view room availability, make bookings, and complete secure payments through an integrated payment gateway.

---

## 💡 Motivation

The inspiration for StaySoul stemmed from observing the growing demand for vacation rental platforms and the need for efficient property management systems. Traditional hotel management software often lacks flexibility and modern features like dynamic pricing and real-time inventory tracking. This project was built to demonstrate how modern technologies like Spring Boot, JWT authentication, and the Strategy Pattern can be leveraged to create a scalable, secure, and feature-rich hotel management system. The goal was to build a production-ready backend that mirrors real-world industry requirements while maintaining clean code architecture and best practices.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure token-based authentication with refresh token support |
| 🏨 **Hotel Management** | Create, update, delete and manage hotel listings |
| 🛏️ **Room Management** | Manage rooms with different amenities and pricing |
| 📅 **Booking System** | Complete booking lifecycle with status tracking |
| 📦 **Inventory Management** | Real-time room availability tracking |
| 💰 **Dynamic Pricing** | AI-driven pricing using Strategy Pattern |
| 💳 **Stripe Payments** | Secure payment processing with webhook support |
| 👥 **Guest Management** | Track and manage hotel guests |
| 📱 **RESTful APIs** | Well-documented REST APIs with Swagger |
| 🔒 **Role-Based Access** | Admin and User role management |

---

## 🛠️ Tech Stack

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| 🟢 Spring Boot | 4.0.1 | Framework |
| ☕ Java | 21 | Language |
| 🐘 PostgreSQL | Latest | Database |
| 🔒 Spring Security | Built-in | Security |
| 🔑 JWT | 0.12.6 | Authentication |
| 💳 Stripe | 31.4.0 | Payments |
| 📦 Lombok | Latest | Boilerplate Reduction |
| 🔄 ModelMapper | 3.2.2 | Object Mapping |
| 📘 SpringDoc OpenAPI | 2.5.0 | API Documentation |

### Build Tools

| Tool | Description |
|------|-------------|
| 🏗️ Maven | Build Automation |
| 📦 Spring Boot Maven Plugin | Packaging |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        StaySoul Architecture                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│   │   CONTROLLER │────▶│   SERVICE    │────▶│  REPOSITORY │    │
│   └──────────────┘     └──────────────┘     └──────────────┘    │
│          │                    │                    │            │
│          │                    │                    │            │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│   │      DTO     │     │   STRATEGY   │     │   ENTITY     │    │
│   └──────────────┘     └──────────────┘     └──────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Design Patterns Used

| Pattern | Implementation |
|---------|----------------|
| 🎯 **Strategy Pattern** | Dynamic Pricing (Surge, Occupancy, Holiday, Urgency) |
| 🏗️ **MVC Pattern** | Controller-Service-Repository |
| 🔄 **DTO Pattern** | Data Transfer Objects |
| 🔒 **Security Pattern** | JWT Filter Chain |

---

## 📁 Project Structure

```
StaySoul/
├── src/
│   ├── main/
│   │   ├── java/com/nimscreation/projects/StaySoul/
│   │   │   ├── controller/          # REST Controllers
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── UserController.java
│   │   │   │   ├── HotelController.java
│   │   │   │   ├── HotelBrowseController.java
│   │   │   │   ├── HotelBookingController.java
│   │   │   │   ├── RoomAdminController.java
│   │   │   │   ├── InventoryController.java
│   │   │   │   └── WebhookController.java
│   │   │   │
│   │   │   ├── service/            # Business Logic
│   │   │   │   ├── UserService.java / UserServiceImpl.java
│   │   │   │   ├── HotelService.java / HotelServiceImpl.java
│   │   │   │   ├── RoomService.java / RoomServiceImpl.java
│   │   │   │   ├── BookingService.java / BookingServiceImpl.java
│   │   │   │   ├── InventoryService.java / InventoryServiceImpl.java
│   │   │   │   ├── CheckoutService.java / CheckoutServiceImpl.java
│   │   │   │   ├── GuestService.java / GuestServiceImpl.java
│   │   │   │   └── PricingUpdateService.java
│   │   │   │
│   │   │   ├── repository/         # Data Access
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── HotelRepository.java
│   │   │   │   ├── RoomRepository.java
│   │   │   │   ├── BookingRepository.java
│   │   │   │   ├── InventoryRepository.java
│   │   │   │   ├── GuestRepository.java
│   │   │   │   └── HotelMinPriceRepository.java
│   │   │   │
│   │   │   ├── entity/             # JPA Entities
│   │   │   │   ├── User.java
│   │   │   │   ├── Hotel.java
│   │   │   │   ├── Room.java
│   │   │   │   ├── Booking.java
│   │   │   │   ├── Inventory.java
│   │   │   │   ├── Guest.java
│   │   │   │   └── enums/
│   │   │   │
│   │   │   ├── dto/                # Data Transfer Objects
│   │   │   │   ├── UserDto.java
│   │   │   │   ├── HotelDto.java
│   │   │   │   ├── RoomDto.java
│   │   │   │   ├── BookingDto.java
│   │   │   │   └── ... (many more)
│   │   │   │
│   │   │   ├── security/           # Security Configuration
│   │   │   │   ├── WebSecurityConfig.java
│   │   │   │   ├── JWTService.java
│   │   │   │   ├── JWTAuthFilter.java
│   │   │   │   └── AuthService.java
│   │   │   │
│   │   │   ├── Strategy/           # Pricing Strategies
│   │   │   │   ├── PricingStrategy.java
│   │   │   │   ├── BasePricingStrategy.java
│   │   │   │   ├── SurgePricingStrategy.java
│   │   │   │   ├── OccupancyPricingStrategy.java
│   │   │   │   ├── HolidayPricingStrategy.java
│   │   │   │   ├── UrgencyPricingStrategy.java
│   │   │   │   └── PricingService.java
│   │   │   │
│   │   │   ├── Configuration/      # App Configurations
│   │   │   │   ├── CorsConfig.java
│   │   │   │   ├── MapperConfig.java
│   │   │   │   └── StripeConfig.java
│   │   │   │
│   │   │   ├── advice/            # Exception Handling
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   ├── GlobalResponseHandler.java
│   │   │   │   ├── ApiError.java
│   │   │   │   └── ApiResponse.java
│   │   │   │
│   │   │   ├── exception/         # Custom Exceptions
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   └── UnAuthorisedException.java
│   │   │   │
│   │   │   ├── util/              # Utilities
│   │   │   │   └── AppUtils.java
│   │   │   │
│   │   │   └── StaySoulApplication.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application.yaml
│   │
│   └── test/
│       └── java/.../StaySoul/
│           └── StaySoulApplicationTests.java
│
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| ☕ Java JDK | 21 or higher |
| 🐘 PostgreSQL | 14 or higher |
| 🏗️ Maven | 3.8+ |

### Installation Steps

#### 1️⃣ Clone the Repository

```
bash
git clone https://github.com/yourusername/StaySoul.git
cd StaySoul
```

#### 2️⃣ Configure Database

Create a PostgreSQL database:

```
sql
CREATE DATABASE StaySoul;
```

#### 3️⃣ Update Configuration

Edit `src/main/resources/application.properties`:

```
properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/StaySoul
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
jwt.SecretKey=your_secure_secret_key

# Stripe Configuration (Optional)
stripe.secret.key=sk_test_...
stripe.webhook.secret=whsec_...
```

#### 4️⃣ Build the Project

```
bash
# Using Maven Wrapper
./mvnw clean install

# Or using Maven
mvn clean install
```

#### 5️⃣ Run the Application

```
bash
# Using Maven Wrapper
./mvnw spring-boot:run

# Or run the JAR
java -jar target/StaySoul-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

---

## 🔐 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/signup` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | User login | ❌ |
| POST | `/api/v1/auth/refresh` | Refresh JWT token | ❌ |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/users/profile` | Get user profile | ✅ |
| PUT | `/api/v1/users/profile` | Update profile | ✅ |

### Hotel Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/hotels` | Create hotel | ✅ (Admin) |
| GET | `/api/v1/hotels/{id}` | Get hotel details | ❌ |
| PUT | `/api/v1/hotels/{id}` | Update hotel | ✅ (Admin) |
| DELETE | `/api/v1/hotels/{id}` | Delete hotel | ✅ (Admin) |
| GET | `/api/v1/hotels/search` | Search hotels | ❌ |
| GET | `/api/v1/hotels/all` | Get all hotels | ❌ |

### Room Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/rooms` | Add room to hotel | ✅ (Admin) |
| GET | `/api/v1/rooms/{id}` | Get room details | ❌ |
| PUT | `/api/v1/rooms/{id}` | Update room | ✅ (Admin) |
| DELETE | `/api/v1/rooms/{id}` | Delete room | ✅ (Admin) |

### Booking Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/bookings` | Create booking | ✅ |
| GET | `/api/v1/bookings/{id}` | Get booking details | ✅ |
| GET | `/api/v1/bookings/user/{userId}` | Get user bookings | ✅ |
| PUT | `/api/v1/bookings/{id}/cancel` | Cancel booking | ✅ |

### Inventory Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/inventory` | Add inventory | ✅ (Admin) |
| GET | `/api/v1/inventory/{hotelId}` | Get hotel inventory | ❌ |
| PUT | `/api/v1/inventory/{id}` | Update inventory | ✅ (Admin) |

### Checkout Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/checkout/init` | Initialize payment | ✅ |
| POST | `/api/v1/webhooks/stripe` | Stripe webhook | ❌ |

---

## 💳 Payment Integration

### Stripe Integration Flow

```
┌─────────┐     ┌───────────┐     ┌────────────┐     ┌─────────┐
│  User   │───▶│  Backend   │───▶│   Stripe   │───▶│ Webhook │
└─────────┘     └───────────┘     └────────────┘     └─────────┘
     │              │                │               │
     │  1. Book     │  2. Create     │  3. Payment   │  4. Confirm
     │              │     Payment    │    Intent     │    Booking
```

### Configuration

Add your Stripe keys to `application.properties`:

```
properties
stripe.secret.key=sk_test_your_secret_key
stripe.webhook.secret=whsec_your_webhook_secret
```

---

## 📊 Database Schema

### Entity Relationships

```
┌──────────────┐       ┌──────────────┐
│     USER     │       │    HOTEL     │
├──────────────┤       ├──────────────┤
│ id           │       │ id           │
│ email        │       │ owner_id     │◀────┐
│ password     │       │ name         │      │
│ first_name   │       │ location     │      │
│ last_name    │       │ description  │      │
│ role         │       │ amenities    │      │
└──────────────┘       └──────────────┘      │
                              │              │
                              │ 1:N          │ 1:N
                              ▼              ▼
                        ┌──────────┐   ┌──────────┐
│      ROOM            │   ROOM   │   │INVENTORY │
├──────────────┐       ├──────────┤   ├──────────┤
│ id           │       │ id       │   │ id       │
│ hotel_id     │──────▶│ hotel_id │   │ room_id  │──────┐
│ room_type    │       │ price    │   │ date     │      │
│ capacity     │       │ capacity │   │ booked   │      │
│ price        │       │ amenity  │   └──────────┘      │
└──────────────┘       └──────────┘                     │
                              │                          │
                              │ 1:N                      │
                              ▼                          ▼
                        ┌──────────┐            ┌──────────┐
│      GUEST            │ BOOKING  │            │   GUEST  │
├──────────────┐       ├──────────┤            ├──────────┤
│ id           │       │ id       │            │ id       │
│ booking_id   │◀──────│ guest_id │            │ name     │
│ name         │       │ room_id  │            │ email    │
│ email        │       │ user_id  │            │ phone    │
│ phone        │       │ check_in │            └──────────┘
└──────────────┘       │ check_out│
                       │ status   │◀───────────┘
                       │ payment  │
                       └──────────┘
```

### Enums Used

| Enum | Values |
|------|--------|
| **BookingStatus** | PENDING, CONFIRMED, CANCELLED, COMPLETED |
| **PaymentStatus** | PENDING, COMPLETED, FAILED, REFUNDED |
| **Roles** | ADMIN, USER |

---

## 🔧 Configuration

### Application Properties

```
properties
# Application Name
spring.application.name=StaySoul

# Server Configuration
server.port=8080
server.servlet.context-path=/api/v1

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/StaySoul
spring.datasource.username=postgres
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.SecretKey=your_secret_key_min_32_characters

# Stripe Configuration
stripe.secret.key=sk_test_...
stripe.webhook.secret=whsec_...

# Frontend URL
frontend.url=http://localhost:3000
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | StaySoul |
| `DB_USERNAME` | Database username | postgres |
| `DB_PASSWORD` | Database password | - |
| `JWT_SECRET` | JWT secret key | - |
| `STRIPE_SECRET_KEY` | Stripe secret key | - |

---

## 📝 API Documentation

### Swagger UI

Once the application is running, access the interactive API documentation:

- **Swagger UI**: [http://localhost:8080/api/v1/swagger-ui.html](http://localhost:8080/api/v1/swagger-ui.html)
- **OpenAPI JSON**: [http://localhost:8080/api/v1/v3/api-docs](http://localhost:8080/api/v1/v3/api-docs)

### Sample API Calls

#### 1. Register User

```
bash
curl -X POST http://localhost:8080/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

#### 2. Login

```
bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### 3. Search Hotels

```
bash
curl -X GET "http://localhost:8080/api/v1/hotels/search?city=Mumbai&checkIn=2024-12-01&checkOut=2024-12-05&guests=2"
```

---

## 💰 Dynamic Pricing Strategy

StaySoul implements a sophisticated dynamic pricing system using the **Strategy Pattern**:

### Pricing Strategies

| Strategy | Description | Factor |
|----------|-------------|--------|
| 🏷️ **BasePricingStrategy** | Base room price | Fixed |
| 📈 **SurgePricingStrategy** | High demand surge | +10-50% |
| 👥 **OccupancyPricingStrategy** | Based on occupancy | +5-30% |
| 🎯 **UrgencyPricingStrategy** | Last minute bookings | +15-40% |
| 🎉 **HolidayPricingStrategy** | Holiday season | +20-100% |

### Pricing Calculation Flow

```
Base Price
    │
    ▼
┌─────────────────┐
│   Apply Surge   │ (+10-50%)
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  Apply Occupancy│ (+5-30%)
└─────────────────┘
    │
    ▼
┌─────────────────┐
│   Apply Urgency │ (+15-40%)
└─────────────────┘
    │
    ▼
┌─────────────────┐
│   Apply Holiday │ (+20-100%)
└─────────────────┘
    │
    ▼
 Final Price
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Coding Standards

- Follow Java naming conventions
- Add JavaDoc comments for public methods
- Write unit tests for new features
- Ensure code compiles without warnings

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

| | |
|---|---|
| **Developer** | Nitesh Mishra |
| **Email** | nitesh@example.com |
| **GitHub** | [github.com/nitesh-mishra](https://github.com) |

---

## 🙏 Acknowledgments

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Stripe Documentation](https://stripe.com/docs)
- [SpringDoc OpenAPI](https://springdoc.org/)
- [Airbnb](https://www.airbnb.com/) for inspiration

---

<p align="center">
  Made with ❤️ by <a href="https://github.com">Nitesh Mishra</a>
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=StaySoul&label=Profile%20Views&color=0e75b6&style=flat" alt="Profile Views">
</p>
