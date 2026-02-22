package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.controller.HotelInfoDto;
import com.nimscreation.projects.StaySoul.dto.HotelDto;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface HotelService {

    HotelDto createNewHotel(HotelDto hotelDto);

    HotelDto getHotelById(Long id);

    HotelDto updateHotelById(Long id, HotelDto hotelDto);

    void deleteHotelById(Long id);

    void activateHotel(Long hotelId);

    HotelInfoDto getHotelInfoById(Long hotelId);

    List<HotelDto> getAllHotels();
}
