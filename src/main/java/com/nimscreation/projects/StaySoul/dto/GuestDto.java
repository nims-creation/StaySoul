package com.nimscreation.projects.StaySoul.dto;

import com.nimscreation.projects.StaySoul.entity.User;
import com.nimscreation.projects.StaySoul.entity.enums.Gender;
import lombok.Data;

@Data
public class GuestDto {

    private Long id;
    private User user;
    private String name;
    private Gender gender;
    private Integer age;
}
