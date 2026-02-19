package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.BookingDto;
import com.nimscreation.projects.StaySoul.dto.BookingRequest;
import com.nimscreation.projects.StaySoul.dto.GuestDto;

import java.util.List;

public interface BookingService {

    BookingDto initialiseBooking(BookingRequest bookingRequest);

    BookingDto addGuests(Long bookingId, List<GuestDto> guestDtoList);

    String inintiatePayments(Long bookingId);
}
