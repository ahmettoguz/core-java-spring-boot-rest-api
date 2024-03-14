package com.aoe.restapi.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class securityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeRequests()
                .dispatcherTypeMatchers(HttpMethod.GET).permitAll()
                .anyRequest().authenticated()
                .and().httpBasic(httpBasic -> {
                });

        return http.build();
    }

    @Bean
    public UserDetailsService users() {
        UserDetails admin = User.builder()
                .username("ahmet@hotmail.com")
                .password("{noop}1234")
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }
}