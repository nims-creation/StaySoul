package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.BookingDto;
import org.jspecify.annotations.Nullable;

public interface BookingService {

    BookingDto initialiseBooking(BookingRequest bookingRequest);

    BookingDto addGuests(Long bookingId, List<GuestDto> guestDtoList);

}
