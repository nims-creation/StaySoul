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

@RestController
@RequestMapping("/hotels")
@RequiredArgsConstructor
public class HotelBrowseController {

    private final InventoryService inventoryService;
    private final HotelService hotelService;
    private final PricingUpdateService pricingUpdateService;

    @GetMapping("/force-update-prices")
    public ResponseEntity<String> forceUpdate() {
        pricingUpdateService.updatePrices();
        return ResponseEntity.ok("Successfully forced pricing updates!");
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
