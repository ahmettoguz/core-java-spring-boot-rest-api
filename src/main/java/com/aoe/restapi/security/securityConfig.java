package com.aoe.restapi.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class securityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeRequests()
                .anyRequest().permitAll();

//        http.csrf(csrf -> csrf.disable())
//                .authorizeRequests()
//                .dispatcherTypeMatchers(HttpMethod.GET).permitAll()
//                .anyRequest().authenticated()
//                .and().httpBasic(httpBasic -> {
//                });


        return http.build();
    }
}