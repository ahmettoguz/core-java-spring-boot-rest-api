package com.aoe.restapi.exception.exception;


public class AuthorizationException extends RuntimeException {
    public AuthorizationException() {
        super("not authorized");
    }
}