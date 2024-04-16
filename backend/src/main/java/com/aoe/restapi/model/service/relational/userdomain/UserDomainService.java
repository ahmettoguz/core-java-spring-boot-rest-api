package com.aoe.restapi.model.service.relational.userdomain;

import com.aoe.restapi.utility.status.OperationStatus;

public interface UserDomainService {
    OperationStatus manageUserDomain(boolean link, int userId, int domainId);
}
