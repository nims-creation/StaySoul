package com.nimscreation.projects.StaySoul.dto;

import com.nimscreation.projects.StaySoul.entity.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingStatusResponseDto {
    private BookingStatus bookingStatus;
}
