package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.HotelDto;

public interface HotelService {

    HotelDto createNewHotel(HotelDto hotelDto);

    HotelDto getHotelById(Long id);

    HotelDto updateHotelById(long id, HotelDto hotelDto);

    void deleteHotelById(long hotelId);
}
