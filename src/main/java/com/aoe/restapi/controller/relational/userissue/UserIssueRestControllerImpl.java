package com.aoe.restapi.controller.relational.userissue;

import com.aoe.restapi.model.entity.Issue;
import com.aoe.restapi.model.service.relational.userissue.UserIssueService;
import com.aoe.restapi.utility.ResponseUtil;
import com.aoe.restapi.utility.Status.OperationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "*")
@RestController
public class UserIssueRestControllerImpl<T extends Issue> implements UserIssueRestController {
    UserIssueService userIssueService;

    @Autowired
    public UserIssueRestControllerImpl(UserIssueService userIssueService) {
        this.userIssueService = userIssueService;
    }

    @Override
    @PostMapping("/users/{userId}/issues/{issueId}")
    public ResponseEntity<HashMap<String, Object>> addIssueToUser(@PathVariable("userId") int userId,
                                                                  @PathVariable("issueId") int issueId) {
        // perform operation and return
        OperationStatus operationStatus = userIssueService.manageUserIssue(true, userId, issueId);
        return ResponseUtil.getResponseWithoutData(operationStatus);
    }

    @Override
    @DeleteMapping("/users/{userId}/issues/{issueId}")
    public ResponseEntity<HashMap<String, Object>> removeIssueFromUser(@PathVariable("userId") int userId,
                                                                       @PathVariable("issueId") int issueId) {
        // perform operation and return
        OperationStatus operationStatus = userIssueService.manageUserIssue(false, userId, issueId);
        return ResponseUtil.getResponseWithoutData(operationStatus);
    }

}
