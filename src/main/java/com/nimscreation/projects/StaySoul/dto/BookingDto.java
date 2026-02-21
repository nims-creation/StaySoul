package com.nimscreation.projects.StaySoul.dto;

import com.nimscreation.projects.StaySoul.entity.Hotel;
import com.nimscreation.projects.StaySoul.entity.Room;
import com.nimscreation.projects.StaySoul.entity.User;
import com.nimscreation.projects.StaySoul.entity.enums.BookingStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class BookingDto {

    private Long id;
    private  Integer roomCount;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private LocalDateTime createdAt;
    private LocalDateTime UpdatedAt;
    private BookingStatus bookingStatus;
    private Set<GuestDto> guests;
    private BigDecimal amount;
}
