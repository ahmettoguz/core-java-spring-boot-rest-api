package com.aoe.restapi.controller.auth;

import com.aoe.restapi.model.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface AuthRestController {
    public ResponseEntity<HashMap<String, Object>> login(User user);
}
