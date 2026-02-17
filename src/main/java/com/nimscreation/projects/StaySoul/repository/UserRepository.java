package com.nimscreation.projects.StaySoul.repository;

import com.nimscreation.projects.StaySoul.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
