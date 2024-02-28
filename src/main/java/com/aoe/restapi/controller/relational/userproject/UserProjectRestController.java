package com.aoe.restapi.controller.relational.userproject;

import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface UserProjectRestController {
    public ResponseEntity<HashMap<String, Object>> addUserToProject(int userId, int projectId);

    public ResponseEntity<HashMap<String, Object>> removeUserFromProject(int userId, int projectId);

    public ResponseEntity<HashMap<String, Object>> addProjectToUser(int projectId, int userId);

    public ResponseEntity<HashMap<String, Object>> removeProjectFromUser(int projectId, int userId);
}
