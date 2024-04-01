package com.aoe.restapi.controller.relational.userrole;

import com.aoe.restapi.model.entity.Role;
import com.aoe.restapi.model.service.relational.userrole.UserRoleService;
import com.aoe.restapi.utility.http.ResponseUtil;
import com.aoe.restapi.utility.status.OperationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
public class UserRoleRestControllerImpl<T extends Role> implements UserRoleRestController {
    UserRoleService userRoleService;

    @Autowired
    public UserRoleRestControllerImpl(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }

    @Override
    @PostMapping("/users/{userId}/roles/{roleId}")
    public ResponseEntity<HashMap<String, Object>> addUserRole(@PathVariable("userId") int userId,
                                                               @PathVariable("roleId") int roleId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserRoleService) userRoleService).manageUserRole(true, userId, roleId);
        return ResponseUtil.getResponseWithoutData(operationStatus);
    }

    @Override
    @DeleteMapping("/users/{userId}/roles/{roleId}")
    public ResponseEntity<HashMap<String, Object>> removeUserRole(@PathVariable("userId") int userId,
                                                                  @PathVariable("roleId") int roleId) {
        // perform operation and return
        OperationStatus operationStatus = ((UserRoleService) userRoleService).manageUserRole(false, userId, roleId);
        return ResponseUtil.getResponseWithoutData(operationStatus);
    }

}
