package com.aoe.restapi.controller.auth;

import com.aoe.restapi.dto.JwtResponseDto;
import com.aoe.restapi.dto.LoginRequestDto;
import com.aoe.restapi.model.service.auth.AuthService;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import com.aoe.restapi.utility.auth.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthRestControllerImpl implements AuthRestController {

    private JwtUtil jwtUtil;
    AuthService authService;

    @Autowired
    public AuthRestControllerImpl(JwtUtil jwtUtil, AuthService authService) {
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }


//    @Override
//    @PostMapping("/login")
//    public ResponseEntity<HashMap<String, Object>> login(@RequestBody(required = false) User user) {
//        String email = user.getEmail();
//        String password = user.getPassword();
//
//        // perform operation and return
//        OperationStatus operationStatus = authService.findUserByEmail(email);
//
//        return operationStatus.getResponseEntity();
//    }

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, Object>> login(@RequestBody LoginRequestDto loginRequestDto) {
        boolean isAuthenticated = true;
        if (isAuthenticated) {
            // If the user is authenticated, generate a JWT token.
            String token = jwtUtil.generateToken(loginRequestDto.getId());
            return new OperationStatusSuccess<String>(token).getResponseEntity();
        } else {
            return new OperationStatusError(HttpStatus.UNAUTHORIZED).getResponseEntity();
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<HashMap<String, Object>> validateToken(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7); // Remove "Bearer " from the token
        boolean isValid = jwtUtil.validateToken(jwt);

        if (isValid) {
            return new OperationStatusSuccess<String>("Token is valid").getResponseEntity();
        } else {
            return new OperationStatusError(HttpStatus.UNAUTHORIZED).getResponseEntity();
        }
    }
}