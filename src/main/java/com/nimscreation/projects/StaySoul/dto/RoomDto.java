package com.nimscreation.projects.StaySoul.dto;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RoomDto {
    private long id;
    private String type;
    private BigDecimal basePrice;
    private String[] photos;
    private String[] amenities;
    private Integer totalCount;
    private Integer capacity;
}
