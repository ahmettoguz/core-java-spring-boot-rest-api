package com.aoe.restapi.controller.relational.userissue;

import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface UserIssueRestController {
    public ResponseEntity<HashMap<String, Object>> addIssueToUser(int userId, int issueId);

    public ResponseEntity<HashMap<String, Object>> removeIssueFromUser(int userId, int issueId);
}