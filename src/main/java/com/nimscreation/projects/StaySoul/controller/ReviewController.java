package com.nimscreation.projects.StaySoul.controller;

import com.nimscreation.projects.StaySoul.dto.ReviewDto;
import com.nimscreation.projects.StaySoul.entity.Hotel;
import com.nimscreation.projects.StaySoul.entity.Review;
import com.nimscreation.projects.StaySoul.entity.User;
import com.nimscreation.projects.StaySoul.entity.enums.BookingStatus;
import com.nimscreation.projects.StaySoul.repository.BookingRepository;
import com.nimscreation.projects.StaySoul.repository.HotelRepository;
import com.nimscreation.projects.StaySoul.repository.ReviewRepository;
import com.nimscreation.projects.StaySoul.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/hotels")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<ReviewDto>> getHotelReviews(@PathVariable Long id) {
        List<ReviewDto> reviews = reviewRepository.findByHotelIdOrderByCreatedAtDesc(id)
                .stream()
                .map(r -> ReviewDto.builder()
                        .id(r.getId())
                        .rating(r.getRating())
                        .comment(r.getComment())
                        .photos(r.getPhotos())
                        .userName(r.getUser().getName())
                        .createdAt(r.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<?> addReview(
            @PathVariable Long id,
            @RequestBody ReviewDto reviewDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        // Anti-Spam Check: Verify at least one confirmed/completed booking
        boolean hasStayed = bookingRepository.findByUserEmail(user.getEmail())
                .stream()
                .anyMatch(b -> b.getHotel().getId().equals(id) && 
                         (b.getBookingStatus() == BookingStatus.CONFIRMED || b.getBookingStatus() == BookingStatus.RESERVED));
        
        if (!hasStayed) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only guests who have booked this stay can leave a review.");
        }

        Review review = new Review();
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());
        review.setPhotos(reviewDto.getPhotos());
        review.setUser(user);
        review.setHotel(hotel);

        Review saved = reviewRepository.save(review);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(ReviewDto.builder()
                .id(saved.getId())
                .rating(saved.getRating())
                .comment(saved.getComment())
                .photos(saved.getPhotos())
                .userName(user.getName())
                .createdAt(saved.getCreatedAt())
                .build());
    }
}
