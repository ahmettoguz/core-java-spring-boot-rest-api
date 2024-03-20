package com.aoe.restapi.controller.relational.userdomain;

import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.relational.userdomain.UserDomainService;
import com.aoe.restapi.utility.http.ResponseUtil;
import com.aoe.restapi.utility.Status.OperationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
public class UserDomainRestControllerImpl<T extends User> implements UserDomainRestController {
    UserDomainService userDomainService;

    @Autowired
    public UserDomainRestControllerImpl(UserDomainService userDomainService) {
        this.userDomainService = userDomainService;
    }

    @Override
    @PostMapping("/users/{userId}/domains/{domainId}")
    public ResponseEntity<HashMap<String, Object>> addDomainToUser(@PathVariable("userId") int userId,
                                                                   @PathVariable("domainId") int domainId) {
        // perform operation and return
        OperationStatus operationStatus = userDomainService.manageUserDomain(true, userId, domainId);
        return ResponseUtil.getResponseWithoutData(operationStatus);
    }

    @Override
    @DeleteMapping("/users/{userId}/domains/{domainId}")
    public ResponseEntity<HashMap<String, Object>> removeDomainFromUser(@PathVariable("userId") int userId,
                                                                        @PathVariable("domainId") int domainId) {
        // perform operation and return
        OperationStatus operationStatus = userDomainService.manageUserDomain(false, userId, domainId);
        return ResponseUtil.getResponseWithoutData(operationStatus);
    }
}
