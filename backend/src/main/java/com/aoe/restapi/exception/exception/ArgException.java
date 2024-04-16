package com.aoe.restapi.exception.exception;

public class ArgException extends RuntimeException {
    public ArgException() {
        super("argument is not valid");
    }
}