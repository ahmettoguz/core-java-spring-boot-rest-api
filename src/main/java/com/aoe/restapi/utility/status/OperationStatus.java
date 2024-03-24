package com.aoe.restapi.utility.status;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

// Define an abstract class Response
public abstract class OperationStatus {
    private HttpStatus status;
    private Boolean state;

    // Constructor
    public OperationStatus(HttpStatus status, Boolean state) {
        this.status = status;
        this.state = state;
    }

    // methods
    public abstract ResponseEntity<HashMap<String, Object>> getResponseEntity();

    // getter setter
    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "OperationStatus{" +
                "status=" + status +
                ", state=" + state +
                '}';
    }
}