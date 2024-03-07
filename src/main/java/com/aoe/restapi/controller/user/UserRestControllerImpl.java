package com.aoe.restapi.controller.user;

import com.aoe.restapi.controller.base.BaseRestControllerImpl;
import com.aoe.restapi.model.entity.User;
import com.aoe.restapi.model.service.base.BaseService;
import com.aoe.restapi.model.service.user.UserService;
import com.aoe.restapi.utility.ResponseUtil;
import com.aoe.restapi.utility.Status.OperationStatus;
import com.aoe.restapi.utility.Status.OperationStatusError;
import com.aoe.restapi.utility.Status.OperationStatusSuccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
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
        this.service = service;
    }


    @Override
    @PatchMapping("/{userId}/password")
    public ResponseEntity<HashMap<String, Object>> updateUserPassword(@PathVariable("userId") int userId,
                                                                      @RequestBody HashMap<String, String> requestBody) {
        // check request body
        if (!requestBody.containsKey("newPassword")) {
            return new OperationStatusError(HttpStatus.BAD_REQUEST).getResponseEntity();
        }

        // get input
        String newPassword = requestBody.get("newPassword");

        // read operation
        OperationStatus operationStatus = ((UserService<User>) service).readById(userId);

        // check read operation
        if (operationStatus instanceof OperationStatusError)
            return operationStatus.getResponseEntity();

        // get user
        User user = ((OperationStatusSuccess<User>) operationStatus).getData();

        // update user
        operationStatus = ((UserService<User>) service).updatePassword(user, newPassword);

        // return
        if (operationStatus instanceof OperationStatusSuccess)
            return ResponseUtil.getResponseWithoutData(operationStatus);

        return operationStatus.getResponseEntity();
    }
}
