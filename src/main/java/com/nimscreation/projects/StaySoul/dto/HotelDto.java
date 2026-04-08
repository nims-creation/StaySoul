package com.nimscreation.projects.StaySoul.dto;

import com.nimscreation.projects.StaySoul.entity.HotelContactInfo;
import lombok.Data;

@Data
public class HotelDto {

    private Long id;
    private String name;
    private String city;
    private String[] photos;
    private String[] amenities;
    private Double lat;
    private Double lng;
    private HotelContactInfo contactInfo;
    private Boolean active;
}
