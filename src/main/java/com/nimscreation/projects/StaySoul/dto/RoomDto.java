package com.nimscreation.projects.StaySoul.dto;
import lombok.Data;

import java.math.BigDecimal;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class RoomDto {
    private Long id;
    
    @NotBlank(message = "Room type/title is required")
    private String type;
    
    @NotNull(message = "Price is required")
    @Min(value = 1, message = "Price must be greater than 0")
    private BigDecimal basePrice;
    
    private String[] photos;
    private String[] amenities;
    
    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Room quantity must be at least 1")
    private Integer totalCount;
    
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;
}
