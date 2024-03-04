package com.aoe.restapi.controller.relational.userproject;

import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.relational.userproject.UserProjectService;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
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
        ResponseEntity<HashMap<String, Object>> responseEntity = operationStatus.getResponseEntity();

        // change data field if operation is success
        if (operationStatus instanceof OperationStatusSuccess<?>)
            if (responseEntity.hasBody()) {
                responseEntity.getBody().put("data", "relational operation success");
            }

        return responseEntity;
    }

    @Override
    @DeleteMapping("/users/{userId}/projects/{projectId}")
    public ResponseEntity<HashMap<String, Object>> removeUserFromProject(@PathVariable("userId") int userId,
                                                                         @PathVariable("projectId") int projectId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserProjectService) userProjectService).manageUserInProject(false, userId, projectId);
        ResponseEntity<HashMap<String, Object>> responseEntity = operationStatus.getResponseEntity();

        // change data field if operation is success
        if (operationStatus instanceof OperationStatusSuccess<?>)
            if (responseEntity.hasBody()) {
                responseEntity.getBody().put("data", "relational operation success");
            }

        return responseEntity;
    }

}
