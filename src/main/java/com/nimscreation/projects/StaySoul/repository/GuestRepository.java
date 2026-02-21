package com.nimscreation.projects.StaySoul.repository;

import com.nimscreation.projects.StaySoul.entity.Guest;
import com.nimscreation.projects.StaySoul.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    List<Guest> findByUser(User user);
}