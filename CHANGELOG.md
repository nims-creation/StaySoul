# Changelog

All notable changes to **StaySoul** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [1.2.0] - 2026-06-05

### Added
- `category` field (`VARCHAR(64)`) to `Hotel` entity for property-type filtering
  - Maps directly to the existing `category` param in `HotelSearchRequestDto`
  - Composite DB index `idx_hotel_city_category` on `(city, category)` for search performance
- `wishlistCount` computed value and `clearAll()` method exposed from `WishlistContext`
  - `wishlistCount` — derived length for badge counters in Navbar / UI
  - `clearAll` — removes all saved properties at once without duplicating state logic in consumers
- `PropertyCardSkeleton` — standalone reusable shimmer placeholder component
  - Mirrors exact `PropertyCard` layout to prevent CLS (Cumulative Layout Shift)
  - Extracted from the previously inline `SkeletonCard` in `PropertyGrid`

### Changed
- `HealthController` `/health` endpoint now returns richer runtime metadata:
  - `environment` — active Spring profile (`spring.profiles.active`)
  - `javaVersion` — JVM version string
  - `uptimeSeconds` — process uptime via `ManagementFactory.getRuntimeMXBean()`
  - Version bumped to `1.2.0` in the response body
  - Response switched from `Map.of()` to `LinkedHashMap` to preserve JSON field order
- `ScrollToTop` scroll listener now uses `requestAnimationFrame` throttle to reduce main-thread jank
  - `aria-label` updated to "Scroll back to top" (more descriptive)
  - Added native `title` tooltip for mouse-user discoverability
  - `aria-hidden="true"` on decorative `ChevronUp` icon
  - Icon tints primary colour on hover via Tailwind `group` variant

### Fixed
- `ReviewSection` was calling `http://localhost:8080` directly — silently broken in all deployed environments
  - Replaced raw `fetch()` with centralized `apiClient` from `api/apiClient.js`
  - `VITE_API_BASE_URL` env variable now correctly respected
  - Removed stale unused imports: `Image as ImageIcon`, `hotelApi`, `bookingApi`

---
## [1.1.0] - 2026-06-04

### Added
- `CHANGELOG.md` to track all project changes going forward
- `description` field to `Room` entity for richer room metadata
- `totalRooms` computed formula to `Hotel` entity via `@Formula`
- `@Formula` `totalNights` computed field to `Booking` entity (check-out minus check-in in SQL)
- Stateful amenity checkboxes in `FilterModal` with apply support
- `IllegalArgumentException` handler in `GlobalExceptionHandler`
- `@Table` name annotation and DB index on `paymentSessionId` in `Booking`
- `loading="lazy"` on `PropertyCard` images for improved performance
- `aria-label` on wishlist heart button for accessibility
- `formatCompactCurrency` helper and improved `formatCurrency` in `currencyUtils.js`
- Dynamic `<title>` update on the Home page via `useDocumentTitle` hook
- Night count (Duration column with Moon icon) in MyTrips booking cards via `getNightCount`
- `useDocumentTitle` extended to `NotFound`, `BookingCancel`, and `PaymentStatus` pages
  - `PaymentStatus` title updates dynamically with each polling state

### Changed
- `FilterModal` amenities are now controlled (tracked in local state)
- `currencyUtils.js` now exports a compact formatter for large amounts
- `Home` page title management migrated from raw `document.title` to `useDocumentTitle` hook

### Fixed
- Wishlist button lacked accessible label — now fixed with `aria-label`
- `MyTrips` cancel flow replaced `window.confirm` with an inline animated confirmation row

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
