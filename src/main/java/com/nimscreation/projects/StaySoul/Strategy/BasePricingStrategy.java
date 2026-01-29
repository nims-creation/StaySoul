package com.nimscreation.projects.StaySoul.Strategy;

import com.nimscreation.projects.StaySoul.entity.Inventory;

import java.math.BigDecimal;

public class BasePricingStrategy implements PricingStrategy{

    @Override
    public BigDecimal calculatePrice(Inventory inventory) {
        return inventory.getRoom().getBasePrice();
    }
}
