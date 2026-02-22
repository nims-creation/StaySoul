package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.HotelDto;
import com.nimscreation.projects.StaySoul.dto.HotelPriceDto;
import com.nimscreation.projects.StaySoul.dto.HotelSearchRequest;
import com.nimscreation.projects.StaySoul.dto.InventoryDto;
import com.nimscreation.projects.StaySoul.entity.Room;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;

import java.util.List;

public interface InventoryService {

    void initializeRoomForAYear(Room room);

    void deleteAllInventories(Room room);

    Page<HotelPriceDto> searchHotels(HotelSearchRequest hotelSearchRequest);

     List<InventoryDto> getAllInventoryByRoom(Long roomId);
}
