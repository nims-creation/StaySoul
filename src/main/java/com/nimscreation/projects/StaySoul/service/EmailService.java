package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.entity.Booking;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendBookingConfirmation(Booking booking) {
        try {
            log.info("Sending booking confirmation email to: {}", booking.getUser().getEmail());
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(booking.getUser().getEmail());
            helper.setSubject("Trip Confirmed: " + booking.getHotel().getName());

            String htmlContent = String.format(
                "<div style='font-family: sans-serif; color: #484848; max-width: 600px; margin: auto; border: 1px solid #ebebeb; border-radius: 12px; overflow: hidden;'>" +
                "  <div style='background-color: #FF385C; padding: 24px; text-align: center;'>" +
                "    <h1 style='color: white; margin: 0; font-size: 24px;'>Pack your bags!</h1>" +
                "  </div>" +
                "  <div style='padding: 32px;'>" +
                "    <h2 style='margin-top: 0;'>Your reservation is confirmed.</h2>" +
                "    <p>Hi %s, your stay at <strong>%s</strong> is all set.</p>" +
                "    <div style='background-color: #f7f7f7; padding: 20px; border-radius: 8px; margin: 24px 0;'>" +
                "      <p style='margin: 0;'><strong>Check-in:</strong> %s</p>" +
                "      <p style='margin: 8px 0;'><strong>Check-out:</strong> %s</p>" +
                "      <p style='margin: 0;'><strong>Room:</strong> %s</p>" +
                "    </div>" +
                "    <p>Total Paid: <strong>$%s</strong></p>" +
                "    <hr style='border: none; border-top: 1px solid #ebebeb; margin: 32px 0;' />" +
                "    <p style='font-size: 14px; color: #717171;'>Manage your trip or find directions in your StaySoul dashboard.</p>" +
                "  </div>" +
                "</div>",
                booking.getUser().getName(),
                booking.getHotel().getName(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getRoom().getType(),
                booking.getAmount()
            );

            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Email sent successfully!");
        } catch (MessagingException e) {
            log.error("Failed to send email to {}", booking.getUser().getEmail(), e);
        }
    }

    @Async
    public void sendCancellationNotice(Booking booking) {
        try {
            log.info("Sending cancellation notice to: {}", booking.getUser().getEmail());
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(booking.getUser().getEmail());
            helper.setSubject("Reservation Cancelled: " + booking.getHotel().getName());

            String htmlContent = String.format(
                "<div style='font-family: sans-serif; color: #484848; max-width: 600px; margin: auto; border: 1px solid #ebebeb; border-radius: 12px;'>" +
                "  <div style='padding: 32px;'>" +
                "    <h2>Your reservation has been cancelled.</h2>" +
                "    <p>The reservation at <strong>%s</strong> has been successfully cancelled and your refund is being processed.</p>" +
                "    <p>Amount to be refunded: <strong>$%s</strong></p>" +
                "    <p style='margin-top: 32px; font-size: 14px; color: #717171;'>We hope to see you again soon!</p>" +
                "  </div>" +
                "</div>",
                booking.getHotel().getName(),
                booking.getAmount()
            );

            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("Failed to send cancellation email", e);
        }
    }
}
