package com.aoe.restapi.model.service.relation.userdomain;

import com.aoe.restapi.utility.Status.OperationStatus;

public interface UserDomainService {
    OperationStatus manageUserInDomain(boolean link, int userId, int domainId);
}
