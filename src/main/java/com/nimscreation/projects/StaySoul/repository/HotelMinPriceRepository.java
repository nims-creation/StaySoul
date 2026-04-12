package com.nimscreation.projects.StaySoul.repository;

import com.nimscreation.projects.StaySoul.entity.Hotel;
import com.nimscreation.projects.StaySoul.entity.HotelMinPrice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.Optional;


public interface HotelMinPriceRepository extends JpaRepository<HotelMinPrice, Long> {

    @Query(value = """
            SELECT DISTINCT h.id as hotel_id, AVG(hmp.price) as avg_price
            FROM hotel_min_price hmp
            JOIN hotel h ON hmp.hotel_id = h.id
            WHERE (CAST(:city AS text) IS NULL OR CAST(:city AS text) = '' OR LOWER(h.city) LIKE LOWER(CONCAT('%', CAST(:city AS text), '%')))
                AND hmp.date BETWEEN :startDate AND :endDate
                AND h.active = true
                AND (CAST(:category AS text) IS NULL OR CAST(:category AS text) = '' OR CAST(:category AS text) = ANY(h.amenities))
            GROUP BY h.id, h.name
            HAVING (CAST(:minPrice AS numeric) IS NULL OR AVG(hmp.price) >= CAST(:minPrice AS numeric))
                AND (CAST(:maxPrice AS numeric) IS NULL OR AVG(hmp.price) <= CAST(:maxPrice AS numeric))
            """, 
            countQuery = """
            SELECT COUNT(DISTINCT h.id)
            FROM hotel_min_price hmp
            JOIN hotel h ON hmp.hotel_id = h.id
            WHERE (CAST(:city AS text) IS NULL OR CAST(:city AS text) = '' OR LOWER(h.city) LIKE LOWER(CONCAT('%', CAST(:city AS text), '%')))
                AND hmp.date BETWEEN :startDate AND :endDate
                AND h.active = true
                AND (CAST(:category AS text) IS NULL OR CAST(:category AS text) = '' OR CAST(:category AS text) = ANY(h.amenities))
            """,
            nativeQuery = true)
    Page<Object[]> findHotelsWithAvailableInventoryNative(
            @Param("city") String city,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("category") String category,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );

    Optional<HotelMinPrice> findFirstByHotelAndDate(Hotel hotel, LocalDate date);
    
    java.util.List<HotelMinPrice> findByHotelAndDateBetween(Hotel hotel, LocalDate startDate, LocalDate endDate);
}
