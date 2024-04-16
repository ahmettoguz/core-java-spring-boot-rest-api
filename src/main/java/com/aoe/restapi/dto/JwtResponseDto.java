package com.aoe.restapi.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JwtResponseDto {
    private String token;
    public void setToken(String token) {
        this.token = token;
    }
}
