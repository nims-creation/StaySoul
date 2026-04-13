package com.nimscreation.projects.StaySoul.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Prevents the Render free-tier server and its PostgreSQL database from
 * sleeping by periodically executing a lightweight query.
 *
 * Render free instances spin down after 15 minutes of inactivity.
 * This scheduler pings the DB every 10 minutes so the connection pool
 * stays warm and the server never fully sleeps mid-session.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class RenderKeepAliveScheduler {

    private final JdbcTemplate jdbcTemplate;

    // Starts 60s after boot (DB is guaranteed up by then), then every 10 minutes
    @Scheduled(initialDelay = 60_000, fixedDelay = 600_000)
    public void keepAlive() {
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            log.debug("Keep-alive ping successful.");
        } catch (Exception e) {
            log.warn("Keep-alive ping failed (server may be restarting): {}", e.getMessage());
        }
    }
}
