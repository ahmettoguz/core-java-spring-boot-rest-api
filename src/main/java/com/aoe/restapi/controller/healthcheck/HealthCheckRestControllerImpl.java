package com.aoe.restapi.controller.healthcheck;

import com.aoe.restapi.utility.status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/health-check")
public class HealthCheckRestControllerImpl implements HealthCheckRestController {
    @Value("${app.var.appName}")
    private String appName;
    @Value("${app.var.appDescription}")
    private String appDescription;

    @Override
    @GetMapping
    public ResponseEntity<HashMap<String, Object>> healthCheck() {
        return new OperationStatusSuccess<Object>("server is up").getResponseEntity();
    }

    @Override
    @GetMapping("/info")
    public ResponseEntity<HashMap<String, Object>> info() {
        // create data object
        HashMap<String, String> map = new HashMap<>();
        map.put("name", appName);
        map.put("description", appDescription);

        return new OperationStatusSuccess<HashMap<String, String>>(map).getResponseEntity();
    }
}
