package com.nimscreation.projects.StaySoul.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@staysoul.com}")
    private String fromEmail;

    @Async
    public void sendBookingConfirmation(String toEmail, String guestName, String hotelName,
                                         LocalDate checkIn, LocalDate checkOut,
                                         BigDecimal amount, Long bookingId) {
        String subject = "🏨 Booking Confirmed — StaySoul #" + bookingId;
        String htmlContent = buildBookingConfirmationHtml(guestName, hotelName, checkIn, checkOut, amount, bookingId);
        sendHtmlEmail(toEmail, subject, htmlContent);
    }

    @Async
    public void sendBookingCancellation(String toEmail, String guestName, String hotelName,
                                         Long bookingId) {
        String subject = "❌ Booking Cancelled — StaySoul #" + bookingId;
        String htmlContent = buildBookingCancellationHtml(guestName, hotelName, bookingId);
        sendHtmlEmail(toEmail, subject, htmlContent);
    }

    @Async
    public void sendWelcomeEmail(String toEmail, String name) {
        String subject = "🎉 Welcome to StaySoul!";
        String htmlContent = buildWelcomeHtml(name);
        sendHtmlEmail(toEmail, subject, htmlContent);
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }

    private String buildBookingConfirmationHtml(String guestName, String hotelName,
                                                 LocalDate checkIn, LocalDate checkOut,
                                                 BigDecimal amount, Long bookingId) {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd MMM yyyy");
        return """
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;
                            background: linear-gradient(135deg, #0a0e27, #1a1f3a); color: #f0ebe3;
                            border-radius: 16px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #d4a574, #e8c89e); padding: 32px; text-align: center;">
                        <h1 style="margin: 0; color: #0a0e27; font-size: 28px;">✅ Booking Confirmed!</h1>
                    </div>
                    <div style="padding: 32px;">
                        <p style="font-size: 18px;">Hello <strong>%s</strong>,</p>
                        <p>Your booking has been confirmed. Here are your details:</p>
                        <div style="background: rgba(255,255,255,0.05); border-radius: 12px;
                                    padding: 24px; margin: 24px 0; border: 1px solid rgba(212,165,116,0.3);">
                            <p><strong>🏨 Hotel:</strong> %s</p>
                            <p><strong>📅 Check-in:</strong> %s</p>
                            <p><strong>📅 Check-out:</strong> %s</p>
                            <p><strong>💰 Total Amount:</strong> ₹%s</p>
                            <p><strong>🔖 Booking ID:</strong> #%d</p>
                        </div>
                        <p style="color: #d4a574;">Thank you for choosing StaySoul. Have a wonderful stay! 🌟</p>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 16px; text-align: center; font-size: 12px; color: #888;">
                        © 2026 StaySoul — Made with ❤️ by Nitesh Mishra
                    </div>
                </div>
                """.formatted(guestName, hotelName, checkIn.format(fmt), checkOut.format(fmt), amount, bookingId);
    }

    private String buildBookingCancellationHtml(String guestName, String hotelName, Long bookingId) {
        return """
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;
                            background: linear-gradient(135deg, #0a0e27, #1a1f3a); color: #f0ebe3;
                            border-radius: 16px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); padding: 32px; text-align: center;">
                        <h1 style="margin: 0; color: #fff; font-size: 28px;">❌ Booking Cancelled</h1>
                    </div>
                    <div style="padding: 32px;">
                        <p style="font-size: 18px;">Hello <strong>%s</strong>,</p>
                        <p>Your booking at <strong>%s</strong> (ID: #%d) has been cancelled.</p>
                        <p>If this was a mistake, please make a new booking through StaySoul.</p>
                        <p style="color: #d4a574;">We hope to see you again soon! 🌟</p>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 16px; text-align: center; font-size: 12px; color: #888;">
                        © 2026 StaySoul — Made with ❤️ by Nitesh Mishra
                    </div>
                </div>
                """.formatted(guestName, hotelName, bookingId);
    }

    private String buildWelcomeHtml(String name) {
        return """
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;
                            background: linear-gradient(135deg, #0a0e27, #1a1f3a); color: #f0ebe3;
                            border-radius: 16px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #d4a574, #e8c89e); padding: 32px; text-align: center;">
                        <h1 style="margin: 0; color: #0a0e27; font-size: 28px;">🎉 Welcome to StaySoul!</h1>
                    </div>
                    <div style="padding: 32px;">
                        <p style="font-size: 18px;">Hello <strong>%s</strong>,</p>
                        <p>Welcome to StaySoul — your gateway to extraordinary stays!</p>
                        <p>Explore hotels, discover unique rooms with dynamic pricing, and book your next unforgettable experience.</p>
                        <div style="text-align: center; margin: 32px 0;">
                            <a href="http://localhost:5173/search" style="background: linear-gradient(135deg, #d4a574, #e8c89e);
                                color: #0a0e27; padding: 14px 32px; border-radius: 8px; text-decoration: none;
                                font-weight: bold; font-size: 16px;">Explore Hotels →</a>
                        </div>
                        <p style="color: #d4a574;">Happy travels! 🌍</p>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 16px; text-align: center; font-size: 12px; color: #888;">
                        © 2026 StaySoul — Made with ❤️ by Nitesh Mishra
                    </div>
                </div>
                """.formatted(name);
    }
}
