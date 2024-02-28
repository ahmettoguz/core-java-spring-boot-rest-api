package com.aoe.restapi.controller.relational.userproject;

import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.relational.userproject.UserProjectService;
import com.aoe.restapi.utility.Status.OperationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
public class UserProjectRestControllerImpl<T extends User> implements UserProjectRestController {
    UserProjectService userProjectService;

    @Autowired
    public UserProjectRestControllerImpl(UserProjectService userProjectService) {
        this.userProjectService = userProjectService;
    }

    @Override
    @PostMapping("/users/{userId}/projects/{projectId}")
    public ResponseEntity<HashMap<String, Object>> addUserToProject(@PathVariable("userId") int userId,
                                                                    @PathVariable("projectId") int projectId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserProjectService) userProjectService).manageUserInProject(true, userId, projectId);
        return operationStatus.getResponseEntity();
    }

    @Override
    @DeleteMapping("/users/{userId}/projects/{projectId}")
    public ResponseEntity<HashMap<String, Object>> removeUserFromProject(@PathVariable("userId") int userId,
                                                                         @PathVariable("projectId") int projectId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserProjectService) userProjectService).manageUserInProject(false, userId, projectId);
        return operationStatus.getResponseEntity();
    }


    @Override
    @PostMapping("projects/{projectId}/users/{userId}")
    public ResponseEntity<HashMap<String, Object>> addProjectToUser(@PathVariable("projectId") int projectId,
                                                                    @PathVariable("userId") int userId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserProjectService) userProjectService).manageUserInProject(true, userId, projectId);
        return operationStatus.getResponseEntity();
    }

    @Override
    @DeleteMapping("projects/{projectId}/users/{userId}")
    public ResponseEntity<HashMap<String, Object>> removeProjectFromUser(@PathVariable("projectId") int projectId,
                                                                         @PathVariable("userId") int userId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserProjectService) userProjectService).manageUserInProject(false, userId, projectId);
        return operationStatus.getResponseEntity();
    }

}
