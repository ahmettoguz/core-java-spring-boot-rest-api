package com.aoe.restapi.controller.auth;

import com.aoe.restapi.dto.LoginRequestDto;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.user.UserService;
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

    private UserService<User> userService;

    @Autowired
    public AuthRestControllerImpl(JwtUtil jwtUtil, UserService<User> userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, Object>> login(@RequestBody LoginRequestDto loginRequestDto) {
        // get inputs
        String email = loginRequestDto.getEmail();
        String password = loginRequestDto.getPassword();

        // get user id
//        userService.
//        OperationStatus operationStatus = authService.findUserByEmail(email);

        boolean isAuthenticated = true;
        if (!isAuthenticated)
            return new OperationStatusError(HttpStatus.UNAUTHORIZED).getResponseEntity();

        // todo
        int userId = 1;
        String token = "Bearer " + jwtUtil.generateToken(userId);

        // add token to header
        HashMap<String, String> headers = new HashMap<>();
        headers.put("Authorization", token);

        // return response
        return new OperationStatusSuccess<String>(token, headers).getResponseEntity();
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