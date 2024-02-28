package com.aoe.restapi.controller.user;

import com.aoe.restapi.controller.base.BaseRestControllerImpl;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

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
