package com.aoe.restapi.controller.project;

import com.aoe.restapi.controller.base.BaseRestControllerImpl;
import com.aoe.restapi.model.entity.Project;
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
@RequestMapping("/projects")
public class ProjectRestControllerImpl<T extends Project> extends BaseRestControllerImpl<T> implements ProjectRestController {
    BaseService<T> service;
    UserProjectService userProjectService;

    @Autowired
    public ProjectRestControllerImpl(@Qualifier("projectServiceImpl") BaseService<T> service,
                                     UserProjectService userProjectService) {
        super(service);
        this.userProjectService = userProjectService;
    }

    @Override
    @PostMapping("/{projectId}/users/{userId}/link")
    public ResponseEntity<HashMap<String, Object>> addUserToProject(@PathVariable("projectId") int projectId,
                                                                    @PathVariable("userId") int userId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserProjectService) userProjectService).manageUserInProject(true, projectId, userId);
        return operationStatus.getResponseEntity();
    }

    @Override
    @PostMapping("/{projectId}/users/{userId}/unlink")
    public ResponseEntity<HashMap<String, Object>> removeUserFromProject(@PathVariable("projectId") int projectId,
                                                                         @PathVariable("userId") int userId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserProjectService) userProjectService).manageUserInProject(false, projectId, userId);
        return operationStatus.getResponseEntity();
    }
}
