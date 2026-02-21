package com.nimscreation.projects.StaySoul.dto;

import com.nimscreation.projects.StaySoul.entity.enums.Gender;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GuestDto {
    private Long id;
    private String name;
    private Gender gender;
    private LocalDate dateOfBirth;
}
