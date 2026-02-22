package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.dto.ProfileUpdateRequestDto;
import com.nimscreation.projects.StaySoul.dto.UserDto;
import com.nimscreation.projects.StaySoul.entity.User;
import org.jspecify.annotations.Nullable;

public interface UserService {

    User getUserById(Long id);

    void updateProfile(ProfileUpdateRequestDto profileUpdateRequestDto);

     UserDto getMyProfile();
}
