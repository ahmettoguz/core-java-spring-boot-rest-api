package com.aoe.restapi.controller.project;

import com.aoe.restapi.model.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;

public interface ProjectRestController {
    // todo move that
    public ResponseEntity<HashMap<String, Object>> addUserToProject(int projectId, int userId);

    public ResponseEntity<HashMap<String, Object>> removeUserFromProject(int projectId, int userId);
}
