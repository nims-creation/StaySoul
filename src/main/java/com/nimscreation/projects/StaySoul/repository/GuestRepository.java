package com.nimscreation.projects.StaySoul.repository;

import com.nimscreation.projects.StaySoul.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {
}