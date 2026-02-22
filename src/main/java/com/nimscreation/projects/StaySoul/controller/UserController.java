package com.nimscreation.projects.StaySoul.controller;

import com.nimscreation.projects.StaySoul.dto.BookingDto;
import com.nimscreation.projects.StaySoul.dto.ProfileUpdateRequestDto;
import com.nimscreation.projects.StaySoul.dto.UserDto;
import com.nimscreation.projects.StaySoul.service.BookingService;
import com.nimscreation.projects.StaySoul.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final BookingService bookingService;


    @PatchMapping("/profile")
    public ResponseEntity<Void> updateProfile(@RequestBody ProfileUpdateRequestDto profileUpdateRequestDto) {
        userService.updateProfile(profileUpdateRequestDto);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/myBookings")
    public ResponseEntity<List<BookingDto>> getMyBookings() {
        return ResponseEntity.ok(bookingService.getMyBookings());
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getMyProfile() {
        return ResponseEntity.ok(userService.getMyProfile());
    }

    
}
