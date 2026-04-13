package com.nimscreation.projects.StaySoul.dto;

import com.nimscreation.projects.StaySoul.entity.HotelContactInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.Valid;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HotelDto {

    private Long id;
    
    @NotBlank(message = "Hotel name is required")
    private String name;
    
    @NotBlank(message = "City cannot be blank")
    private String city;
    private String description;
    private String[] photos;
    private String[] amenities;
    private Double lat;
    private Double lng;
    private HotelContactInfo contactInfo;
    private Boolean active;
    
    @Valid
    private List<RoomDto> rooms;
}
