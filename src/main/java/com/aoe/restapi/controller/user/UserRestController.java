package com.aoe.restapi.controller.user;

import com.aoe.restapi.model.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface UserRestController {

    public ResponseEntity<HashMap<String, Object>> updateUserPassword(int userId, HashMap<String, String> requestBody);


    public ResponseEntity<HashMap<String, Object>> searchUsersByFirstName(HashMap<String, String> requestBody);
}
