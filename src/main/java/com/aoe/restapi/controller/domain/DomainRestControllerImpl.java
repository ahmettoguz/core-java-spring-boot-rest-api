package com.aoe.restapi.controller.domain;

import com.aoe.restapi.controller.base.BaseRestControllerImpl;
import com.aoe.restapi.model.entity.Domain;
import com.aoe.restapi.model.service.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/projects")
public class DomainRestControllerImpl<T extends Domain> extends BaseRestControllerImpl<T> implements DomainRestController {
    BaseService<T> service;

    @Autowired
    public DomainRestControllerImpl(@Qualifier("projectServiceImpl") BaseService<T> service) {
        super(service);
    }
}
