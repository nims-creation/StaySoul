package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.HotelDto;
import com.nimscreation.projects.StaySoul.entity.Hotel;
public interface HotelService {

    Hotel createNewHotel(HotelDto hotelDto);

    Hotel getHotelById(Long id);
}
