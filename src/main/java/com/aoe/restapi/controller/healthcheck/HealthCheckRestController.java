package com.aoe.restapi.controller.healthcheck;

import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface HealthCheckRestController {
    public ResponseEntity<HashMap<String, Object>> healthCheck();

    public ResponseEntity<HashMap<String, Object>> info();
}
