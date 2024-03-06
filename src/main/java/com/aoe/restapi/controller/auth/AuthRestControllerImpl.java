package com.aoe.restapi.controller.auth;

import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.auth.AuthService;
import com.aoe.restapi.utility.Status.OperationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthRestControllerImpl implements AuthRestController {

    AuthService authService;

    @Autowired
    public AuthRestControllerImpl(AuthService authService) {
        this.authService = authService;
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<HashMap<String, Object>> login(@RequestBody(required = false) User user) {
        String email = user.getEmail();
        String password = user.getPassword();

        // perform operation and return
        OperationStatus operationStatus = authService.findUserByEmail(email);

        System.out.println(operationStatus);
        return operationStatus.getResponseEntity();
    }
}