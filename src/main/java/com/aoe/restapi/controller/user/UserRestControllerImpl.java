package com.aoe.restapi.controller.user;

import com.aoe.restapi.controller.base.BaseRestControllerImpl;
import com.aoe.restapi.controller.project.ProjectRestController;
import com.aoe.restapi.model.entity.Project;
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
@RequestMapping("/users")
public class UserRestControllerImpl<T extends User> extends BaseRestControllerImpl<T> implements ProjectRestController {
    BaseService<T> service;
    UserProjectService userProjectService;

    @Autowired
    public UserRestControllerImpl(@Qualifier("userServiceImpl") BaseService<T> service,
                                  UserProjectService userProjectService) {
        super(service);
        this.userProjectService = userProjectService;
    }

    @Override
    @PostMapping("/{userId}/projects/{projectId}/link")
    public ResponseEntity<HashMap<String, Object>> addUserToProject(@PathVariable("userId") int userId,
                                                                    @PathVariable("projectId") int projectId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserProjectService) userProjectService).manageUserInProject(true, userId, projectId);
        return operationStatus.getResponseEntity();
    }

    @Override
    @DeleteMapping("/{userId}/projects/{projectId}/unlink")
    public ResponseEntity<HashMap<String, Object>> removeUserFromProject(@PathVariable("userId") int userId,
                                                                         @PathVariable("projectId") int projectId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserProjectService) userProjectService).manageUserInProject(false, userId, projectId);
        return operationStatus.getResponseEntity();
    }
}
