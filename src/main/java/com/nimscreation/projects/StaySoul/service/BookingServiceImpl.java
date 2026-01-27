package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.BookingDto;
import com.nimscreation.projects.StaySoul.dto.BookingRequest;
import com.nimscreation.projects.StaySoul.entity.Booking;
import com.nimscreation.projects.StaySoul.entity.Hotel;
import com.nimscreation.projects.StaySoul.entity.Inventory;
import com.nimscreation.projects.StaySoul.entity.Room;
import com.nimscreation.projects.StaySoul.entity.enums.BookingStatus;
import com.nimscreation.projects.StaySoul.exception.ResourceNotFoundException;
import com.nimscreation.projects.StaySoul.repository.BookingRepository;
import com.nimscreation.projects.StaySoul.repository.HotelRepository;
import com.nimscreation.projects.StaySoul.repository.InventoryRepository;
import com.nimscreation.projects.StaySoul.repository.RoomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j

public class BookingServiceImpl implements BookingService{

    private final BookingRepository bookingRepository;
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final InventoryRepository inventoryRepository;

    @Override
    @Transactional
    public BookingDto initializeBooking(BookingRequest bookingRequest) {

        log.info("Initialising booking for hotel :{},room :{}, date {}--{}",
                bookingRequest.getHotelId(),
                bookingRequest.getRoomId(),
                bookingRequest.getCheckInDate(),
                bookingRequest.getCheckOutDate()
        );

        Hotel hotel = hotelRepository.findById(bookingRequest.getHotelId()).orElseThrow(()->
                new ResourceNotFoundException("Hotel not found with id:"+bookingRequest.getHotelId()));

        Room room = roomRepository.findById(bookingRequest.getRoomId()).orElseThrow(()->
                new ResourceNotFoundException("Room not found with id:"+bookingRequest.getRoomId()));

        List<Inventory> inventoryList = inventoryRepository.findAndLockAvailableInventory(room.getId(),
                bookingRequest.getCheckInDate(),
                bookingRequest.getCheckOutDate(),
                bookingRequest.getRoomsCount()
        );

        long daysCount = ChronoUnit.DAYS.between(bookingRequest.getCheckInDate(),bookingRequest.getCheckOutDate()) +1;

        if(inventoryList.size()!= daysCount){
            throw new IllegalStateException("Room is not available anymore");
        }

        // Reserve the room ya update the booked count of the inventory
        for(Inventory inventory: inventoryList){
            inventory.setBookedCount(inventory.getBookedCount() + bookingRequest.getRoomsCount());
        }
        inventoryRepository.saveAll(inventoryList);

        // Aab create the booking

        Booking booking = Booking.builder()
                .bookingStatus(BookingStatus.RESERVED)
                .hotel(hotel)
                .room(room)
                .checkInDate(bookingRequest.getCheckInDate())
                .checkOutDate(bookingRequest.getCheckOutDate())



    }
}
