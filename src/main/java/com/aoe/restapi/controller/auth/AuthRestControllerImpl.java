package com.aoe.restapi.controller.auth;

import com.aoe.restapi.dto.LoginRequestDto;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.user.UserService;
import com.aoe.restapi.utility.http.HttpUtil;
import com.aoe.restapi.utility.status.OperationStatus;
import com.aoe.restapi.utility.status.OperationStatusError;
import com.aoe.restapi.utility.status.OperationStatusSuccess;
import com.aoe.restapi.utility.auth.AuthUtil;
import com.aoe.restapi.utility.auth.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

        // read operation
        OperationStatus operationStatus = userService.findByEmail(email);

        // if cannot find user with that email return
        if (operationStatus instanceof OperationStatusError)
            return new OperationStatusError(HttpStatus.UNAUTHORIZED).getResponseEntity();
        if (((OperationStatusSuccess) operationStatus).getData() == null)
            return new OperationStatusError(HttpStatus.UNAUTHORIZED).getResponseEntity();

        // get user
        User user = (User) ((OperationStatusSuccess) operationStatus).getData();

        // check password
        if (!AuthUtil.compareText(user.getPassword(), password))
            return new OperationStatusError(HttpStatus.UNAUTHORIZED).getResponseEntity();

        // generate jwt token
        int userId = user.getId();
        String token = "Bearer " + jwtUtil.generateToken(userId);

        // add token to header
        HashMap<String, String> headers = new HashMap<>();
        headers.put("Authorization", token);

        // return response
        return new OperationStatusSuccess<String>(token, headers).getResponseEntity();
    }


    @PostMapping("/validate")
    public ResponseEntity<HashMap<String, Object>> validateToken(@RequestHeader("Authorization") String token) {
        // validation operation is handled with aop

        // Extract iat, exp, and body from the claims
        Claims claims = jwtUtil.parseToken(HttpUtil.removePrecedingBearer(token));
        Date issuedAt = claims.getIssuedAt();
        Date expiration = claims.getExpiration();
        String body = claims.getSubject();

        // Prepare the response
        HashMap<String, Object> response = new HashMap<>();
        response.put("iat", issuedAt);
        response.put("exp", expiration);
        response.put("body", body);

        return new OperationStatusSuccess<HashMap<String, Object>>(response).getResponseEntity();
    }
}