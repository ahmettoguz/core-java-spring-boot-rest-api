package com.aoe.restapi.exception.exception;


public class AuthenticationException extends RuntimeException {
    public AuthenticationException() {
        super("not authenticated");
    }
}