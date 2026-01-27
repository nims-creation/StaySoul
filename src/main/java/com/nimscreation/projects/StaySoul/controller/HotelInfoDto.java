package com.nimscreation.projects.StaySoul.controller;

import com.nimscreation.projects.StaySoul.dto.HotelDto;
import com.nimscreation.projects.StaySoul.dto.RoomDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor

public class HotelInfoDto {
    private HotelDto hotel;
    private List<RoomDto> rooms;

}
