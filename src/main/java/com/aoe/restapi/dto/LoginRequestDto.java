package com.aoe.restapi.dto;

import com.aoe.restapi.exception.exception.InvalidInputException;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginRequestDto {
    private String email;
    private String password;

    public void validateInput() {
        if (email == null || password == null)
            throw new InvalidInputException();
    }
}
