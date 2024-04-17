package com.aoe.restapi.controller.relational.userdomain;

import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface UserDomainRestController {
    public ResponseEntity<HashMap<String, Object>> addDomainToUser(int userId, int domainId);

    public ResponseEntity<HashMap<String, Object>> removeDomainFromUser(int userId, int domainId);
}
