package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.ProfileUpdateRequestDto;
import com.nimscreation.projects.StaySoul.entity.User;

public interface UserService {

    User getUserById(Long id);

    void updateProfile(ProfileUpdateRequestDto profileUpdateRequestDto);
}
