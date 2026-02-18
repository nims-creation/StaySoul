package com.nimscreation.projects.StaySoul.repository;

import com.nimscreation.projects.StaySoul.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

}
