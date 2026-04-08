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
            WHERE h.city = :city
                AND hmp.date BETWEEN :startDate AND :endDate
                AND h.active = true
                AND (:category IS NULL OR :category = '' OR :category = ANY(h.amenities))
            GROUP BY h.id, h.name
            HAVING (:minPrice IS NULL OR AVG(hmp.price) >= :minPrice)
                AND (:maxPrice IS NULL OR AVG(hmp.price) <= :maxPrice)
            """, 
            countQuery = """
            SELECT COUNT(DISTINCT h.id)
            FROM hotel_min_price hmp
            JOIN hotel h ON hmp.hotel_id = h.id
            WHERE h.city = :city
                AND hmp.date BETWEEN :startDate AND :endDate
                AND h.active = true
                AND (:category IS NULL OR :category = '' OR :category = ANY(h.amenities))
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

    Optional<HotelMinPrice> findByHotelAndDate(Hotel hotel, LocalDate date);
}
