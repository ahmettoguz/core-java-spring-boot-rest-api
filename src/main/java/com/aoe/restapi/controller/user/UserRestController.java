package com.aoe.restapi.controller.user;

import com.aoe.restapi.model.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface UserRestController {

    // update user password
    public ResponseEntity<HashMap<String, Object>> updateUserPassword(int userId, HashMap<String, String> requestBody);

    // search for users by exact first name
    public ResponseEntity<HashMap<String, Object>> searchUsersByExactFirstName(HashMap<String, String> requestBody);

    // search for uses by partial first name
    public ResponseEntity<HashMap<String, Object>> searchUsersByPartialFirstName(HashMap<String, String> requestBody);
}
