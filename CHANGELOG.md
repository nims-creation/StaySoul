# Changelog

All notable changes to **StaySoul** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- `CHANGELOG.md` to track all project changes going forward
- `description` field to `Room` entity for richer room metadata
- `totalRooms` computed formula to `Hotel` entity via `@Formula`
- Stateful amenity checkboxes in `FilterModal` with apply support
- `IllegalArgumentException` handler in `GlobalExceptionHandler`
- `@Table` name annotation and DB index on `paymentSessionId` in `Booking`
- `loading="lazy"` on `PropertyCard` images for improved performance
- `aria-label` on wishlist heart button for accessibility
- `formatCompactCurrency` helper and improved `formatCurrency` in `currencyUtils.js`
- Dynamic `<title>` update on the Home page via `useEffect`

### Changed
- `FilterModal` amenities are now controlled (tracked in local state)
- `currencyUtils.js` now exports a compact formatter for large amounts

### Fixed
- Wishlist button lacked accessible label — now fixed with `aria-label`

---

## [1.0.0] - 2026-05-10

### Added
- Initial production release of StaySoul platform
- Full-stack hotel booking system with Spring Boot + React/Vite
- JWT & Google OAuth2 authentication
- Stripe payment integration with webhook fulfillment
- Dynamic pricing via Strategy Pattern (Surge, Holiday, Urgency)
- Cloudinary image uploads
- Interactive Leaflet map for property discovery
- Server-side pagination with native PostgreSQL queries
- Rate limiting via Bucket4j
- Swagger/OpenAPI documentation
- Render + Vercel deployment configuration
