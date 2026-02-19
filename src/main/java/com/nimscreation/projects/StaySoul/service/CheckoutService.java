package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.entity.Booking;

public interface CheckoutService {

    String getCheckoutSession(Booking booking, String successUrl, String failureUrl);

}

