package com.aoe.restapi.exception.exception;

public class InvalidInputException extends RuntimeException {
    public InvalidInputException() {
        super("Input is not valid");
    }
}
