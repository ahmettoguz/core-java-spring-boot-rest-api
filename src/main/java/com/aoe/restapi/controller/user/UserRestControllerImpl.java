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
public class UserRestControllerImpl<T extends User> extends BaseRestControllerImpl<T> implements UserRestController {
    BaseService<T> service;

    @Autowired
    public UserRestControllerImpl(@Qualifier("userServiceImpl") BaseService<T> service) {
        super(service);
    }
}
