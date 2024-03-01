package com.aoe.restapi.model.service.relational.userissue;

import com.aoe.restapi.utility.Status.OperationStatus;

public interface UserIssueService {
    OperationStatus manageUserIssue(boolean link, int userId, int issueId);
}
