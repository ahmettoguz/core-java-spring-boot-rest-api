package com.aoe.restapi.model.service.relational.userissue;

import com.aoe.restapi.utility.status.OperationStatus;

public interface UserIssueService {
    OperationStatus manageUserIssue(boolean link, int userId, int issueId);
}
