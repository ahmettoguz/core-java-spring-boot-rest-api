package com.aoe.restapi.model.service.relational.userproject;

import com.aoe.restapi.utility.Status.OperationStatus;

public interface UserProjectService {
    OperationStatus manageUserInProject(boolean link, int userId, int projectId);
}