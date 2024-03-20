package com.aoe.restapi.exception.handler;


import com.aoe.restapi.exception.exception.AuthorizationException;
import com.aoe.restapi.exception.exception.AuthorizationHeaderException;
import com.aoe.restapi.exception.exception.JwtNotValidException;
import com.aoe.restapi.utility.Status.OperationStatusError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(JwtNotValidException.class)
    public ResponseEntity<HashMap<String, Object>> handleJwtNotValidException(JwtNotValidException ex) {
        return new OperationStatusError(HttpStatus.UNAUTHORIZED, ex.getMessage()).getResponseEntity();
    }

    @ExceptionHandler(AuthorizationHeaderException.class)
    public ResponseEntity<HashMap<String, Object>> handleAuthorizationHeaderException(AuthorizationHeaderException ex) {
        return new OperationStatusError(HttpStatus.BAD_REQUEST, ex.getMessage()).getResponseEntity();
    }

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<HashMap<String, Object>> handleAuthorizationException(AuthorizationException ex) {
        return new OperationStatusError(HttpStatus.UNAUTHORIZED, ex.getMessage()).getResponseEntity();
    }
}