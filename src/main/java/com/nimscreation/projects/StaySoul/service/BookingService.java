package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.BookingDto;
import com.nimscreation.projects.StaySoul.dto.BookingRequest;
import com.nimscreation.projects.StaySoul.dto.GuestDto;
import com.nimscreation.projects.StaySoul.dto.HotelReportDto;
import com.nimscreation.projects.StaySoul.entity.enums.BookingStatus;
import com.stripe.model.Event;

import java.util.List;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface BookingService {

    BookingDto initialiseBooking(BookingRequest bookingRequest);

    BookingDto addGuests(Long bookingId, List<Long> guestIdList);

    String initiatePayments(Long bookingId);

    void capturePayment(Event event);

    void cancelBooking(Long bookingId);

    BookingStatus getBookingStatus(Long bookingId);

    List<BookingDto> getAllBookingsByHotelId(Long hotelId);

    HotelReportDto getHotelReport(Long hotelId, LocalDate startDate, LocalDate endDate);

    List<BookingDto> getMyBookings();
}

