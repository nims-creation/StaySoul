package com.nimscreation.projects.StaySoul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StaySoulApplication {

	public static void main(String[] args) {
		SpringApplication.run(StaySoulApplication.class, args);
	}

}
