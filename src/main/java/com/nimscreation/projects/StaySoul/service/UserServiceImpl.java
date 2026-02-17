package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.entity.User;
import com.nimscreation.projects.StaySoul.exception.ResourceNotFoundException;
import com.nimscreation.projects.StaySoul.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("user not found with id:"+id));
    }
}
