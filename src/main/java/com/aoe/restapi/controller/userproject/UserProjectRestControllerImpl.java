package com.aoe.restapi.controller.userproject;

import com.aoe.restapi.controller.base.BaseRestControllerImpl;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.base.BaseService;
import com.aoe.restapi.model.service.relation.userproject.UserProjectService;
import com.aoe.restapi.utility.Status.OperationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
public class UserProjectRestControllerImpl<T extends User> extends BaseRestControllerImpl<T> implements UserProjectRestController {
    BaseService<T> service;
    UserProjectService userProjectService;

    @Autowired
    public UserProjectRestControllerImpl(@Qualifier("userServiceImpl") BaseService<T> service,
                                         UserProjectService userProjectService) {
        super(service);
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
