package com.nimscreation.projects.StaySoul.controller;

import com.nimscreation.projects.StaySoul.dto.*;
import com.nimscreation.projects.StaySoul.service.HotelService;
import com.nimscreation.projects.StaySoul.service.InventoryService;
import com.nimscreation.projects.StaySoul.service.PricingUpdateService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.concurrent.atomic.AtomicBoolean;

@RestController
@RequestMapping("/hotels")
@RequiredArgsConstructor
public class HotelBrowseController {

    private final InventoryService inventoryService;
    private final HotelService hotelService;
    private final PricingUpdateService pricingUpdateService;
    private final AtomicBoolean isUpdating = new AtomicBoolean(false);

    @GetMapping("/force-update-prices")
    public ResponseEntity<String> forceUpdate() {
        if (isUpdating.compareAndSet(false, true)) {
            new Thread(() -> {
                try {
                    pricingUpdateService.updatePrices();
                } finally {
                    isUpdating.set(false);
                }
            }).start();
            return ResponseEntity.ok("Pricing updates started in the background. Please wait 1-2 minutes for properties to appear.");
        } else {
            return ResponseEntity.status(429).body("Update is already running in the background. Please wait.");
        }
    }

    @PostMapping("/search")
    @Operation(summary = "Search hotels", tags = {"Browse Hotels"})
    public ResponseEntity<Page<HotelPriceResponseDto>> searchHotels(@RequestBody HotelSearchRequest hotelSearchRequest) {

        var page = inventoryService.searchHotels(hotelSearchRequest);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{hotelId}/info")
    @Operation(summary = "Get a hotel info by hotelId", tags = {"Browse Hotels"})
    public ResponseEntity<HotelInfoDto> getHotelInfo(@PathVariable Long hotelId, 
                                                   @RequestParam(required = false) LocalDate startDate,
                                                   @RequestParam(required = false) LocalDate endDate) {
        return ResponseEntity.ok(hotelService.getHotelInfoById(hotelId, startDate, endDate));
    }

}
