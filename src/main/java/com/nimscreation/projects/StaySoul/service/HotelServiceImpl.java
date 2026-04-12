package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.*;
import com.nimscreation.projects.StaySoul.entity.Hotel;
import com.nimscreation.projects.StaySoul.entity.Room;
import com.nimscreation.projects.StaySoul.entity.User;
import com.nimscreation.projects.StaySoul.exception.ResourceNotFoundException;
import com.nimscreation.projects.StaySoul.exception.UnAuthorisedException;
import com.nimscreation.projects.StaySoul.repository.HotelRepository;
import com.nimscreation.projects.StaySoul.repository.InventoryRepository;
import com.nimscreation.projects.StaySoul.repository.RoomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import static com.nimscreation.projects.StaySoul.util.AppUtils.getCurrentUser;

@Service
@Slf4j
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService{

    private final HotelRepository hotelRepository;
    private final ModelMapper modelMapper;
    private final InventoryService inventoryService;
    private final RoomRepository roomRepository;
    private final InventoryRepository inventoryRepository;
    private final PricingUpdateService pricingUpdateService;

    @Override
    @Transactional
    @org.springframework.cache.annotation.CacheEvict(value = "hotelSearch", allEntries = true)
    public HotelDto createNewHotel(HotelDto hotelDto) {
        log.info("Creating a new hotel with name: {}", hotelDto.getName());
        Hotel hotel = modelMapper.map(hotelDto, Hotel.class);
        hotel.setActive(false);

        User user = getCurrentUser();
        hotel.setOwner(user);

        Hotel savedHotel = hotelRepository.save(hotel);
        log.info("Created a new hotel with ID: {}", savedHotel.getId());

        if (hotelDto.getRooms() != null && !hotelDto.getRooms().isEmpty()) {
            for (RoomDto roomDto : hotelDto.getRooms()) {
                Room room = modelMapper.map(roomDto, Room.class);
                room.setHotel(savedHotel);
                roomRepository.save(room);
            }
        }

        return modelMapper.map(savedHotel, HotelDto.class);
    }

    @Override
    public HotelDto getHotelById(Long id) {
        log.info("Getting the hotel with ID: {}", id);
        Hotel hotel = hotelRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: "+id));
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(!user.equals(hotel.getOwner())) {
            throw new UnAuthorisedException("This user does not own this hotel with id: "+id);
        }

        return modelMapper.map(hotel, HotelDto.class);
    }

    @Override
    @org.springframework.cache.annotation.CacheEvict(value = "hotelSearch", allEntries = true)
    public HotelDto updateHotelById(Long id, HotelDto hotelDto) {
        log.info("Updating the hotel with ID: {}", id);
        Hotel hotel = hotelRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: "+id));

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!user.equals(hotel.getOwner())) {
            throw new UnAuthorisedException("This user does not own this hotel with id: "+id);
        }

        // Prevent model mapper from overwriting the persistent rooms collection directly
        List<RoomDto> roomsDtoList = hotelDto.getRooms();
        hotelDto.setRooms(null);

        modelMapper.map(hotelDto, hotel);
        hotel.setId(id);
        hotel = hotelRepository.save(hotel);

        // Restore and manually process rooms
        if (roomsDtoList != null && !roomsDtoList.isEmpty()) {
            for (RoomDto roomDto : roomsDtoList) {
                if (roomDto.getId() != null) {
                    Room existingRoom = roomRepository.findById(roomDto.getId()).orElse(null);
                    if (existingRoom != null) {
                        modelMapper.map(roomDto, existingRoom);
                        existingRoom.setHotel(hotel);
                        roomRepository.save(existingRoom);
                    }
                } else {
                    Room newRoom = modelMapper.map(roomDto, Room.class);
                    newRoom.setHotel(hotel);
                    roomRepository.save(newRoom);
                }
            }
        }
        
        hotelDto.setRooms(roomsDtoList);
        hotelDto.setId(hotel.getId());
        return hotelDto;
    }

    @Override
    @Transactional
    @org.springframework.cache.annotation.CacheEvict(value = "hotelSearch", allEntries = true)
    public void deleteHotelById(Long id) {
        Hotel hotel = hotelRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: "+id));

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!user.equals(hotel.getOwner())) {
            throw new UnAuthorisedException("This user does not own this hotel with id: "+id);
        }


        for(Room room: hotel.getRooms()) {
            inventoryService.deleteAllInventories(room);
            roomRepository.deleteById(room.getId());
        }
        hotelRepository.deleteById(id);
    }

    @Override
    @Transactional
    @org.springframework.cache.annotation.CacheEvict(value = "hotelSearch", allEntries = true)
    public void activateHotel(Long hotelId) {
        log.info("Activating the hotel with ID: {}", hotelId);
        Hotel hotel = hotelRepository
                .findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: "+hotelId));

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(!user.equals(hotel.getOwner())) {
            throw new UnAuthorisedException("This user does not own this hotel with id: "+hotelId);
        }

        hotel.setActive(true);

        // assuming only do it once
        for(Room room: hotel.getRooms()) {
            inventoryService.initializeRoomForAYear(room);
        }
        
        pricingUpdateService.updateHotelPrices(hotel);
    }

    @Override
    @Transactional
    public HotelInfoDto getHotelInfoById(Long hotelId, LocalDate startDate, LocalDate endDate) {
        Hotel hotel = hotelRepository
                .findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with ID: "+hotelId));

        List<RoomPriceResponseDto> rooms;

        if (startDate != null && endDate != null) {
            long daysCount = ChronoUnit.DAYS.between(startDate, endDate) + 1;
            List<RoomPriceDto> roomPriceDtoList = inventoryRepository.findRoomAveragePrice(hotelId,
                    startDate, endDate, 1L, daysCount);

            rooms = roomPriceDtoList.stream()
                    .map(roomPriceDto -> {
                        RoomPriceResponseDto roomPriceResponseDto = modelMapper.map(roomPriceDto.getRoom(),
                                RoomPriceResponseDto.class);
                        roomPriceResponseDto.setPrice(roomPriceDto.getPrice());
                        return roomPriceResponseDto;
                    })
                    .collect(Collectors.toList());
        } else {
            // Fallback to base prices from the Room table
            rooms = hotel.getRooms().stream()
                    .map(room -> {
                        RoomPriceResponseDto dto = modelMapper.map(room, RoomPriceResponseDto.class);
                        dto.setPrice(room.getBasePrice().doubleValue());
                        return dto;
                    })
                    .collect(Collectors.toList());
        }

        return new HotelInfoDto(modelMapper.map(hotel, HotelDto.class), rooms);
    }

    @Override
    @Transactional
    public List<HotelDto> getAllHotels() {
        User user = getCurrentUser();
        log.info("Getting all hotels for the admin user with ID: {}", user.getId());
        List<Hotel> hotels = hotelRepository.findByOwner(user);

        return hotels
                .stream()
                .map((element) -> modelMapper.map(element, HotelDto.class))
                .collect(Collectors.toList());
    }


}

