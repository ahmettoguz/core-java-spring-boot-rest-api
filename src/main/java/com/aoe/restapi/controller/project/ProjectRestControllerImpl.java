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

    @Autowired
    public ProjectRestControllerImpl(@Qualifier("projectServiceImpl") BaseService<T> service) {
        super(service);
    }
}
