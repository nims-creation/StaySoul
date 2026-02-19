package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.entity.Booking;
import com.nimscreation.projects.StaySoul.entity.User;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CheckOutServiceImpl implements CheckOutService{

    private final
    @Override
    public String getCheckOutService(Booking booking, String successUrl, String failureUrl) throws StripeException {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try{
            CustomerCreateParams customerParams = CustomerCreateParams.builder()
                    .setName(user.getName())
                    .setEmail(user.getEmail())
                    .build();

            Customer customer = Customer.create(customerParams);


            SessionCreateParams sessionParams = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setBillingAddressCollection(SessionCreateParams.BillingAddressCollection.REQUIRED)
                    .setCustomer(customer.getId())
                    .setSuccessUrl(successUrl)
                    .setCancelUrl(failureUrl)
                    .build();

            Session session = Session.create(sessionParams);

        }catch (StripeException e){
            throw new RuntimeException(e);

        }

        return "";
    }
}
