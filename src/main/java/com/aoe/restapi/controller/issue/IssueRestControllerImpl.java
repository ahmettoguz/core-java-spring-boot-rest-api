package com.aoe.restapi.controller.issue;

import com.aoe.restapi.controller.base.BaseRestControllerImpl;
import com.aoe.restapi.model.entity.Issue;
import com.aoe.restapi.model.service.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/issues")
public class IssueRestControllerImpl<T extends Issue> extends BaseRestControllerImpl<T> implements IssueRestController {
    BaseService<T> service;

    @Autowired
    public IssueRestControllerImpl(@Qualifier("issueServiceImpl") BaseService<T> service) {
        super(service);
    }
}
