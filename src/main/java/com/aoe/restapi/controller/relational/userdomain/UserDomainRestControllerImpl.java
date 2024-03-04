package com.aoe.restapi.controller.relational.userdomain;

import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.relational.userdomain.UserDomainService;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
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
        ResponseEntity<HashMap<String, Object>> responseEntity = operationStatus.getResponseEntity();

        // change data field if operation is success
        if (operationStatus instanceof OperationStatusSuccess<?>)
            if (responseEntity.hasBody()) {
                responseEntity.getBody().put("data", "relational operation success");
            }

        return responseEntity;
    }

    @Override
    @DeleteMapping("/users/{userId}/domains/{domainId}")
    public ResponseEntity<HashMap<String, Object>> removeDomainFromUser(@PathVariable("userId") int userId,
                                                                        @PathVariable("domainId") int domainId) {
        // perform operation and return
        OperationStatus operationStatus = userDomainService.manageUserDomain(false, userId, domainId);
        ResponseEntity<HashMap<String, Object>> responseEntity = operationStatus.getResponseEntity();

        // change data field if operation is success
        if (operationStatus instanceof OperationStatusSuccess<?>)
            if (responseEntity.hasBody()) {
                responseEntity.getBody().put("data", "relational operation success");
            }

        return responseEntity;
    }
}
