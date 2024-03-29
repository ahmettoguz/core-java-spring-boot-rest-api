package com.aoe.restapi;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RestApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestApiApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return runner -> {
            System.out.println("🚀🚀🚀");
        };
    }
}
