package com.aoe.restapi.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootRestController {
    @Value("${app.var.appName}")
    private String appName;
    @Value("${app.var.appDescription}")
    private String appDescription;

    @GetMapping("/health-check")
    public String healthCheck() {
        return "App Name: " + appName + "\n App Description: " + appDescription;
    }
}
