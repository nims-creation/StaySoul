package com.nimscreation.projects.StaySoul.dto;

import com.nimscreation.projects.StaySoul.entity.enums.Gender;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ProfileUpdateRequestDto {
    private String name;
    private LocalDate dateOfBirth;
    private Gender gender;
}
