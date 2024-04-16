package com.aoe.restapi.controller.relational.userrole;

import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface UserRoleRestController {
    public ResponseEntity<HashMap<String, Object>> addUserRole(int userId, int roleId);

    public ResponseEntity<HashMap<String, Object>> removeUserRole(int userId, int roleId);

}
