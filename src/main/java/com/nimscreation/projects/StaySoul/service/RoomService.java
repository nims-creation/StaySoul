package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.controller.HotelInfoDto;
import com.nimscreation.projects.StaySoul.dto.RoomDto;

import java.util.List;

public interface RoomService {

    RoomDto createNewRoom(Long hotelId, RoomDto roomDto);

    List<RoomDto> getAllRoomsInHotel(Long hotelId);

    RoomDto getRoomById(Long roomId);

    void deleteRoomById(Long roomId);

    HotelInfoDto getHotelInfoById(Long hotelId);
}
