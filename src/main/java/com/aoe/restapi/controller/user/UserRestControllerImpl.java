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

    @Override
    @GetMapping("/search/exact")
    public ResponseEntity<HashMap<String, Object>> searchUsersByExactFirstName(@RequestBody HashMap<String, String> requestBody) {
        // check request body
        if (!requestBody.containsKey("firstName"))
            return new OperationStatusError(HttpStatus.BAD_REQUEST).getResponseEntity();

        // get input
        String exactFirstName = requestBody.get("firstName");

        // get page inputs from body
        int pageNumber = Integer.parseInt(requestBody.getOrDefault("pageNumber", "0"));
        int pageSize = Integer.parseInt(requestBody.getOrDefault("pageSize", "5"));
        boolean isDescending = Boolean.parseBoolean(requestBody.getOrDefault("isDescending", "false"));

        // get users
        OperationStatus operationStatus = ((UserService<User>) service).searchUsersByExactFirstName(exactFirstName, pageNumber, pageSize, isDescending);

        // return
        return operationStatus.getResponseEntity();
    }

    @Override
    @GetMapping("/search/partial")
    public ResponseEntity<HashMap<String, Object>> searchUsersByPartialFirstName(@RequestBody HashMap<String, String> requestBody) {
        // check request body
        if (!requestBody.containsKey("firstName"))
            return new OperationStatusError(HttpStatus.BAD_REQUEST).getResponseEntity();

        // get input
        String partialFirstName = requestBody.get("firstName");

        // get page inputs from body
        int pageNumber = Integer.parseInt(requestBody.getOrDefault("pageNumber", "0"));
        int pageSize = Integer.parseInt(requestBody.getOrDefault("pageSize", "5"));
        boolean isDescending = Boolean.parseBoolean(requestBody.getOrDefault("isDescending", "false"));

        // get users
        OperationStatus operationStatus = ((UserService<User>) service).searchUsersByPartialFirstName(partialFirstName, pageNumber, pageSize, isDescending);

        // return
        return operationStatus.getResponseEntity();
    }
}
