package com.nimscreation.projects.StaySoul.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HotelInfoDto {
    private HotelDto hotel;
    private List<RoomPriceResponseDto> rooms;
}
