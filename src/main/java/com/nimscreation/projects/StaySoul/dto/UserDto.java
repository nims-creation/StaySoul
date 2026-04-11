package com.nimscreation.projects.StaySoul.dto;

import com.nimscreation.projects.StaySoul.entity.enums.Gender;
import com.nimscreation.projects.StaySoul.entity.enums.Roles;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private Gender gender;
    private LocalDate dateOfBirth;
    private Set<Roles> roles;
}
