package com.nimscreation.projects.StaySoul.Strategy;

import com.nimscreation.projects.StaySoul.entity.Inventory;

import java.math.BigDecimal;

public interface PricingStrategy {

    BigDecimal calculatePrice(Inventory inventory);




}
