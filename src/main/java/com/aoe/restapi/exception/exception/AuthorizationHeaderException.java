package com.aoe.restapi.exception.exception;

public class AuthorizationHeaderException extends RuntimeException {
    public AuthorizationHeaderException() {
        super("authorization header is not configured for jwt");
    }
}