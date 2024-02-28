package com.aoe.restapi.controller.project;

import com.aoe.restapi.controller.base.BaseRestControllerImpl;
import com.aoe.restapi.model.entity.Project;
import com.aoe.restapi.model.service.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

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
