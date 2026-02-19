package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.entity.Booking;

public interface CheckOutService {

    String getCheckOutService(Booking booking, String successUrl, String failureUrl);
}
