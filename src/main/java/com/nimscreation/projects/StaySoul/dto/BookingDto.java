package com.nimscreation.projects.StaySoul.dto;

import com.nimscreation.projects.StaySoul.entity.enums.BookingStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Set;

@Data
public class BookingDto {

    private Long id;
    private Integer roomCount;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private BookingStatus bookingStatus;
    private Set<GuestDto> guests;
    private BigDecimal amount;
    private String paymentSessionId;

    /**
     * Computed convenience field: number of nights between checkIn and checkOut.
     */
    public Long getTotalNights() {
        if (checkInDate == null || checkOutDate == null) return null;
        return ChronoUnit.DAYS.between(checkInDate, checkOutDate);
    }
}
