package com.aoe.restapi.model.service.userrole;

import com.aoe.restapi.utility.status.OperationStatus;

public interface UserRoleService<T> {

    // read
    OperationStatus readById(Integer id);
}
