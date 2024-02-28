package com.aoe.restapi.controller.user;

import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface UserRestController {
    public ResponseEntity<HashMap<String, Object>> addUserToProject(int userId, int projectId);

    public ResponseEntity<HashMap<String, Object>> removeUserFromProject(int userId, int projectId);
}
