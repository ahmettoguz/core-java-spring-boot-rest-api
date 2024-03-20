package com.aoe.restapi.exception.exception;

public class JwtNotValidException extends RuntimeException {
    public JwtNotValidException() {
        super("jwt is not valid!");
    }
}