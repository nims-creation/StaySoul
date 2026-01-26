package com.nimscreation.projects.StaySoul.service;

import com.nimscreation.projects.StaySoul.entity.Room;

public interface InventoryService {

    void initializeRoomForAYear(Room room);

    void deleteFutureInventories(Room room);

}
