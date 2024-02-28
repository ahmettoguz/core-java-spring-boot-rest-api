package com.aoe.restapi.model.service.relational.userdomain;

import com.aoe.restapi.utility.Status.OperationStatus;

public interface UserDomainService {
    OperationStatus manageUserDomain(boolean link, int userId, int domainId);
}
