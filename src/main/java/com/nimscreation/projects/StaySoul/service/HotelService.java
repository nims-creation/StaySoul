package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.HotelDto;
import com.nimscreation.projects.StaySoul.dto.HotelInfoDto;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HotelService {

    HotelDto createNewHotel(HotelDto hotelDto);

    HotelDto getHotelById(Long id);

    HotelDto updateHotelById(Long id, HotelDto hotelDto);

    void deleteHotelById(Long id);

    void activateHotel(Long hotelId);

    HotelInfoDto getHotelInfoById(Long hotelId, LocalDate startDate, LocalDate endDate);

    Page<HotelDto> getAllHotels(Pageable pageable);
}
