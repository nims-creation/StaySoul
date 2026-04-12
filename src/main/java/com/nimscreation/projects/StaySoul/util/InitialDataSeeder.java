package com.nimscreation.projects.StaySoul.util;

import com.nimscreation.projects.StaySoul.entity.User;
import com.nimscreation.projects.StaySoul.entity.enums.Roles;
import com.nimscreation.projects.StaySoul.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class InitialDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        
        // Ensure that the 'deleted' column exists in hotel and room tables
        // This is a safety mechanism in case JPA ddl-auto=update misses adding it
        try {
            jdbcTemplate.execute("ALTER TABLE hotel ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false");
            jdbcTemplate.execute("ALTER TABLE room ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false");
            System.out.println("Successfully ensured 'deleted' column exists on 'hotel' and 'room' tables.");
        } catch (Exception e) {
            System.err.println("Could not add 'deleted' columns: " + e.getMessage());
        }

        if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("password"));
            admin.setName("Admin User");
            admin.setRoles(Set.of(Roles.HOTEL_MANAGER));
            userRepository.save(admin);
            System.out.println("Seeded admin user: admin@gmail.com / password");
        }
        if (userRepository.findByEmail("admin2@gmail.com").isEmpty()) {
            User admin2 = new User();
            admin2.setEmail("admin2@gmail.com");
            admin2.setPassword(passwordEncoder.encode("password"));
            admin2.setName("Admin2 User");
            admin2.setRoles(Set.of(Roles.HOTEL_MANAGER));
            userRepository.save(admin2);
            System.out.println("Seeded admin2 user: admin2@gmail.com / password");
        }
    }
}
